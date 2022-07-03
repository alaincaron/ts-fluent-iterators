import * as Iterators from './promiseIterators';
import * as SyncIterators from "../sync/iterators";
import { AsyncFluentIterator } from "../async/asyncFluentIterator";

import { Eventually, EventualReducer, EventualMapper, EventualPredicate, asyncIdentity } from "../types";

export class PromiseIterator<A> implements Iterable<Promise<A>> {

  private iter: Iterable<Promise<A>>;

  constructor(iter: Iterable<Promise<A>>) {
    this.iter = iter;
  }

  collect(): Promise<A[]> {
    return Iterators.collect(this);
  }

  filter(predicate: EventualPredicate<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.filter(this, predicate));
  }

  allSettled(): Promise<PromiseSettledResult<A>[]> {
    return Iterators.allSettled(this);
  }

  race(): Promise<A | undefined> {
    return Iterators.race(this);
  }

  any(): Promise<A | undefined> {
    return Iterators.any(this);
  }

  forEach(mapper: EventualMapper<A, any>): Promise<void> {
    return Iterators.forEach(this, mapper);
  }

  map<B>(mapper: EventualMapper<A, B>): PromiseIterator<B> {
    return new PromiseIterator(Iterators.map(this, mapper));
  }

  flatmap<B>(mapper: EventualMapper<Promise<A>, B>): PromiseIterator<B> {
    return new PromiseIterator(Iterators.flatmap(this, mapper));
  }

  find(predicate: EventualPredicate<A>): Promise<A | undefined> {
    return Iterators.find(this, predicate);
  }

  contains(predicate: EventualPredicate<A>): Promise<boolean> {
    return Iterators.contains(this, predicate);
  }

  includes(target: Eventually<A>): Promise<boolean> {
    return Iterators.includes(this, target);
  }

  first(): Promise<A | undefined> {
    return Iterators.first(this);
  }

  fold<B>(reducer: EventualReducer<A, B>, initialValue: B): Promise<B> {
    return Iterators.fold(this, reducer, initialValue);
  }

  reduce(reducer: EventualReducer<A, A>, initialValue?: Eventually<A>): Promise<A | undefined> {
    return Iterators.reduce(this, reducer, initialValue);
  }

  zip<B>(other: Iterable<Promise<B>>): PromiseIterator<[A, B]> {
    return new PromiseIterator(Iterators.zip(this, other));
  }

  take(n: number): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.take(this, n));
  }

  skip(n: number): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.skip(this, n));
  }

  enumerate(): PromiseIterator<[A, number]> {
    return new PromiseIterator(Iterators.enumerate(this));
  }

  tap(mapper: EventualMapper<A, any>): PromiseIterator<A> {
    return new PromiseIterator(Iterators.tap(this, mapper));
  }

  append(promises: Iterable<Promise<A>>): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.append(this, promises));
  }

  prepend(promises: Iterable<Promise<A>>): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.prepend(this, promises));
  }

  concat(...iterables: Iterable<Promise<A>>[]): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.concat(this, ...iterables));
  }

  takeWhile(predicate: EventualPredicate<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.takeWhile(this, predicate));
  }

  skipWhile(predicate: EventualPredicate<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.skipWhile(this, predicate));
  }

  all(predicate: EventualPredicate<A>): Promise<boolean> {
    return Iterators.all(this, predicate);
  }

  some(predicate: EventualPredicate<A>): Promise<boolean> {
    return Iterators.some(this, predicate);
  }

  sum(mapper: EventualMapper<A, number> = asyncIdentity as EventualMapper<A, number>): Promise<number> {
    return Iterators.sum(Iterators.map(this, mapper));
  }

  avg(mapper: EventualMapper<A, number> = asyncIdentity as EventualMapper<A, number>): Promise<number> {
    return Iterators.avg(Iterators.map(this, mapper));
  }

  count(predicate?: EventualPredicate<A>): Promise<number> {
    return Iterators.count(this, predicate);
  }

  [Symbol.iterator](): Iterator<Promise<A>> {
    return this.iter[Symbol.iterator]();
  }
}

export function promiseIterator<A>(iter: Iterable<Promise<A>>): PromiseIterator<A> {
  return new PromiseIterator(iter);
}
