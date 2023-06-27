import * as Iterators from './promiseIterators';
import * as SyncIterators from '../sync/iterators';
import { AsyncFluentIterator } from '../async';
import { FluentIterator } from '../sync';

import {
  Mapper,
  Eventually,
  EventualReducer,
  EventualMapper,
  EventualPredicate,
  Comparator,
  MinMax,
  CollisionHandler,
} from '../types';
import { identity } from '../functions';
import {
  ArrayCollector,
  Collector,
  GroupByCollector,
  MapCollector,
  ObjectCollector,
  SetCollector,
  TallyCollector,
} from '../collectors';

export class PromiseIterator<A> implements Iterator<Promise<A>>, Iterable<Promise<A>> {
  private iter: Iterator<Promise<A>>;

  constructor(iter: Iterator<Promise<A>>) {
    this.iter = iter;
  }

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

  collectToMap<K, V>(mapper: Mapper<A, [K, V]>, collisionHandler?: CollisionHandler<K, V>): Promise<Map<K, V>> {
    return this.collectTo(new MapCollector(mapper, collisionHandler));
  }

  collectToObject<V>(
    mapper: Mapper<A, [string, V]>,
    collisionHandler?: CollisionHandler<string, V>
  ): Promise<Record<string, V>> {
    return this.collectTo(new ObjectCollector(mapper, collisionHandler));
  }

  filter(predicate: EventualPredicate<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.filter(this.iter, predicate));
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

  first(predicate?: EventualPredicate<A>): Promise<A | undefined> {
    return Iterators.first(this.iter, predicate);
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

  distinct<B>(mapper?: EventualMapper<A, B>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.distinct(this.iter, mapper));
  }

  all(predicate: EventualPredicate<A>): Promise<boolean> {
    return Iterators.all(this.iter, predicate);
  }

  some(predicate: EventualPredicate<A>): Promise<boolean> {
    return Iterators.some(this.iter, predicate);
  }

  sum(mapper?: EventualMapper<A, number>): Promise<number> {
    mapper ??= identity as EventualMapper<A, number>;
    return Iterators.sum(Iterators.map(this.iter, mapper));
  }

  avg(mapper?: EventualMapper<A, number>): Promise<number> {
    mapper ??= identity as EventualMapper<A, number>;
    return Iterators.avg(Iterators.map(this.iter, mapper));
  }

  count(predicate?: EventualPredicate<A>): Promise<number> {
    return Iterators.count(this.iter, predicate);
  }

  min(comparator?: Comparator<A>): Promise<A | undefined> {
    return Iterators.min(this.iter, comparator);
  }

  max(comparator?: Comparator<A>): Promise<A | undefined> {
    return Iterators.max(this.iter, comparator);
  }

  minmax(comparator?: Comparator<A>): Promise<MinMax<A>> {
    return Iterators.minmax(this.iter, comparator);
  }

  last(predicate?: EventualPredicate<A>): Promise<A | undefined> {
    return Iterators.last(this.iter, predicate);
  }

  join(separator?: string): Promise<string> {
    return Iterators.join(this.iter, separator);
  }

  groupBy<K>(mapper: Mapper<A, K>): Promise<Map<K, A[]>> {
    return this.collectTo(new GroupByCollector(mapper));
  }

  tally<K>(mapper?: Mapper<A, K>): Promise<Map<K, number>> {
    return this.collectTo(new TallyCollector(mapper));
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
