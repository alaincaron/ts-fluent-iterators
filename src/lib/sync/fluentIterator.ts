import * as Iterators from './iterators';
import { AsyncFluentIterator, toAsync } from '../async';
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
import { PromiseIterator, toPromise } from '../promise';
import { CollisionHandler, Comparator, IteratorGenerator, Mapper, MinMax, Predicate, Reducer } from '../types';

/**
 * Iterator with a Fluent interface.
 * @typeParam A The type of elements being iterated.
 */
export class FluentIterator<A> implements Iterator<A>, Iterable<A> {
  private iter: Iterator<A>;

  /**
   * Creates a `FluentIterator` by wrapping an `Iterator`
   * @param iter The `Iterator` being wrapped into a `FluentIterator`
   * @example
   * const iterator = new FluentIterator([1,2,3][Symbol.iterator]());
   */
  constructor(iter: Iterator<A>) {
    this.iter = iter;
  }

  /**
   * Creates an empty `FluentIterator`.  The returned iterator will not yield any element.
   * @typeParam A the type of elements of the `FluentIterator`
   * @returns An empty `FluentIterator`
   */
  static empty<A = never>(): FluentIterator<A> {
    return new FluentIterator(Iterators.empty());
  }

  /**
   * Creates a `FluentIterator` from an `IteratorGenerator`.
   * @typeParam A the type of elements of the `FluentIterator`
   * @param generator Used to generate an `Iterator` that will be wrapped into a `FluentIterator`
   * @returns A new `FluentIterator`
   * @example
   * const iterator = FluentIterator.from([1,2,3]);
   */
  static from<A>(generator: IteratorGenerator<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.toIterator(generator));
  }

  /**
   * Collects items from the `FluentIterator` into a `Collector`.
   * @typeParam B The result type of the `Collector`.
   * @param collector The `Collector` into which to collect the items
   * @returns The result of the `collector`
   * @example
   * const collector = new ArrayCollector<string>;
   * const iterator = FluentIterator.from([1,2,3]);
   * const data = iterator.collectTo(collector);
   * // data is [1,2,3]
   */
  collectTo<B>(collector: Collector<A, B>): B {
    return Iterators.collectTo(this.iter, collector);
  }

  /**
   * Collects items into an array.
   * @returns an array consisting of the elements of this `FluentIterator`
   * @example
   * const iterator = FluentIterator.from([1,2,3]);
   * const data = iterator.collect();
   * // data is [1,2,3]
   */
  collect(): A[] {
    return this.collectTo(new ArrayCollector());
  }

  /**
   * Collects items into a `Set`.
   * @returns a Set consisting of the elements of this {@link FluentIterator}
   * @example
   * const iterator = FluentIterator.from([1,2,3,1,2,3]);
   * const data = iterator.collectToSet();
   * // data is Set { 1,2,3 }
   */
  collectToSet(): Set<A> {
    return this.collectTo(new SetCollector());
  }

  /**
   * Collects items into a `Map` by mapping values into keys.
   * @typeParam K The type of the keys of the `Map`
   *
   * @param mapper Maps the values into keys
   * @param collisionHandler  Specifies how to handle the collision. Default is to ignore collision.
   * @returns a Map whose keys are the result of applying the `mapper` to the values of this {@link FluentIterator} and the values are iterated items.

   * @example
   * const iterator = FluentIterator.from("foo","bar","foobar")
   * const data = iterator.collectToMap(s => s.length);
   * // data is Map {3 => "foo", 6 => "foobar"}
   */
  collectToMap<K>(mapper: Mapper<A, K>, collisionHandler?: CollisionHandler<K, A>): Map<K, A> {
    return this.collectToMap2(a => [mapper(a), a], collisionHandler);
  }

  /**
   * Collects items into a `Map` by mapping values into keys and new value
   * @typeParam K The type of the keys of the `Map`
   * @typeParam V The type of the values of the `Map`
   *
   * @param mapper Maps the values into [key, values] pairs
   * @param collisionHandler  Specifies how to handle the collision. Default is to ignore collision.
   * @returns a Map whose entries are the result of applying the `mapper` to the values of this {@link FluentIterator}.

   * @example
   * const iterator = FluentIterator.from("foo","bar","foobar")
   * const data = iterator.collectToMap2(s => [s, s.length]);
   * // data is Map { "foo" => 3, "bar" => 3, "foobar" => 6 }
   */
  collectToMap2<K, V>(mapper: Mapper<A, [K, V]>, collisionHandler?: CollisionHandler<K, V>): Map<K, V> {
    return this.map(mapper).collectTo(new MapCollector(collisionHandler));
  }

  /**
   * Collects items into a `Record` by mapping values into keys and new value
   * @typeParam V The type of the values of the `Map`
   *
   * @param mapper Maps the values into [key, values] pairs
   * @param collisionHandler  Specifies how to handle the collision. Default is to ignore collision.
   * @returns a `Record` whose entries are the result of applying the `mapper` to the values of this {@link FluentIterator}.

   * @example
   * const iterator = FluentIterator.from("foo","bar","foobar")
   * const data = iterator.collectToObject(s => [s, s.length]);
   * // data is { foo: 3, bar: 3, foobar: 6 }
   */
  collectToObject<V>(
    mapper: Mapper<A, [string, V]>,
    collisionHandler?: CollisionHandler<string, V>
  ): Record<string, V> {
    return this.map(mapper).collectTo(new ObjectCollector(collisionHandler));
  }

  /**
   * Returns a new {@link FluentIterator} consisting of elements for which the `predicate` evaluates to true.
   *
   * @param predicate the predicate on which the evaluate the items.
   * @returns a new {@link FluentIterator} consisting of elements of this {@link FluentIterator} for which the `predicate` evaluates to true.
   * @example
   * const iterator = FluentIterator.from([1,8,2,3,4,6]).filter(x => x % 2 === 1);
   * // yields 1, 2
   */
  filter(predicate: Predicate<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.filter(this.iter, predicate));
  }

  /**
   * Returns a new {@link FluentIterator} consisting of elements of this {@link FluentIterator} that are not `null` nor `undefined`
   *
   * @returns a new {@link FluentIterator} where all the `null` or `undefined` elements are removed.
   */
  removeNull(): FluentIterator<A> {
    return new FluentIterator(Iterators.removeNull(this.iter));
  }

  /**
   * Returns a new {@link FluentIterator} consisting of applying the {@link Mapper} to all elements of this {@link FluentIterator}.
   * @typeParam B The type of the elements of the returned {@link FluentIterator}
   * @param mapper Transformation applied to elements of this {@link FluentIterator}
   * @returns A new {@link FluentIterator}
   * @example
   * const iter = FluentIterator.from(['foo','bar',foobar'])
   * iter.map(s => s.length)
   * // yields 3, 3, 6
   */
  map<B>(mapper: Mapper<A, B>): FluentIterator<B> {
    return new FluentIterator(Iterators.map(this.iter, mapper));
  }

  /**
   * Returns a new {@link FluentIterator} consisting of applying the {@link Mapper} to all elements of this {@link FluentIterator} and filtering those for which the {@link Mapper} returned null or undefined
   * @typeParam B The type of the elements of the returned {@link FluentIterator}
   * @param mapper Transformation applied to elements of this {@link FluentIterator}
   * @returns A new {@link FluentIterator}
   * @remarks
   * ```ts
   * iter.filterMap(mapper)
   * ```
   * is equivalent to
   * ```ts
   * iter.map(mapper).removeNull()
   * ```
   */
  filterMap<B>(mapper: Mapper<A, B | null | undefined>): FluentIterator<B> {
    return new FluentIterator(Iterators.filterMap(this.iter, mapper));
  }

  /**
   * Returns the first element of this {@link FluentIterator} or `undefined` if this {@link FluentIterator} is empty.
   *
   * @returns The first element of this {@link FluentIterator} or `undefined`.
   */
  first(): A | undefined {
    return Iterators.first(this.iter);
  }

  /**
   * Returns a {@link FluentIterator} yielding the first `n` elements of this {@link FluentIterator}.
   *
   * @param n The number of elements to take
   * @returns a {@link FluentIterator} yielding the first `n` elements of this {@link FluentIterator}.
   * @remarks If there are less than `n` elements in this {@link FluentIterator}, then only the available elements will be yielded.
   */
  take(n: number): FluentIterator<A> {
    return new FluentIterator(Iterators.take(this.iter, n));
  }

  /**
   * Returns a {@link FluentIterator} skipping the first `n` elements of this {@link FluentIterator} and then yielding the subsequent ones.
   *
   * @param n The number of elements to skip
   * @returns a {@link FluentIterator} skpping the first `n` elements of this {@link FluentIterator}.
   * @remarks If there are less than `n` elements in this {@link FluentIterator}, then an empty {@link FluentIterator} is returned.
   */
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

  all(predicate: Predicate<A>): boolean {
    return Iterators.all(this.iter, predicate);
  }

  some(predicate: Predicate<A>): boolean {
    return Iterators.some(this.iter, predicate);
  }

  count(): number {
    return this.collectTo(new CountCollector());
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

  last(): A | undefined {
    return this.collectTo(new LastCollector());
  }

  join(separator?: string, prefix?: string, suffix?: string): string {
    return this.collectTo(new StringJoiner(separator, prefix, suffix));
  }

  groupBy<K>(mapper: Mapper<A, K>): Map<K, A[]> {
    return this.groupBy2(a => [mapper(a), a]);
  }

  groupBy2<K, V>(mapper: Mapper<A, [K, V]>): Map<K, V[]> {
    return this.map(mapper).collectTo(new GroupByCollector());
  }

  tally(): Map<A, number> {
    return this.collectTo(new TallyCollector());
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

/**
 * Alias for {@link FluentIterator.from}
 */
export function iterator<A>(iter: IteratorGenerator<A>): FluentIterator<A> {
  return FluentIterator.from(iter);
}

/**
 * Alias for {@link FluentIterator.empty}
 */
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
/**
 * Adding method to `Array` prototype.
 *
 */
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
