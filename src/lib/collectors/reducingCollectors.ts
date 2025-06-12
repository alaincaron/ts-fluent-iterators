import { Reducer } from '../utils';
import { Collector } from './collector';

export class FoldCollector<A, B> implements Collector<A, B> {
  constructor(
    private readonly reducer: Reducer<A, B>,
    private acc: B
  ) {}

  collect(a: A) {
    this.acc = this.reducer(this.acc, a);
  }

  get result() {
    return this.acc;
  }
}

export function foldCollector<A, B>(reducer: Reducer<A, B>, iniitial: B) {
  return new FoldCollector<A, B>(reducer, iniitial);
}

export class ReduceCollector<A> implements Collector<A, A | undefined> {
  private first = true;
  constructor(
    private readonly reducer: Reducer<A, A>,
    private acc?: A
  ) {}

  collect(a: A) {
    if (this.first) {
      this.first = false;
      if (this.acc == null) {
        this.acc = a;
        return;
      }
    }
    this.acc = this.reducer(this.acc!, a);
  }

  get result() {
    return this.acc;
  }
}

export function reduceCollector<A>(reducer: Reducer<A, A>, initial?: A) {
  return new ReduceCollector(reducer, initial);
}
