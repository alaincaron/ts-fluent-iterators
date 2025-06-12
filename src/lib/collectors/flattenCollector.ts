import { emptyIterator, FluentIterator } from '../sync';
import { Collector } from './collector';

/**
 * A `Collector` that accepts `Iterable<A>` or `Iterator<A>` and returns a `FluentIterator<A>` that consists of the concatenation of all the collected iterable objects.
 *
 * @typeParam A the type of elements being iterated on.
 * @example
 * const c = new FlattenCollector<number>();
 * c.collect([1,2]);
 * c.collect([3,4]);
 * c.result.collect() : [1,2,3,4]
 */
export class FlattenCollector<A> implements Collector<Iterable<A> | Iterator<A>, FluentIterator<A>> {
  private iter: FluentIterator<A> = emptyIterator();

  get result(): FluentIterator<A> {
    return this.iter;
  }

  collect(a: Iterable<A> | Iterator<A>) {
    this.iter = this.iter.concat(a);
  }
}

export function flattenCollector<A>() {
  return new FlattenCollector<A>();
}
