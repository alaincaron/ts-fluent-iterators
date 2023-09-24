import { Comparator, Mapper, Predicate, Reducer, MinMax, ArrayGenerator, IteratorGenerator } from '../types';
import { alwaysTrue, defaultComparator, sumReducer, avgReducer, minMaxReducer, identity } from '../functions';
import { Collector } from '../collectors';

export function* empty<A = never>(): IterableIterator<A> {}

export function* map<A, B>(iter: Iterator<A>, mapper: Mapper<A, B>): IterableIterator<B> {
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    yield mapper(item.value);
  }
}

export function first<A>(iter: Iterator<A>, predicate: Predicate<A> = alwaysTrue): A | undefined {
  for (;;) {
    const item = iter.next();
    if (item.done) return undefined;
    if (predicate(item.value)) return item.value;
  }
}

export function* take<A>(iter: Iterator<A>, n: number): IterableIterator<A> {
  for (let i = 0; i < n; ++i) {
    const item = iter.next();
    if (item.done) break;
    yield item.value;
  }
}

export function* tap<A>(iter: Iterator<A>, mapper: Mapper<A, any>): IterableIterator<A> {
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    mapper(item.value);
    yield item.value;
  }
}

export function* skip<A>(iter: Iterator<A>, n: number): IterableIterator<A> {
  for (let i = 0; i < n; ++i) {
    const item = iter.next();
    if (item.done) break;
  }

  for (;;) {
    const item = iter.next();
    if (item.done) break;
    yield item.value;
  }
}

export function* filter<A>(iter: Iterator<A>, predicate: Predicate<A>): IterableIterator<A> {
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    if (predicate(item.value)) yield item.value;
  }
}

export function* zip<A, B>(iter1: Iterator<A>, iter2: Iterator<B>): IterableIterator<[A, B]> {
  for (;;) {
    const item1 = iter1.next();
    const item2 = iter2.next();
    if (item1.done || item2.done) break;
    yield [item1.value, item2.value];
  }
}

export function* enumerate<A>(iter: Iterator<A>, start = 0): IterableIterator<[A, number]> {
  let i = start;
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    yield [item.value, i++];
  }
}

export function contains<A>(iter: Iterator<A>, predicate: Predicate<A>): boolean {
  return first(iter, predicate) !== undefined;
}

export function includes<A>(iter: Iterator<A>, target: A): boolean {
  return first(iter, a => a === target) !== undefined;
}

export function fold<A, B>(iter: Iterator<A>, reducer: Reducer<A, B>, initialValue: B): B {
  let acc = initialValue;
  for (;;) {
    const item = iter.next();
    if (item.done) return acc;
    acc = reducer(acc, item.value);
  }
}

export function reduce<A>(iter: Iterator<A>, reducer: Reducer<A, A>, initialValue?: A): A | undefined {
  let acc = initialValue;
  if (acc === undefined) {
    const item = iter.next();
    if (item.done) return undefined;
    acc = item.value;
  }
  return fold(iter, reducer, acc);
}

export function forEach<A>(iter: Iterator<A>, mapper: Mapper<A, any>): void {
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    mapper(item.value);
  }
}

export function* append<A>(iter: Iterator<A>, other: Iterator<A>): IterableIterator<A> {
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    yield item.value;
  }
  for (;;) {
    const item = other.next();
    if (item.done) break;
    yield item.value;
  }
}

export function* prepend<A>(iter: Iterator<A>, other: Iterator<A>): IterableIterator<A> {
  for (;;) {
    const item = other.next();
    if (item.done) break;
    yield item.value;
  }
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    yield item.value;
  }
}

export function* concat<A>(...iters: Iterator<A>[]): IterableIterator<A> {
  for (const iter of iters) {
    for (;;) {
      const item = iter.next();
      if (item.done) break;
      yield item.value;
    }
  }
}

export function* takeWhile<A>(iter: Iterator<A>, predicate: Predicate<A>): IterableIterator<A> {
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    if (!predicate(item.value)) break;
    yield item.value;
  }
}

export function* skipWhile<A>(iter: Iterator<A>, predicate: Predicate<A>): IterableIterator<A> {
  let skip = true;
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    if (skip) {
      skip = predicate(item.value);
      if (skip) continue;
    }
    yield item.value;
  }
}

