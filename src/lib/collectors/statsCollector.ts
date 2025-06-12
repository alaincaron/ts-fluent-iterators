import { Collector } from './collector';

export interface Statistics {
  count: number;
  mean: number;
  minValue: number;
  maxValue: number;
  variance: number;
}

export class StatsCollector implements Collector<number, Statistics> {
  private count: number = 0;
  private mean: number = 0;
  private M2: number = 0;
  private minValue: number = Infinity;
  private maxValue: number = -Infinity;

  collect(x: number) {
    this.count += 1;

    // Update min and max
    if (x < this.minValue) this.minValue = x;
    if (x > this.maxValue) this.maxValue = x;

    // Welford's method for mean and variance
    const delta = x - this.mean;
    this.mean += delta / this.count;
    const delta2 = x - this.mean;
    this.M2 += delta * delta2;
  }

  get result(): Statistics {
    return {
      count: this.count,
      mean: this.mean,
      minValue: this.minValue,
      maxValue: this.maxValue,
      variance: this.count > 1 ? this.M2 / (this.count - 1) : NaN,
    };
  }
}

export function statsCollector() {
  return new StatsCollector();
}
