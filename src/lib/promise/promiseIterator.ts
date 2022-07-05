import * as Iterators from './promiseIterators';
import * as SyncIterators from "../sync/iterators";
import { AsyncFluentIterator } from "../async/asyncFluentIterator";

import { Eventually, EventualReducer, EventualMapper, EventualPredicate, Comparator } from "../types";
import { asyncIdentity } from "../functions";

export class PromiseIterator<A> implements Iterator<Promise<A>>, Iterable<Promise<A>> {

  private iter: Iterator<Promise<A>>;

  constructor(iter: Iterator<Promise<A>>) {
    this.iter = iter;
  }

  collect(): Promise<A[]> {
    return Iterators.collect(this.iter);
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

  find(predicate: EventualPredicate<A>): Promise<A | undefined> {
    return Iterators.find(this.iter, predicate);
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

  zip<B>(other: Iterator<Promise<B>>): PromiseIterator<[A, B]> {
    return new PromiseIterator(Iterators.zip(this.iter, other));
  }

  take(n: number): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.take(this.iter, n));
  }

  skip(n: number): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.skip(this.iter, n));
  }

  enumerate(): PromiseIterator<[A, number]> {
    return new PromiseIterator(Iterators.enumerate(this.iter));
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

  distinct(): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.distinct(this.iter));
  }

  all(predicate: EventualPredicate<A>): Promise<boolean> {
    return Iterators.all(this.iter, predicate);
  }

  some(predicate: EventualPredicate<A>): Promise<boolean> {
    return Iterators.some(this.iter, predicate);
  }

  sum(mapper: EventualMapper<A, number> = asyncIdentity as EventualMapper<A, number>): Promise<number> {
    return Iterators.sum(Iterators.map(this.iter, mapper));
  }

  avg(mapper: EventualMapper<A, number> = asyncIdentity as EventualMapper<A, number>): Promise<number> {
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

  last(predicate?: EventualPredicate<A>): Promise<A | undefined> {
    return Iterators.last(this.iter, predicate);
  }

  join(separator?: string): Promise<string> {
    return Iterators.join(this.iter, separator);
  }

  collectSorted(comparator?: Comparator<A>): Promise<A[]> {
    return Iterators.collectSorted(this.iter, comparator);
  }

  sort(comparator?: Comparator<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.sort(this.iter, comparator));
  }

  collectToMap<K>(mapper: EventualMapper<A, K>): Promise<Map<K, A[]>> {
    return Iterators.collectToMap(this.iter, mapper);
  }

  partition<K>(mapper: EventualMapper<A, K>): AsyncFluentIterator<[K, A[]]> {
    return new AsyncFluentIterator(Iterators.partition(this.iter, mapper));
  }

  [Symbol.iterator](): Iterator<Promise<A>> {
    return this.iter;
  }

  next(): IteratorResult<Promise<A>> {
    return this.iter.next();
  }
}

export function promiseIterator<A>(iter: Iterator<Promise<A>> | Iterable<Promise<A>>): PromiseIterator<A> {
  return new PromiseIterator(SyncIterators.toIterator(iter));
}
