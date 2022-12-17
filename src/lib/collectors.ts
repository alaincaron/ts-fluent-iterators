import { Mapper, EventualMapper } from "./types";

export interface Collector<A, B> {
  collect(a: A): void;
  get result(): B
}


export interface EventualCollector<A, B> {
  collect(a: A): Promise<void>;
  get result(): B
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
