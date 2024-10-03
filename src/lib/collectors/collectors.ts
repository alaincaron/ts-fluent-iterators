import * as Comparators from '../comparators';
import { emptyIterator, FluentIterator } from '../sync/fluentIterator';
import { CollisionHandler, Comparator, MinMax, Reducer } from '../utils';

/**
 * A `Collector` is an object that collects elements of type `A` and aggregates them into an object of type `B`.
 * @typeParam A the type of elements being collected.
 * @typeParam B the type of the aggregated object.
 */
export interface Collector<A, B> {
  /**
   * Collects an element.
   * @param a The element being collected.
   */
  collect(a: A): void;

  /**
   * Returns the aggregated object.
   * @returns The aggregated object resulting from collecting all objects
   */
  get result(): B;
}

/**
 * An `AsyncCollector` is an object that asynchronously collects elements of type `A` and aggregates them into an object of type `B`.
 * @typeParam A the type of elements being collected.
 * @typeParam B the type of the aggregated object.
 */
export interface AsyncCollector<A, B> {
  /**
   * Collects an element.
   * @param a The element being collected.
   */
  collect(a: A): Promise<void>;

  /**
   * Returns the aggregated object.
   * @returns The aggregated object resulting from collecting all objects
   */
  get result(): B;
}

/**
 * A `Collector` or an `AsyncCollector`.
 * @interface
 */
export type EventualCollector<A, B> = Collector<A, B> | AsyncCollector<A, B>;

/**
 * A Collector that collects elements of type `A` into an array of type `A[]`.
 * @typeParam A the type of elements being collected.
 */
export class ArrayCollector<A> implements Collector<A, A[]> {
  private readonly acc: A[] = [];

  collect(a: A): void {
    this.acc.push(a);
  }

  get result(): A[] {
    return this.acc;
  }
}

/**
 * A Collector that collects elements of type `A` into a `Set` of type `Set<A>`.
 * @typeParam A the type of elements being collected.
 */
export class SetCollector<A> implements Collector<A, Set<A>> {
  private readonly acc: Set<A> = new Set();

  collect(a: A): void {
    this.acc.add(a);
  }

  get result(): Set<A> {
    return this.acc;
  }
}

/**
 * A `Collector` that accepts key-value pairs of type `[K,V]` and collects them to a `Map<K,V[]>` object.
 * @typeParam K The type of the keys of the map.
 * @typeParam V the type of the values in the map.
 *
 * @example
 * const c = new GroupBycollector<string,number>();
 * c.collect(['foo',1]);
 * c.collect(['bar' 2]);
 * c.collect(['foo',2]);
 * //c.result : Map(2) { 'foo' => [1, 2], 'bar' => [2] }
 */
export class GroupByCollector<K, V> implements Collector<[K, V], Map<K, V[]>> {
  private readonly map: Map<K, V[]> = new Map();

  get result(): Map<K, V[]> {
    return this.map;
  }

  collect([k, v]: [K, V]) {
    let arr = this.map.get(k);
    if (!arr) {
      arr = [];
      this.map.set(k, arr);
    }
    arr.push(v);
  }
}

/**
 * A `Collector` that accepts key-value pairs of type `[K,V]` and collects them to a `Map<K,V>` object.
 * @typeParam K The type of the keys of the map.
 * @typeParam V the type of the values in the map.
 *
 * @example
 * const c = new MapCollector<string,number>();
 * c.collect(['foo',1]);
 * c.collect(['bar' 2]);
 * c.collect(['foo',3]);
 * //c.result : Map.set('foo',3).set('bar',2)
 */
export class MapCollector<K, V> implements Collector<[K, V], Map<K, V>> {
  private readonly map: Map<K, V> = new Map();

  /**
   * @param collisionHandler Specify how to handle collisions.  Default is to ignore collisions, i.e. newer elements override previous ones.
   */
  constructor(private readonly collisionHandler?: CollisionHandler<K, V>) {}

  get result(): Map<K, V> {
    return this.map;
  }

  collect([k, v]: [K, V]) {
    if (!this.collisionHandler) {
      this.map.set(k, v);
    } else {
      const oldValue = this.map.get(k);
      const effectiveValue = oldValue != null ? this.collisionHandler(k, oldValue, v) : v;
      if (effectiveValue !== oldValue) this.map.set(k, effectiveValue);
    }
  }
}

