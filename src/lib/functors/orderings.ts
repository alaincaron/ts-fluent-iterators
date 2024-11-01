import { Comparators } from '../..';
import { Comparator, Mapper } from '../utils';

export type ComparatorLike<T> = Ordering<T> | Comparator<T>;

export abstract class Ordering<T> {
  abstract compare(t1: T, t2: T): number;

  get comparator(): Comparator<T> {
    return this.compare.bind(this);
  }

  compound(secondary: ComparatorLike<T>) {
    return Ordering.from(Comparators.compound(this.comparator, Ordering.getComparator(secondary)));
  }

  onResultOf<T1>(mapper: Mapper<T1, T>): Ordering<T1> {
    return FunctionalOrdering.from(Comparators.onResultOf(this.comparator, mapper));
  }

  isOrdered(items: Iterable<T>): boolean {
    return Comparators.isOrdered(this.comparator, items);
  }

  isStrictlyOrdered(items: Iterable<T>): boolean {
    return Comparators.isStrictlyOrdered(this.comparator, items);
  }

  lexicographical(): Ordering<Iterable<T>> {
    return FunctionalOrdering.from(Comparators.lexicographical(this.comparator));
  }

  max(a: T, b: T, ...rest: T[]): T {
    let result = this.compare(a, b) >= 0 ? a : b;
    for (const x of rest) {
      if (this.compare(result, x) < 0) result = x;
    }
    return result;
  }

  min(a: T, b: T, ...rest: T[]): T {
    let result = this.compare(a, b) <= 0 ? a : b;
    for (const x of rest) {
      if (this.compare(result, x) > 0) result = x;
    }
    return result;
  }

  maxIter(items: Iterable<T>) {
    const iter = items[Symbol.iterator]();
    let item = iter.next();
    if (item.done) return undefined;
    let result = item.value;
    for (;;) {
      item = iter.next();
      if (item.done) return result;
      if (this.compare(result, item.value) < 0) result = item.value;
    }
  }

  minIter(items: Iterable<T>) {
    const iter = items[Symbol.iterator]();
    let item = iter.next();
    if (item.done) return undefined;
    let result = item.value;
    for (;;) {
      item = iter.next();
      if (item.done) return result;
      if (this.compare(result, item.value) > 0) result = item.value;
    }
  }

  nullsFirst() {
    return FunctionalOrdering.from(Comparators.nullsFirst(this.comparator));
  }

  nullsLast() {
    return FunctionalOrdering.from(Comparators.nullsLast(this.comparator));
  }

  reverse(): Ordering<T> {
    switch (this) {
      case NATURAL as Ordering<T>:
        return REVERSED as Ordering<T>;
      case REVERSED as Ordering<T>:
        return NATURAL as Ordering<T>;
      default:
        return FunctionalOrdering.from(Comparators.reverse(this.comparator));
    }
  }

  static getComparator<T>(c: ComparatorLike<T>): Comparator<T> {
    if (typeof c === 'function') return c;
    return c.comparator;
  }

  static natural<T>(): Ordering<T> {
    return NATURAL as Ordering<T>;
  }

  static reversed<T>(): Ordering<T> {
    return REVERSED as Ordering<T>;
  }

  static from<T>(c: Comparator<T>): Ordering<T> {
    switch (c) {
      case Comparators.natural:
        return Ordering.natural();
      case Comparators.reversed:
        return Ordering.reversed();
      default:
        return new FunctionalOrdering(c);
    }
  }
  static fromMany<T>(...comparators: Comparator<T>[]) {
    return new FunctionalOrdering(Comparators.chain(comparators));
  }

  static chain<T>(comparators: Iterable<Comparator<T>>): Ordering<T> {
    return new FunctionalOrdering(Comparators.chain(comparators));
  }
}

class FunctionalOrdering<T> extends Ordering<T> {
  private readonly c: Comparator<T>;
  constructor(c: Comparator<T>) {
    super();
    this.c = c;
  }

  eval(t1: T, t2: T): number {
    return this.c(t1, t2);
  }

  get comparator() {
    return this.c;
  }

  compare(t1: T, t2: T): number {
    return this.eval(t1, t2);
  }
}

const NATURAL = new FunctionalOrdering(Comparators.natural);
const REVERSED = new FunctionalOrdering(Comparators.reversed);
