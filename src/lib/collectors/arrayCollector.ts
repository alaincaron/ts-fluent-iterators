import { Collector } from './collector';
/**
 * A Collector that collects elements of type `A` into an array of type `A[]`.
 * @typeParam A the type of elements being collected.
 */
export class ArrayCollector<A> implements Collector<A, A[]> {
  private readonly acc: A[] = [];

  collect(a: A): void {
    this.acc.push(a);
  }

  get result(): A[] {
    return this.acc;
  }
}

export function arrayCollector<A>() {
  return new ArrayCollector<A>();
}
