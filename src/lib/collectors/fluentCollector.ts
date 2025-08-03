import { Mapper, Predicate } from '../utils';
import { Collector } from './collector';

export class FluentCollector<A, B> implements Collector<A, B> {
  protected constructor(readonly collector: Collector<A, B>) {}

  collect(a: A) {
    return this.collector.collect(a);
  }

  get result() {
    return this.collector.result;
  }

  map<C>(mapper: Mapper<C, A>): FluentCollector<C, B> {
    return new FluentCollector(mappingCollector(mapper, this.collector));
  }

  filter(predicate: Predicate<A>): FluentCollector<A, B> {
    return new FluentCollector(filteringCollector(predicate, this.collector));
  }

  andThen<C>(mapper: Mapper<B, C>): FluentCollector<A, C> {
    return new FluentCollector(andThenCollector(this.collector, mapper));
  }

  static from<A, B>(collector: Collector<A, B>): FluentCollector<A, B> {
    if (collector instanceof FluentCollector) return collector;
    return new FluentCollector(collector);
  }
}

export function fluentCollector<A, B>(collector: Collector<A, B>) {
  return FluentCollector.from(collector);
}

export class MappingCollector<A, B, T> implements Collector<A, T> {
  constructor(
    private readonly mapper: Mapper<A, B>,
    private readonly collector: Collector<B, T>
  ) {}

  collect(a: A) {
    return this.collector.collect(this.mapper(a));
  }

  get result() {
    return this.collector.result;
  }
}

export function mappingCollector<A, B, T>(mapper: Mapper<A, B>, collector: Collector<B, T>) {
  return new MappingCollector(mapper, collector);
}

export class FilteringCollector<A, B> implements Collector<A, B> {
  constructor(
    private readonly predicate: Predicate<A>,
    private readonly collector: Collector<A, B>
  ) {}

  collect(a: A) {
    if (this.predicate(a)) {
      this.collector.collect(a);
    }
  }

  get result() {
    return this.collector.result;
  }
}

export function filteringCollector<A, B>(predicate: Predicate<A>, collector: Collector<A, B>) {
  return new FilteringCollector(predicate, collector);
}

export class AndThenCollector<A, B, C> implements Collector<A, C> {
  constructor(
    private readonly collector: Collector<A, B>,
    private readonly mapper: Mapper<B, C>
  ) {}

  collect(a: A) {
    return this.collector.collect(a);
  }

  get result() {
    return this.mapper(this.collector.result);
  }
}

export function andThenCollector<A, B, C>(collector: Collector<A, B>, mapper: Mapper<B, C>) {
  return new AndThenCollector(collector, mapper);
}
