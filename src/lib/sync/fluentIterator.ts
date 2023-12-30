import * as Iterators from './iterators';
import { AsyncFluentIterator, toAsync } from '../async';
import {
  ArrayCollector,
  AvgCollector,
  Collector,
  CollectorDecorator,
  CollectorFilter,
  CountCollector,
  GroupByCollector,
  LastCollector,
  MapCollector,
  MaxCollector,
  MinCollector,
  MinMaxCollector,
  ObjectCollector,
  SetCollector,
  StringJoiner,
  SumCollector,
  TallyCollector,
} from '../collectors';
import { PromiseIterator, toPromise } from '../promise';
import { CollisionHandler, Comparator, IteratorGenerator, Mapper, MinMax, Predicate, Reducer } from '../types';

export class FluentIterator<A> implements Iterator<A>, Iterable<A> {
  private iter: Iterator<A>;

  constructor(iter: Iterator<A>) {
    this.iter = iter;
  }

  static empty<A = never>(): FluentIterator<A> {
    return new FluentIterator(Iterators.empty());
  }

  static from<A>(iter: IteratorGenerator<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.toIterator(iter));
  }

  collectTo<B>(collector: Collector<A, B>): B {
    return Iterators.collectTo(this.iter, collector);
  }

  collect(): A[] {
    return this.collectTo(new ArrayCollector());
  }

  collectToSet(): Set<A> {
    return this.collectTo(new SetCollector());
  }

  collectToMap<K>(mapper: Mapper<A, K>, collisionHandler?: CollisionHandler<K, A>): Map<K, A> {
    return this.collectToMap2(a => [mapper(a), a], collisionHandler);
  }

  collectToMap2<K, V>(mapper: Mapper<A, [K, V]>, collisionHandler?: CollisionHandler<K, V>): Map<K, V> {
    return this.map(mapper).collectTo(new MapCollector(collisionHandler));
  }

  collectToObject<V>(
    mapper: Mapper<A, [string, V]>,
    collisionHandler?: CollisionHandler<string, V>
  ): Record<string, V> {
    return this.collectTo(new CollectorDecorator(new ObjectCollector(collisionHandler), mapper));
  }

  filter(predicate: Predicate<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.filter(this.iter, predicate));
  }

  removeNull(): FluentIterator<A> {
    return new FluentIterator(Iterators.removeNull(this.iter));
  }

  map<B>(mapper: Mapper<A, B>): FluentIterator<B> {
    return new FluentIterator(Iterators.map(this.iter, mapper));
  }

  filterMap<B>(mapper: Mapper<A, B | null | undefined>): FluentIterator<B> {
    return new FluentIterator(Iterators.filterMap(this.iter, mapper));
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
    return new FluentIterator(Iterators.zip(this.iter, Iterators.toIterator(other)));
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
    return this.collectTo(new CollectorDecorator(new SumCollector(), mapper));
  }

  avg(mapper?: Mapper<A, number>): number {
    return this.collectTo(new CollectorDecorator(new AvgCollector(), mapper));
  }

  count(predicate?: Predicate<A>): number {
    let collector: Collector<A, number> = new CountCollector();
    if (predicate) collector = new CollectorFilter(collector, predicate);
    return this.collectTo(collector);
  }

  min(comparator?: Comparator<A>): A | undefined {
    return this.collectTo(new MinCollector(comparator));
  }

  max(comparator?: Comparator<A>): A | undefined {
    return this.collectTo(new MaxCollector(comparator));
  }

  minmax(comparator?: Comparator<A>): MinMax<A> | undefined {
    return this.collectTo(new MinMaxCollector(comparator));
  }

  last(predicate?: Predicate<A>): A | undefined {
    let collector: Collector<A, A | undefined> = new LastCollector();
    if (predicate) collector = new CollectorFilter(collector, predicate);
    return this.collectTo(collector);
  }

  join(separator?: string, prefix?: string, suffix?: string): string {
    return this.collectTo(new StringJoiner(separator, prefix, suffix));
  }

  groupBy<K>(mapper: Mapper<A, K>): Map<K, A[]> {
    return this.collectTo(new CollectorDecorator(new GroupByCollector(), a => [mapper(a), a]));
  }

  tally<K>(mapper?: Mapper<A, K>): Map<K, number> {
    return this.collectTo(new CollectorDecorator(new TallyCollector(), mapper));
  }

  partition(size: number): FluentIterator<A[]> {
    return new FluentIterator(Iterators.partition(this.iter, size));
  }

  toPromise(): PromiseIterator<A> {
    return new PromiseIterator(toPromise(this.iter));
  }

  toAsync(): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(toAsync(this.iter));
  }

  [Symbol.iterator](): Iterator<A> {
    return this.iter;
  }

  next(): IteratorResult<A> {
    return this.iter.next();
  }
}

export function iterator<A>(iter: IteratorGenerator<A>): FluentIterator<A> {
  return FluentIterator.from(iter);
}

export function emptyIterator<A = never>() {
  return FluentIterator.empty<A>();
}

declare global {
  interface Array<T> {
    iterator(): FluentIterator<T>;
  }
  interface String {
    iterator(): FluentIterator<string>;
  }
  interface Set<T> {
    iterator(): FluentIterator<T>;
  }
  interface Map<K, V> {
    iterator(): FluentIterator<[K, V]>;
    valueIterator(): FluentIterator<V>;
    keyIterator(): FluentIterator<K>;
  }
}

Array.prototype.iterator = function <T>(this: Array<T>) {
  return new FluentIterator<T>(this[Symbol.iterator]());
};

String.prototype.iterator = function () {
  return new FluentIterator<string>(this[Symbol.iterator]());
};

Set.prototype.iterator = function <T>(this: Set<T>) {
  return new FluentIterator<T>(this[Symbol.iterator]());
};

Map.prototype.iterator = function <K, V>(this: Map<K, V>) {
  return new FluentIterator<[K, V]>(this.entries()[Symbol.iterator]());
};
Map.prototype.valueIterator = function <K, V>(this: Map<K, V>) {
  return new FluentIterator<V>(this.values()[Symbol.iterator]());
};
Map.prototype.keyIterator = function <K, V>(this: Map<K, V>) {
  return new FluentIterator<K>(this.keys()[Symbol.iterator]());
};