export function* distinct<A, B>(iter: Iterator<A>, mapper?: Mapper<A, B>): IterableIterator<A> {
  mapper ??= identity as Mapper<A, B>;
  const seen = new Set<B>();
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    const value = mapper(item.value);
    if (seen.has(value)) continue;
    seen.add(value);
    yield item.value;
  }
}

export function all<A>(iter: Iterator<A>, predicate: Predicate<A>): boolean {
  for (;;) {
    const item = iter.next();
    if (item.done) return true;
    if (!predicate(item.value)) return false;
  }
}

export function some<A>(iter: Iterator<A>, predicate: Predicate<A>): boolean {
  for (;;) {
    const item = iter.next();
    if (item.done) return false;
    if (predicate(item.value)) return true;
  }
}

export function collectTo<A, B>(iter: Iterator<A>, collector: Collector<A, B>): B {
  for (;;) {
    const item = iter.next();
    if (item.done) return collector.result;
    collector.collect(item.value);
  }
}

export function sum(iter: Iterator<number>): number {
  return fold(iter, sumReducer, { sum: 0, correction: 0 }).sum;
}

export function avg(iter: Iterator<number>): number {
  return fold(iter, avgReducer, { avg: 0, n: 0 }).avg;
}

export function count<A>(iter: Iterator<A>, predicate: Predicate<A> = alwaysTrue): number {
  let n = 0;
  for (;;) {
    const item = iter.next();
    if (item.done) return n;
    if (predicate(item.value)) ++n;
  }
}

export function min<A>(iter: Iterator<A>, comparator: Comparator<A> = defaultComparator): A | undefined {
  const reducer = (acc: A, a: A) => (comparator(acc, a) <= 0 ? acc : a);
  return reduce(iter, reducer);
}

export function max<A>(iter: Iterator<A>, comparator: Comparator<A> = defaultComparator): A | undefined {
  const reducer = (acc: A, a: A) => (comparator(acc, a) >= 0 ? acc : a);
  return reduce(iter, reducer);
}

export function minmax<A>(iter: Iterator<A>, comparator: Comparator<A> = defaultComparator): MinMax<A> {
  const item = iter.next();
  if (item.done) return {};
  return fold(iter, minMaxReducer(comparator), { min: item.value, max: item.value });
}

export function last<A>(iter: Iterator<A>, predicate: Predicate<A> = alwaysTrue): A | undefined {
  let result: A | undefined;
  for (;;) {
    const item = iter.next();
    if (item.done) return result;
    if (predicate(item.value)) result = item.value;
  }
}

export function* partition<A>(iter: Iterator<A>, size: number): IterableIterator<A[]> {
  if (!Number.isSafeInteger(size) || size < 0) throw new Error(`Invalid size integer number: ${size}`);
  let values: A[] = [];
  for (;;) {
    const item = iter.next();
    if (item.done) {
      if (values.length > 0) yield values;
      break;
    }
    if (values.push(item.value) >= size) {
      yield values;
      values = [];
    }
  }
}

function* seedToIterator<E>(n: number, seed: (i: number) => E) {
  for (let i = 0; i < n; ++i) {
    yield seed(i);
  }
}

function arrayLikeToIterator<E>(arrayLike: ArrayGenerator<E>): Iterator<E> | null {
  const { seed, length }: { seed: any; length: number } = arrayLike;
  if (seed == null || length == null) return null;
  if (typeof seed === 'function') {
    return seedToIterator(length, seed);
  }
  if (typeof seed.next === 'function') {
    return take(seed as Iterator<E>, length);
  } else if (typeof seed[Symbol.iterator] === 'function') {
    return take((seed as Iterable<E>)[Symbol.iterator](), length);
  }
  return null;
}

export function toIteratorMaybe<E>(x: IteratorGenerator<E>): Iterator<E> | null {
  const iter: any = x as any;
  if (typeof iter[Symbol.iterator] === 'function') {
    return iter[Symbol.iterator]();
  } else if (typeof iter.iterator === 'function') {
    return iter.iterator();
  } else if (typeof iter === 'function') {
    return seedToIterator(Number.MAX_SAFE_INTEGER, iter);
  } else {
    return arrayLikeToIterator(iter as unknown as ArrayGenerator<E>);
  }
}

export function toIterator<E>(x: IteratorGenerator<E>): Iterator<E> {
  const iter = toIteratorMaybe(x);
  if (iter) return iter;
  throw new Error('Unable to convert object into an Iterator');
}
