import { CollisionHandler } from '../utils';
import { Collector } from './collector';

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

export function objectCollector<V>(collisionHandler?: CollisionHandler<string, V>) {
  return new ObjectCollector<V>(collisionHandler);
}
