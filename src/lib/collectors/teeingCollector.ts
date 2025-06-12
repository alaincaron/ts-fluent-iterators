import { BinaryMapper } from '../utils';
import { Collector } from './collector';

export class TeeingCollector<T1, R1, T2, R2, T extends T1 & T2, R> implements Collector<T, R> {
  constructor(
    private readonly c1: Collector<T1, R1>,
    private readonly c2: Collector<T2, R2>,
    private readonly mapper: BinaryMapper<R1, R2, R>
  ) {}

  collect(t: T) {
    this.c1.collect(t);
    this.c2.collect(t);
  }

  get result() {
    return this.mapper(this.c1.result, this.c2.result);
  }
}

export function teeingCollector<T1, R1, T2, R2, T extends T1 & T2, R>(
  c1: Collector<T1, R1>,
  c2: Collector<T2, R2>,
  mapper: BinaryMapper<R1, R2, R>
): TeeingCollector<T1, R1, T2, R2, T, R> {
  return new TeeingCollector(c1, c2, mapper);
}
