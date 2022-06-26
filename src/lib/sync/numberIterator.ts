import * as Iterators from './iterators';
import { FluentIterator } from "./fluentIterator";

export function sum(iter: Iterator<number>, initialValue = 0): number {
  return Iterators.fold(iter, sumReducer, { sum: initialValue, correction: 0 }).sum;
}

export function avg(iter: Iterator<number>): number {
  return Iterators.fold(iter, avgReducer, { avg: 0, i: 0 }).avg;
}

export function avgReducer(state: { avg: number, i: number }, value: number): { avg: number, i: number } {
  // Usong Knuth algorithm
  state.avg += (value - state.avg) / ++state.i;
  return state;
}

export function sumReducer(state: { sum: number, correction: number }, value: number): { sum: number, correction: number } {
  // Based on Kahan Summation Algorithm to prevent loss of accuracy
  const y = value - state.correction;
  const t = state.sum + y;
  state.correction = (t - state.sum) - y;
  state.sum = t;
  return state;
}

export class NumberIterator extends FluentIterator<number> {

  constructor(iter: Iterator<number> | Iterable<number>) {
    super(iter);
  }

  filter(predicate: (a: number) => boolean): NumberIterator {
    return new NumberIterator(Iterators.filter(this.iterator(), predicate));
  }

  transform(f: (a: number) => number): NumberIterator {
    return new NumberIterator(Iterators.map(this.iterator(), f));
  }

  take(n: number): NumberIterator {
    return new NumberIterator(Iterators.take(this.iterator(), n));
  }

  skip(n: number): NumberIterator {
    return new NumberIterator(Iterators.skip(this.iterator(), n));
  }

  reduce(reducer: (acc: number, a: number) => number, initialValue?: number): number | undefined {
    return Iterators.reduce(this.iterator(), reducer, initialValue);
  }

  tap(f: (a: number) => any): NumberIterator {
    return new NumberIterator(Iterators.tap(this.iterator(), f));
  }

  sum(): number {
    return Iterators.fold(this.iterator(), sumReducer, { sum: 0, correction: 0 }).sum;
  }

  avg(): number {
    return Iterators.fold(this.iterator(), avgReducer, { avg: 0, i: 0 }).avg;
  }
}
