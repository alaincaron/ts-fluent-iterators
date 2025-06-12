import { Collector } from './collector';

export class ForkingCollector<T, R> implements Collector<T, R[]> {
  private readonly collectors: Collector<T, R>[];

  constructor(...collectors: Collector<T, R>[]) {
    this.collectors = collectors;
  }

  collect(t: T) {
    this.collectors.forEach(c => c.collect(t));
  }

  get result() {
    return this.collectors.map(c => c.result);
  }
}

export function forkingCollector<T, R>(...collectors: Collector<T, R>[]) {
  return new ForkingCollector(...collectors);
}
