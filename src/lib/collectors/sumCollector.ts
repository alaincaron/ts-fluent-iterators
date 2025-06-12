import { Collector } from './collector';

/**
 * A `Collector` that accepts numbers and return their sum.
 * @example
 * const c = new SumCollector();
 * c.collect(1);
 * c.collect(2);
 * c.result : 3.0
 */
export class SumCollector implements Collector<number, number> {
  private correction = 0;
  private sum: number;

  /**
     @param initial The initial value of the sum.
   */
  constructor(initial: number = 0) {
    this.sum = initial;
  }

  collect(a: number) {
    const y = a - this.correction;
    const t = this.sum + y;
    this.correction = t - this.sum - y;
    this.sum = t;
  }

  get result() {
    return this.sum;
  }
}

export function sumCollector(initial: number = 0) {
  return new SumCollector(initial);
}
