import * as Iterators from './promiseIterators';
import { AsyncFluentIterator } from '../async';
import {
  ArrayCollector,
  Collector,
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
  TallyCollector,
} from '../collectors';
import { FluentIterator } from '../sync';
import * as SyncIterators from '../sync/iterators';

import {
  CollisionHandler,
  Comparator,
  Eventually,
  EventualMapper,
  EventualPredicate,
  EventualReducer,
  MinMax,
} from '../types';

export class PromiseIterator<A> implements Iterator<Promise<A>>, Iterable<Promise<A>> {
  constructor(private readonly iter: Iterator<Promise<A>>) {}

  static empty<A = never>(): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.empty());
  }

  static from<A>(iter: Iterable<Promise<A>> | Iterator<Promise<A>>): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.toIterator(iter));
  }

  collectTo<B>(collector: Collector<A, B>): Promise<B> {
    return Iterators.collectTo(this.iter, collector);
  }

  collect(): Promise<A[]> {
    return this.collectTo(new ArrayCollector());
  }

  collectToSet(): Promise<Set<A>> {
    return this.collectTo(new SetCollector());
  }

  collectToMap<K>(mapper: EventualMapper<A, K>, collisionHandler?: CollisionHandler<K, A>): Promise<Map<K, A>> {
    return this.collectToMap2(async a => [await mapper(a), a], collisionHandler);
  }

  collectToMap2<K, V>(
    mapper: EventualMapper<A, [K, V]>,
    collisionHandler?: CollisionHandler<K, V>
  ): Promise<Map<K, V>> {
    return this.map(mapper).collectTo(new MapCollector(collisionHandler));
  }

  collectToObject<V>(
    mapper: EventualMapper<A, [string, V]>,
    collisionHandler?: CollisionHandler<string, V>
  ): Promise<Record<string, V>> {
    return this.map(mapper).collectTo(new ObjectCollector(collisionHandler));
  }

  filter(predicate: EventualPredicate<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.filter(this.iter, predicate));
  }

  removeNull(): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.removeNull(this.iter));
  }

  filterMap<B>(mapper: EventualMapper<A, B | null | undefined>): AsyncFluentIterator<B> {
    return new AsyncFluentIterator(Iterators.filterMap(this.iter, mapper));
  }

  allSettled(): Promise<PromiseSettledResult<A>[]> {
    return Iterators.allSettled(this.iter);
  }

  race(): Promise<A | undefined> {
    return Iterators.race(this.iter);
  }

  any(): Promise<A | undefined> {
    return Iterators.any(this.iter);
  }

  forEach(mapper: EventualMapper<A, any>): Promise<void> {
    return Iterators.forEach(this.iter, mapper);
  }

  map<B>(mapper: EventualMapper<A, B>): PromiseIterator<B> {
    return new PromiseIterator(Iterators.map(this.iter, mapper));
  }

  flatmap<B>(mapper: EventualMapper<Promise<A>, B>): PromiseIterator<B> {
    return new PromiseIterator(Iterators.flatmap(this.iter, mapper));
  }

  contains(predicate: EventualPredicate<A>): Promise<boolean> {
    return Iterators.contains(this.iter, predicate);
  }

  includes(target: Eventually<A>): Promise<boolean> {
    return Iterators.includes(this.iter, target);
  }

  first(): Promise<A | undefined> {
    return Iterators.first(this.iter);
  }

  fold<B>(reducer: EventualReducer<A, B>, initialValue: B): Promise<B> {
    return Iterators.fold(this.iter, reducer, initialValue);
  }

  reduce(reducer: EventualReducer<A, A>, initialValue?: Eventually<A>): Promise<A | undefined> {
    return Iterators.reduce(this.iter, reducer, initialValue);
  }

  zip<B>(other: Iterator<Promise<B>> | Iterable<Promise<B>>): PromiseIterator<[A, B]> {
    return new PromiseIterator(Iterators.zip(this.iter, SyncIterators.toIterator(other)));
  }

  take(n: number): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.take(this.iter, n));
  }

  skip(n: number): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.skip(this.iter, n));
  }

  enumerate(start = 0): PromiseIterator<[A, number]> {
    return new PromiseIterator(Iterators.enumerate(this.iter, start));
  }

  tap(mapper: EventualMapper<A, any>): PromiseIterator<A> {
    return new PromiseIterator(Iterators.tap(this.iter, mapper));
  }

  append(promises: Iterator<Promise<A>> | Iterable<Promise<A>>): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.append(this.iter, SyncIterators.toIterator(promises)));
  }

  prepend(promises: Iterator<Promise<A>> | Iterable<Promise<A>>): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.prepend(this.iter, SyncIterators.toIterator(promises)));
  }

  concat(...iterables: Array<Iterator<Promise<A>> | Iterable<Promise<A>>>): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.concat(this.iter, ...iterables.map(SyncIterators.toIterator)));
  }

  takeWhile(predicate: EventualPredicate<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.takeWhile(this.iter, predicate));
  }

  skipWhile(predicate: EventualPredicate<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.skipWhile(this.iter, predicate));
  }

  all(predicate: EventualPredicate<A>): Promise<boolean> {
    return Iterators.all(this.iter, predicate);
  }

  some(predicate: EventualPredicate<A>): Promise<boolean> {
    return Iterators.some(this.iter, predicate);
  }

  count(predicate?: EventualPredicate<A>): Promise<number> {
    const iter = predicate ? this.filter(predicate) : this;
    return iter.collectTo(new CountCollector());
  }

  min(comparator?: Comparator<A>): Promise<A | undefined> {
    return this.collectTo(new MinCollector(comparator));
  }

  max(comparator?: Comparator<A>): Promise<A | undefined> {
    return this.collectTo(new MaxCollector(comparator));
  }

  minmax(comparator?: Comparator<A>): Promise<MinMax<A> | undefined> {
    return this.collectTo(new MinMaxCollector(comparator));
  }

  last(): Promise<A | undefined> {
    return this.collectTo(new LastCollector());
  }

  join(separator?: string, prefix?: string, suffix?: string): Promise<string> {
    return this.collectTo(new StringJoiner(separator, prefix, suffix));
  }

  groupBy<K>(mapper: EventualMapper<A, K>): Promise<Map<K, A[]>> {
    return this.groupBy2(async a => [await mapper(a), a]);
  }

  groupBy2<K, V>(mapper: EventualMapper<A, [K, V]>): Promise<Map<K, V[]>> {
    return this.map(mapper).collectTo(new GroupByCollector());
  }

  tally(): Promise<Map<A, number>> {
    return this.collectTo(new TallyCollector());
  }

  partition(size: number): FluentIterator<Promise<A>[]> {
    return new FluentIterator(SyncIterators.partition(this.iter, size));
  }

  [Symbol.iterator](): Iterator<Promise<A>> {
    return this.iter;
  }

  next(): IteratorResult<Promise<A>> {
    return this.iter.next();
  }
}

export function emptyPromiseIterator<A = never>(): PromiseIterator<A> {
  return PromiseIterator.empty();
}

export function promiseIterator<A>(iter: Iterator<Promise<A>> | Iterable<Promise<A>>): PromiseIterator<A> {
  return PromiseIterator.from(iter);
}
