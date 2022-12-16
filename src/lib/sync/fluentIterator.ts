import * as Iterators from './iterators';
import { Comparator, Mapper, Predicate, Reducer, MinMax } from "../types";
import { identity } from "../functions";
import { Collector } from "../collectors";

export class FluentIterator<A> implements Iterator<A>, Iterable<A> {

  private iter: Iterator<A>;

  constructor(iter: Iterator<A>) {
    this.iter = iter;
  }

  collectTo<B>(collector: Collector<A, B>): B {
    return Iterators.collectTo(this.iter, collector);
  }

  collect(): A[] {
    return Iterators.collect(this.iter);
  }

  collectToSet(): Set<A> {
    return Iterators.collectToSet(this.iter);
  }

  filter(predicate: Predicate<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.filter(this.iter, predicate));
  }

  map<B>(mapper: Mapper<A, B>): FluentIterator<B> {
    return new FluentIterator(Iterators.map(this.iter, mapper));
  }

  first(predicate?: Predicate<A>): A | undefined {
    return Iterators.first(this.iter, predicate);
  }

  take(n: number): FluentIterator<A> {
    return new FluentIterator(Iterators.take(this.iter, n));
  }

  skip(n: number): FluentIterator<A> {
    return new FluentIterator(Iterators.skip(this.iter, n));
  }

  contains(predicate: Predicate<A>): boolean {
    return Iterators.contains(this.iter, predicate);
  }

  includes(target: A): boolean {
    return Iterators.includes(this.iter, target);
  }

  fold<B>(reducer: Reducer<A, B>, initialValue: B): B {
    return Iterators.fold(this.iter, reducer, initialValue);
  }

  reduce(reducer: Reducer<A, A>, initialValue?: A): A | undefined {
    return Iterators.reduce(this.iter, reducer, initialValue);
  }

  zip<B>(other: Iterator<B> | Iterable<B>): FluentIterator<[A, B]> {
    return new FluentIterator(Iterators.zip(this.iter, Iterators.toIterator(other)))
  }

  enumerate(start = 0): FluentIterator<[A, number]> {
    return new FluentIterator(Iterators.enumerate(this.iter, start));
  }

  tap(mapper: Mapper<A, any>): FluentIterator<A> {
    return new FluentIterator(Iterators.tap(this.iter, mapper));
  }

  forEach(mapper: Mapper<A, any>): void {
    Iterators.forEach(this.iter, mapper);
  }

  append(items: Iterator<A> | Iterable<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.append(this.iter, Iterators.toIterator(items)));
  }

  prepend(items: Iterator<A> | Iterable<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.prepend(this.iter, Iterators.toIterator(items)));
  }

  concat(...iterables: Array<Iterator<A> | Iterable<A>>): FluentIterator<A> {
    return new FluentIterator(Iterators.concat(this.iter, ...iterables.map(Iterators.toIterator)));
  }

  takeWhile(predicate: Predicate<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.takeWhile(this.iter, predicate));
  }

  skipWhile(predicate: Predicate<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.skipWhile(this.iter, predicate));
  }

  distinct<B>(mapper?: Mapper<A, B>): FluentIterator<A> {
    return new FluentIterator(Iterators.distinct(this.iter, mapper));
  }

  all(predicate: Predicate<A>): boolean {
    return Iterators.all(this.iter, predicate);
  }

  some(predicate: Predicate<A>): boolean {
    return Iterators.some(this.iter, predicate);
  }

  sum(mapper?: Mapper<A, number>): number {
    mapper ??= identity as Mapper<A, number>;
    return Iterators.sum(Iterators.map(this.iter, mapper));
  }

  avg(mapper?: Mapper<A, number>): number {
    mapper ??= identity as Mapper<A, number>;
    return Iterators.avg(Iterators.map(this.iter, mapper));
  }

  count(predicate?: Predicate<A>): number {
    return Iterators.count(this.iter, predicate);
  }

  min(comparator?: Comparator<A>): A | undefined {
    return Iterators.min(this.iter, comparator);
  }

  max(comparator?: Comparator<A>): A | undefined {
    return Iterators.max(this.iter, comparator);
  }

  minmax(comparator?: Comparator<A>): MinMax<A> {
    return Iterators.minmax(this.iter, comparator);
  }

  last(predicate?: Predicate<A>): A | undefined {
    return Iterators.last(this.iter, predicate);
  }

  join(separator?: string): string {
    return Iterators.join(this.iter, separator);
  }

  groupBy<K>(mapper: Mapper<A, K>): Map<K, A[]> {
    return Iterators.groupBy(this.iter, mapper);
  }

  tally<K>(mapper?: Mapper<A, K>): Map<K, number> {
    return Iterators.tally(this.iter, mapper);
  }

  partition(size: number): FluentIterator<A[]> {
    return new FluentIterator(Iterators.partition(this.iter, size));
  }

  [Symbol.iterator](): Iterator<A> {
    return this.iter;
  }

  next(): IteratorResult<A> {
    return this.iter.next();
  }
}

export function iterator<A>(iter: Iterable<A> | Iterator<A>): FluentIterator<A> {
  return new FluentIterator(Iterators.toIterator(iter));
}

declare global {
  interface Array<T> {
    fluentIterator(): FluentIterator<T>;
  }
}

Array.prototype.fluentIterator = function <T>(this) { return new FluentIterator<T>(this[Symbol.iterator]()); }
