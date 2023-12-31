import { alwaysTrue, asyncIdentity, CollisionHandlers, defaultComparator, identity } from './functions';
import { emptyIterator, FluentIterator } from './sync';
import { CollisionHandler, Comparator, EventualMapper, EventualPredicate, Mapper, MinMax, Predicate } from './types';

export interface CollectorResult<B> {
  get result(): B;
}

export interface Collector<A, B> extends CollectorResult<B> {
  collect(a: A): void;
}

export interface AsyncCollector<A, B> extends CollectorResult<B> {
  collect(a: A): Promise<void>;
}

export type EventualCollector<A, B> = Collector<A, B> | AsyncCollector<A, B>;

export class ArrayCollector<A> implements Collector<A, A[]> {
  private readonly acc: A[] = [];

  collect(a: A): void {
    this.acc.push(a);
  }

  get result(): A[] {
    return this.acc;
  }
}

export class SetCollector<A> implements Collector<A, Set<A>> {
  private readonly acc: Set<A> = new Set();

  collect(a: A): void {
    this.acc.add(a);
  }

  get result(): Set<A> {
    return this.acc;
  }
}

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

export class MapCollector<K, V> implements Collector<[K, V], Map<K, V>> {
  private readonly map: Map<K, V> = new Map();

  constructor(private readonly collisionHandler: CollisionHandler<K, V> = CollisionHandlers.overwrite) {}

  get result(): Map<K, V> {
    return this.map;
  }

  collect([k, v]: [K, V]) {
    if (this.collisionHandler === CollisionHandlers.overwrite || !this.map.has(k)) {
      this.map.set(k, v);
    } else {
      const oldValue = this.map.get(k)!;
      const newValue = this.collisionHandler(k, oldValue, v);
      this.map.set(k, newValue);
    }
  }
}

export class ObjectCollector<V> implements Collector<[string, V], Record<string, V>> {
  private readonly hash: Record<string, V> = {};

  constructor(private readonly collisionHandler: CollisionHandler<string, V> = CollisionHandlers.overwrite) {}

  get result(): Record<string, V> {
    return this.hash;
  }

  collect([k, v]: [string, V]) {
    if (this.collisionHandler === CollisionHandlers.overwrite || !this.hash.hasOwnProperty(k)) {
      this.hash[k] = v;
    } else {
      const oldValue = this.hash[k];
      const newValue = this.collisionHandler(k, oldValue, v);
      this.hash[k] = newValue;
    }
  }
}

export class FlattenCollector<A> implements Collector<Iterable<A> | Iterator<A>, FluentIterator<A>> {
  private iter: FluentIterator<A> = emptyIterator();

  get result(): FluentIterator<A> {
    return this.iter;
  }

  collect(a: Iterable<A> | Iterator<A>) {
    this.iter = this.iter.concat(a);
  }
}

export class TallyCollector<A> implements Collector<A, Map<A, number>> {
  private readonly map: Map<A, number> = new Map();

  get result(): Map<A, number> {
    return this.map;
  }

  collect(a: A) {
    const v = this.map.get(a);
    this.map.set(a, (v ?? 0) + 1);
  }
}

export class StringJoiner<A> implements Collector<A, string> {
  private acc: string;
  private first = true;
  private done = false;

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

export class SumCollector implements Collector<number, number> {
  private correction = 0;
  private sum = 0;

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

export class MinCollector<A> implements Collector<A, A | undefined> {
  private acc: A | undefined;

  constructor(private readonly comparator: Comparator<A> = defaultComparator) {}

  collect(a: A) {
    if (this.acc === undefined || this.comparator(a, this.acc) < 0) this.acc = a;
  }

  get result() {
    return this.acc;
  }
}

export class MaxCollector<A> implements Collector<A, A | undefined> {
  private acc: A | undefined;

  constructor(private readonly comparator: Comparator<A> = defaultComparator) {}

  collect(a: A) {
    if (this.acc === undefined || this.comparator(a, this.acc) > 0) this.acc = a;
  }

  get result() {
    return this.acc;
  }
}

export class MinMaxCollector<A> implements Collector<A, MinMax<A> | undefined> {
  private acc: MinMax<A> | undefined;

  constructor(private readonly comparator: Comparator<A> = defaultComparator) {}

  collect(a: A) {
    if (this.acc === undefined) this.acc = { min: a, max: a };
    else if (this.comparator(this.acc.max, a) < 0) this.acc.max = a;
    else if (this.comparator(this.acc.min, a) > 0) this.acc.min = a;
  }

  get result() {
    return this.acc;
  }
}

export class CountCollector<A> implements Collector<A, number> {
  private count = 0;

  collect(_a: A) {
    ++this.count;
  }

  get result() {
    return this.count;
  }
}

export class LastCollector<A> implements Collector<A, A | undefined> {
  private acc: A | undefined = undefined;

  collect(a: A) {
    this.acc = a;
  }

  get result() {
    return this.acc;
  }
}

export class CollectorDecorator<A, B, C> implements Collector<A, C> {
  constructor(
    private readonly collector: Collector<B, C>,
    private readonly mapper: Mapper<A, B> = identity as Mapper<A, B>
  ) {}

  collect(a: A) {
    this.collector.collect(this.mapper(a));
  }

  get result() {
    return this.collector.result;
  }
}

export class AsyncCollectorDecorator<A, B, C> implements AsyncCollector<A, C> {
  constructor(
    private readonly collector: EventualCollector<B, C>,
    private readonly mapper: EventualMapper<A, B> = asyncIdentity as EventualMapper<A, B>
  ) {}

  async collect(a: A) {
    await this.collector.collect(await this.mapper(a));
  }
  get result() {
    return this.collector.result;
  }
}

export class CollectorFilter<A, B> implements Collector<A, B> {
  constructor(
    private readonly collector: Collector<A, B>,
    private readonly predicate: Predicate<A> = alwaysTrue
  ) {}

  collect(a: A) {
    if (this.predicate(a)) this.collector.collect(a);
  }

  get result() {
    return this.collector.result;
  }
}

export class AsyncCollectorFilter<A, B> implements AsyncCollector<A, B> {
  constructor(
    private readonly collector: EventualCollector<A, B>,
    private readonly predicate: EventualPredicate<A> = alwaysTrue
  ) {}

  async collect(a: A) {
    if (await this.predicate(a)) await this.collector.collect(a);
  }

  get result() {
    return this.collector.result;
  }
}
