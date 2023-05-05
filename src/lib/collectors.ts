import { handleCollisionOverwrite } from "./functions";
import { emptyIterator, FluentIterator } from "./sync/fluentIterator";
import { Mapper, EventualMapper, CollisionHandler } from "./types";

export interface Collector<A, B> {
  collect(a: A): void;
  get result(): B;
}

export interface EventualCollector<A, B> {
  collect(a: A): Promise<void>;
  get result(): B;
}

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

export class GroupByCollector<A, K> implements Collector<A, Map<K, A[]>> {
  private readonly map: Map<K, A[]> = new Map();
  private mapper: Mapper<A, K>;

  constructor(mapper: Mapper<A, K>) {
    this.mapper = mapper;
  }

  get result(): Map<K, A[]> {
    return this.map;
  }

  collect(a: A) {
    const k = this.mapper(a);
    let arr = this.map.get(k);
    if (!arr) {
      arr = [];
      this.map.set(k, arr);
    }
    arr.push(a);
  }
}

export class MapCollector<A, K, V> implements Collector<A, Map<K, V>> {
  private readonly map: Map<K, V> = new Map();
  private readonly collisionHandler: CollisionHandler<K, V>;

  constructor(private readonly mapper: Mapper<A, [K, V]>, collisionHandler?: CollisionHandler<K, V>) {
    this.collisionHandler = collisionHandler ?? handleCollisionOverwrite;
  }

  get result(): Map<K, V> {
    return this.map;
  }

  collect(a: A) {
    const [k, v] = this.mapper(a);
    if (this.collisionHandler === handleCollisionOverwrite || !this.map.has(k)) {
      this.map.set(k, v);
    } else {
      const oldValue = this.map.get(k)!;
      const newValue = this.collisionHandler(k, oldValue, v);
      this.map.set(k, newValue);
    }
  }
}

export class ObjectCollector<A, V> implements Collector<A, Record<string, V>> {
  private readonly hash: Record<string, V> = {};
  private readonly collisionHandler: CollisionHandler<string, V>;

  constructor(private readonly mapper: Mapper<A, [string, V]>, collisionHandler?: CollisionHandler<string, V>) {
    this.collisionHandler = collisionHandler ?? handleCollisionOverwrite;
  }

  get result(): Record<string, V> {
    return this.hash;
  }

  collect(a: A) {
    const [k, v] = this.mapper(a);
    if (this.collisionHandler === handleCollisionOverwrite || !this.hash.hasOwnProperty(k)) {
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

export class EventualGroupByCollector<A, K> implements EventualCollector<A, Map<K, A[]>> {
  private readonly map: Map<K, A[]> = new Map();
  private mapper: EventualMapper<A, K>;

  constructor(mapper: EventualMapper<A, K>) {
    this.mapper = mapper;
  }

  get result(): Map<K, A[]> {
    return this.map;
  }

  async collect(a: A) {
    const k = await this.mapper(a);
    let arr = this.map.get(k);
    if (!arr) {
      arr = [];
      this.map.set(k, arr);
    }
    arr.push(a);
  }
}
