import { Collector } from './collector';

/**
 * A Collector that collects elements of type `A` into a `Set` of type `Set<A>`.
 * @typeParam A the type of elements being collected.
 */
export class SetCollector<A> implements Collector<A, Set<A>> {
  private readonly acc: Set<A> = new Set();

  collect(a: A): void {
    this.acc.add(a);
  }

  get result(): Set<A> {
    return this.acc;
  }
}

export function setCollector<A>() {
  return new SetCollector<A>();
}
