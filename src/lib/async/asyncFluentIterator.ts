import * as Iterators from './asyncIterators';
import { EventualMapper, EventualPredicate, Eventually, Reducer, identity, Mapper } from "../types";

export class AsyncFluentIterator<A> implements AsyncIterable<A> {

  private iter: AsyncIterable<A>;

  constructor(iter: AsyncIterable<A>) {
    this.iter = iter;
  }

  collect(): Promise<A[]> {
    return Iterators.collect(this);
  }

  filter(predicate: EventualPredicate<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.filter(this, predicate));
  }

  map<B>(mapper: EventualMapper<A, B>): AsyncFluentIterator<B> {
    return new AsyncFluentIterator(Iterators.map(this, mapper));
  }

  first(): Promise<A | undefined> {
    return Iterators.first(this);
  }

  take(n: number): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.take(this, n));
  }

  skip(n: number): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.skip(this, n));
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

  fold<B>(reducer: Reducer<A, B>, initialValue: B): Promise<B> {
    return Iterators.fold(this, reducer, initialValue);
  }

  reduce(reducer: Reducer<A, A>, initialValue?: A): Promise<A | undefined> {
    return Iterators.reduce(this, reducer, initialValue);
  }

  zip<B>(other: AsyncIterable<B>): AsyncFluentIterator<[A, B]> {
    return new AsyncFluentIterator(Iterators.zip(this, other));
  }

  enumerate(): AsyncFluentIterator<[A, number]> {
    return new AsyncFluentIterator(Iterators.enumerate(this));
  }

  tap(mapper: EventualMapper<A, any>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.tap(this, mapper));
  }

  forEach(mapper: EventualMapper<A, any>): Promise<void> {
    return Iterators.forEach(this, mapper);
  }

  append(items: AsyncIterable<A> | Iterable<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.append(this, items));
  }

  prepend(items: AsyncIterable<A> | Iterable<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.prepend(this, items));
  }

  concat(...iterables: Array<Iterable<A> | AsyncIterable<A>>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.concat(this, ...iterables));
  }

  takeWhile(predicate: EventualPredicate<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.takeWhile(this, predicate));
  }

  skipWhile(predicate: EventualPredicate<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.skipWhile(this, predicate));
  }

  distinct(): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.distinct(this));
  }

  all(predicate: EventualPredicate<A>): Promise<boolean> {
    return Iterators.all(this, predicate);
  }

  some(predicate: EventualPredicate<A>): Promise<boolean> {
    return Iterators.some(this, predicate);
  }

  sum(mapper: Mapper<A, number> = identity as Mapper<A, number>): Promise<number> {
    return Iterators.sum(Iterators.map(this, mapper));
  }

  avg(mapper: Mapper<A, number> = identity as Mapper<A, number>): Promise<number> {
    return Iterators.avg(Iterators.map(this, mapper));
  }

  count(predicate?: EventualPredicate<A>): Promise<number> {
    return Iterators.count(this, predicate);
  }

  [Symbol.asyncIterator](): AsyncIterator<A> {
    return this.iter[Symbol.asyncIterator]();
  }
}

export function asyncIterator<A>(iter: AsyncIterable<A>): AsyncFluentIterator<A> {
  return new AsyncFluentIterator(iter);
}
