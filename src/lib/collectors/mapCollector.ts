import { CollisionHandler } from '../utils';
import { Collector } from './collector';

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

export function mapCollector<K, V>(collisionHandler?: CollisionHandler<K, V>) {
  return new MapCollector(collisionHandler);
}
