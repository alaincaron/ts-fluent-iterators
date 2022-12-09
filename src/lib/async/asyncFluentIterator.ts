import * as Iterators from './asyncIterators';
import { EventualMapper, EventualPredicate, Eventually, Comparator, EventualReducer, EventualIterable, EventualIterator, MinMax } from "../types";
import { identity } from "../functions";

export class AsyncFluentIterator<A> implements AsyncIterator<A>, AsyncIterable<A> {

  private iter: AsyncIterator<A>;

  constructor(iter: AsyncIterator<A>) {
    this.iter = iter;
  }

  collect(): Promise<A[]> {
    return Iterators.collect(this.iter);
  }

  filter(predicate: EventualPredicate<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.filter(this.iter, predicate));
  }

  map<B>(mapper: EventualMapper<A, B>): AsyncFluentIterator<B> {
    return new AsyncFluentIterator(Iterators.map(this.iter, mapper));
  }

  first(predicate?: EventualPredicate<A>): Promise<A | undefined> {
    return Iterators.first(this.iter, predicate);
  }

  take(n: number): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.take(this.iter, n));
  }

  skip(n: number): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.skip(this.iter, n));
  }

  contains(predicate: EventualPredicate<A>): Promise<boolean> {
    return Iterators.contains(this.iter, predicate);
  }

  includes(target: Eventually<A>): Promise<boolean> {
    return Iterators.includes(this.iter, target);
  }

  fold<B>(reducer: EventualReducer<A, B>, initialValue: B): Promise<B> {
    return Iterators.fold(this.iter, reducer, initialValue);
  }

  reduce(reducer: EventualReducer<A, A>, initialValue?: A): Promise<A | undefined> {
    return Iterators.reduce(this.iter, reducer, initialValue);
  }

  zip<B>(other: AsyncIterator<B> | AsyncIterable<B>): AsyncFluentIterator<[A, B]> {
    return new AsyncFluentIterator(Iterators.zip(this.iter, Iterators.toAsyncIterator(other)));
  }

  enumerate(start = 0): AsyncFluentIterator<[A, number]> {
    return new AsyncFluentIterator(Iterators.enumerate(this.iter, start));
  }

  tap(mapper: EventualMapper<A, any>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.tap(this.iter, mapper));
  }

  forEach(mapper: EventualMapper<A, any>): Promise<void> {
    return Iterators.forEach(this.iter, mapper);
  }

  append(items: EventualIterator<A> | EventualIterable<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.append(this.iter, Iterators.toEventualIterator(items)));
  }

  prepend(items: EventualIterator<A> | EventualIterable<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.prepend(this.iter, Iterators.toEventualIterator(items)));
  }

  concat(...iterables: Array<EventualIterable<A> | EventualIterator<A>>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.concat(this.iter, ...iterables.map(Iterators.toEventualIterator)));
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

  sort(comparator?: Comparator<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.sort(this.iter, comparator));
  }

  collectToMap<K>(mapper: EventualMapper<A, K>): Promise<Map<K, A[]>> {
    return Iterators.collectToMap(this.iter, mapper);
  }

  partition<K>(mapper: EventualMapper<A, K>): AsyncFluentIterator<[K, A[]]> {
    return new AsyncFluentIterator(Iterators.partition(this.iter, mapper));
  }

  tally<K>(mapper?: EventualMapper<A, K>): Promise<Map<K, number>> {
    return Iterators.tally(this.iter, mapper);
  }

  chunk(chunk_size: number): AsyncFluentIterator<A[]> {
    return new AsyncFluentIterator(Iterators.chunk(this.iter, chunk_size));
  }

  [Symbol.asyncIterator](): AsyncIterator<A> {
    return this.iter;
  }

  next(): Promise<IteratorResult<A>> {
    return this.iter.next();
  }
}

export function asyncIterator<A>(iter: AsyncIterator<A> | EventualIterable<A>): AsyncFluentIterator<A> {
  return new AsyncFluentIterator(Iterators.toAsyncIterator(iter));
}
