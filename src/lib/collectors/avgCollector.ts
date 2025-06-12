import { Collector } from './collector';

/**
 * A `Collector` that accepts numbers and return their average.
 * @example
 * const c = new AvgCollector();
 * c.collect(1);
 * c.collect(2);
 * c.result : 1.5
 */
export class AvgCollector implements Collector<number, number> {
  private n: number = 0;
  private avg: number = 0;

  collect(a: number) {
    this.avg += (a - this.avg) / ++this.n;
  }

  get result() {
    return this.avg;
  }
}

export function avgCollector() {
  return new AvgCollector();
}
