import { Comparators } from '../..';
import { Comparator } from '../utils';
import { Collector } from './collector';

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

export function minCollector<A>(comparator: Comparator<A> = Comparators.natural) {
  return new MinCollector(comparator);
}
