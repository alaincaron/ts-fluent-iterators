import * as Iterators from './asyncIterators';
import {
  ArrayCollector,
  AsyncCollectorDecorator,
  AsyncCollectorFilter,
  AvgCollector,
  CountCollector,
  EventualCollector,
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
import { asyncKeyMapper } from '../functions';
import {
  CollisionHandler,
  Comparator,
  EventualIterable,
  EventualIterator,
  Eventually,
  EventualMapper,
  EventualPredicate,
  EventualReducer,
  MinMax,
} from '../types';

export class AsyncFluentIterator<A> implements AsyncIterator<A>, AsyncIterable<A> {
  constructor(private readonly iter: AsyncIterator<A>) {}

  static empty<A = never>(): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.empty());
  }

  static from<A>(iter: AsyncIterator<A> | EventualIterable<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.toAsyncIterator(iter));
  }

  collectTo<B>(collector: EventualCollector<A, B>): Promise<B> {
    return Iterators.collectTo(this.iter, collector);
  }

  collect(): Promise<A[]> {
    return this.collectTo(new ArrayCollector());
  }

  collectToSet(): Promise<Set<A>> {
    return this.collectTo(new SetCollector());
  }

  collectToMap<K>(mapper: EventualMapper<A, K>, collisionHandler?: CollisionHandler<K, A>): Promise<Map<K, A>> {
    return this.collectTo(new AsyncCollectorDecorator(new MapCollector(collisionHandler), asyncKeyMapper(mapper)));
  }

  collectToObject<V>(
    mapper: EventualMapper<A, [string, V]>,
    collisionHandler?: CollisionHandler<string, V>
  ): Promise<Record<string, V>> {
    return this.collectTo(new AsyncCollectorDecorator(new ObjectCollector(collisionHandler), mapper));
  }

  filter(predicate: EventualPredicate<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.filter(this.iter, predicate));
  }

  map<B>(mapper: EventualMapper<A, B>): AsyncFluentIterator<B> {
    return new AsyncFluentIterator(Iterators.map(this.iter, mapper));
  }

  filterMap<B>(mapper: EventualMapper<A, B | null | undefined>): AsyncFluentIterator<B> {
    return new AsyncFluentIterator(Iterators.filterMap(this.iter, mapper));
  }

  removeNull(): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.removeNull(this.iter));
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
    return this.collectTo(new AsyncCollectorDecorator(new SumCollector(), mapper));
  }

  avg(mapper?: EventualMapper<A, number>): Promise<number> {
    return this.collectTo(new AsyncCollectorDecorator(new AvgCollector(), mapper));
  }

  count(predicate?: EventualPredicate<A>): Promise<number> {
    return this.collectTo(new AsyncCollectorFilter(new CountCollector(), predicate));
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

  last(predicate?: EventualPredicate<A>): Promise<A | undefined> {
    return this.collectTo(new AsyncCollectorFilter(new LastCollector(), predicate));
  }

  join(separator?: string, prefix?: string, suffix?: string): Promise<string> {
    return this.collectTo(new StringJoiner(separator, prefix, suffix));
  }

  groupBy<K>(mapper: EventualMapper<A, K>): Promise<Map<K, A[]>> {
    return this.collectTo(new AsyncCollectorDecorator(new GroupByCollector(), asyncKeyMapper(mapper)));
  }

  tally<K>(mapper?: EventualMapper<A, K>): Promise<Map<K, number>> {
    return this.collectTo(new AsyncCollectorDecorator(new TallyCollector(), mapper));
  }

  partition(size: number): AsyncFluentIterator<A[]> {
    return new AsyncFluentIterator(Iterators.partition(this.iter, size));
  }

  [Symbol.asyncIterator](): AsyncIterator<A> {
    return this.iter;
  }

  next(): Promise<IteratorResult<A>> {
    return this.iter.next();
  }
}

export function emptyAsyncIterator<A = never>(): AsyncFluentIterator<A> {
  return AsyncFluentIterator.empty();
}

export function asyncIterator<A>(iter: AsyncIterator<A> | EventualIterable<A>): AsyncFluentIterator<A> {
  return AsyncFluentIterator.from(iter);
}