/**
 * A `Collector` that accepts key-value pairs of type `[string,V]` and collects them to a `Record<string,V>` object.
 * @typeParam V the type of properties in the returned object.
 *
 * @example
 * const c = new ObjectCollector<number>();
 * c.collect(['foo',1]);
 * c.collect(['bar' 2]);
 * c.collect(['foo',3]);
 * //c.result : { foo: 3, bar: 2 }
 */
export class ObjectCollector<V> implements Collector<[string, V], Record<string, V>> {
  private readonly hash: Record<string, V> = {};

  /**
   * @param collisionHandler Specify how to handle collisions.  Default is to ignore collisions, i.e. newer elements override previous ones.
   */
  constructor(private readonly collisionHandler?: CollisionHandler<string, V>) {}

  get result(): Record<string, V> {
    return this.hash;
  }

  collect([k, v]: [string, V]) {
    if (!this.collisionHandler) {
      this.hash[k] = v;
    } else {
      const oldValue = this.hash[k];
      const effectiveValue = oldValue != null ? this.collisionHandler(k, oldValue, v) : v;
      if (effectiveValue !== oldValue) this.hash[k] = effectiveValue;
    }
  }
}

/**
 * A `Collector` that accepts `Iterable<A>` or `Iterator<A>` and returns a `FluentIterator<A>` that consists of the concatenation of all the collected iterable objects.
 *
 * @typeParam A the type of elements being iterated on.
 * @example
 * const c = new FlattenCollector<number>();
 * c.collect([1,2]);
 * c.collect([3,4]);
 * c.result.collect() : [1,2,3,4]
 */
export class FlattenCollector<A> implements Collector<Iterable<A> | Iterator<A>, FluentIterator<A>> {
  private iter: FluentIterator<A> = emptyIterator();

  get result(): FluentIterator<A> {
    return this.iter;
  }

  collect(a: Iterable<A> | Iterator<A>) {
    this.iter = this.iter.concat(a);
  }
}

/**
 * A `Collector` that accepts elements of type `K` and returns a `Map<K,number>` indicating how many times has an element been seen.
 *
 * @typeParam K The type of the keys of the map.
 * @example
 * const c = new TallyCollector<string>();
 * c.collect('foo');
 * c.collect('bar');
 * c.collect('foo');
 // c.result : Map(2) { 'foo' => 2, 'bar' => 1 }
 */
export class TallyCollector<K> implements Collector<K, Map<K, number>> {
  private readonly map: Map<K, number> = new Map();

  get result(): Map<K, number> {
    return this.map;
  }

  collect(k: K) {
    const v = this.map.get(k);
    this.map.set(k, (v ?? 0) + 1);
  }
}

/**
 * A `Collector` that accepts elements of type `A` and returns a `string`
 *
 * @typeParam A The type of the elements being accepted.
 * @example
 * const c = new StringJoiner<string>(', ', '[', ']');
 * c.collect('foo');
 * c.collect('bar');
 * c.collect('baz');
 // c.result : [foo, bar, baz]
 */
export class StringJoiner<A> implements Collector<A, string> {
  private acc: string;
  private first = true;
  private done = false;

  /**
   * @param separator separator between elements.
   * @param prefix prefix of the joined string.
   * @param suffix suffix of the joined string.
   */
  constructor(
    private readonly separator: string = ',',
    prefix = '',
    private readonly suffix = ''
  ) {
    this.acc = prefix;
  }

  collect(a: A) {
    if (this.first) {
      this.first = false;
    } else {
      this.acc = `${this.acc}${this.separator}`;
    }
    this.acc = `${this.acc}${a}`;
  }

  get result() {
    if (!this.done) {
      this.acc = `${this.acc}${this.suffix}`;
      this.done = true;
    }
    return this.acc;
  }
}

/**
 * A `Collector` that accepts numbers and return their average.
 * @example
 * const c = new AvgCollector();
 * c.collect(1);
 * c.collect(2);
 * c.result : 1.5
 */
export class AvgCollector implements Collector<number, number> {
  private n: number = 0;
  private avg: number = 0;

  collect(a: number) {
    this.avg += (a - this.avg) / ++this.n;
  }

  get result() {
    return this.avg;
  }
}

/**
 * A `Collector` that accepts numbers and return their sum.
 * @example
 * const c = new SumCollector();
 * c.collect(1);
 * c.collect(2);
 * c.result : 3.0
 */
