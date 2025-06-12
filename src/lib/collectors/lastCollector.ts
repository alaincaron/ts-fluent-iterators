import { Collector } from './collector';

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

export function lastCollector<A = unknown>() {
  return new LastCollector<A>();
}
