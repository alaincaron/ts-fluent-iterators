import { Collector } from './collector';

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

export function groupByCollector<K, V>() {
  return new GroupByCollector<K, V>();
}