export class SumCollector implements Collector<number, number> {
  private correction = 0;
  private sum: number;

  /**
     @param initial The initial value of the sum.
   */
  constructor(initial: number = 0) {
    this.sum = initial;
  }

  collect(a: number) {
    const y = a - this.correction;
    const t = this.sum + y;
    this.correction = t - this.sum - y;
    this.sum = t;
  }

  get result() {
    return this.sum;
  }
}

/**
 * A `Collector` that accepts elements of type `A` and return their minimum or `undefined` if no elements were collected.
 * @example
 * const c = new MinCollector<string>();
 * c.collect('foo');
 * c.collect('bar');
 * c.result : 'bar'
 */
export class MinCollector<A> implements Collector<A, A | undefined> {
  private acc: A | undefined;

  /**
   * @param comparator The comparator used to compare elements. Default is natural ordering.
   */
  constructor(private readonly comparator: Comparator<A> = Comparators.natural) {}

  collect(a: A) {
    if (this.acc === undefined || this.comparator(a, this.acc) < 0) this.acc = a;
  }

  get result() {
    return this.acc;
  }
}

/**
 * A `Collector` that accepts elements of type `A` and return their maximum or `undefined` if no elements were collected.
 * @example
 * const c = new MaxCollector<string>();
 * c.collect('foo');
 * c.collect('bar');
 * c.result : 'foo'
 */
export class MaxCollector<A> implements Collector<A, A | undefined> {
  private acc: A | undefined;

  /**
   * @param comparator The comparator used to compare elements. Default is natural ordering.
   */
  constructor(private readonly comparator: Comparator<A> = Comparators.natural) {}

  collect(a: A) {
    if (this.acc === undefined || this.comparator(a, this.acc) > 0) this.acc = a;
  }

  get result() {
    return this.acc;
  }
}

/**
 * A `Collector` that accepts elements of type `A` and return their minimum and maximum elements or `undefined` if no elements were collected.
 * @example
 * const c = new MinMaxCollector<string>();
 * c.collect('foo');
 * c.collect('bar');
 * c.collect('baz')
 * c.result : { min: 'bar', max: 'foo' }
 */
export class MinMaxCollector<A> implements Collector<A, MinMax<A> | undefined> {
  private acc: MinMax<A> | undefined;

  /**
   * @param comparator The comparator used to compare elements. Default is natural ordering.
   */
  constructor(private readonly comparator: Comparator<A> = Comparators.natural) {}

  collect(a: A) {
    if (this.acc === undefined) this.acc = { min: a, max: a };
    else if (this.comparator(this.acc.max, a) < 0) this.acc.max = a;
    else if (this.comparator(this.acc.min, a) > 0) this.acc.min = a;
  }

  get result() {
    return this.acc;
  }
}

/**
 * A `Collector` that accepts elements of type `A` and return the number of elements collected.
 * @example
 * const c = new CountCollector();
 * c.collect('foo');
 * c.collect('bar');
 * c.collect('baz')
 * c.result : 3
 */
export class CountCollector<A = unknown> implements Collector<A, number> {
  private count = 0;

  collect(_a: A) {
    ++this.count;
  }

  get result() {
    return this.count;
  }
}

/**
 * A `Collector` that accepts elements of type `A` and return the last element collected or `undefined` if no elements were collected.
 * @example
 * const c = new LastCollector();
 * c.collect('foo');
 * c.collect('bar');
 * c.collect('baz')
 * c.result : 'baz'
 */
export class LastCollector<A = unknown> implements Collector<A, A | undefined> {
  private acc: A | undefined = undefined;

  collect(a: A) {
    this.acc = a;
  }

  get result() {
    return this.acc;
  }
}

export class FoldCollector<A, B> implements Collector<A, B> {
  constructor(
    private readonly reducer: Reducer<A, B>,
    private acc: B
  ) {}

  collect(a: A) {
    this.acc = this.reducer(this.acc, a);
  }

  get result() {
    return this.acc;
  }
}

export class ReduceCollector<A> implements Collector<A, A | undefined> {
  private first = true;
  constructor(
    private readonly reducer: Reducer<A, A>,
    private acc?: A
  ) {}

  collect(a: A) {
    if (this.first) {
      this.first = false;
      if (this.acc == null) {
        this.acc = a;
        return;
      }
    }
    this.acc = this.reducer(this.acc!, a);
  }

  get result() {
    return this.acc;
  }
}
