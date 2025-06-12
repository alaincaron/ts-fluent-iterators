import { Collector } from './collector';

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

export function countCollector<A = unknown>() {
  return new CountCollector<A>();
}
