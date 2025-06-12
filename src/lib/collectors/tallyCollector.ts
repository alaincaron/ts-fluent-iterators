import { Collector } from './collector';

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

export function tallyCollector<K>() {
  return new TallyCollector<K>();
}
