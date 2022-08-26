import { AvgState, MinMax, SumState, Comparator, Reducer } from "./types";

export const identity = <A>(a: A) => a;
export const asyncIdentity = <A>(a: A) => Promise.resolve(a);
export const alwaysTrue = <A>(_: A) => true;
export const alwaysFalse = <A>(_: A) => false;
export const asyncAlwaysTrue = <A>(_: A) => Promise.resolve(true);
export const asyncAlwaysFalse = <A>(_: A) => Promise.resolve(false);

export function defaultComparator<A>(a1: A, a2: A) {
  if (a1 < a2) return -1;
  if (a1 > a2) return 1;
  return 0;
}

export const lengthComparator = (a: { length: number }, b: { length: number }) => defaultComparator(a.length, b.length);

export function avgReducer(state: AvgState, value: number): AvgState {
  // Usong Knuth algorithm
  state.avg += (value - state.avg) / ++state.n;
  return state;
}

export function sumReducer(state: SumState, value: number): SumState {
  // Based on Kahan Summation Algorithm to prevent loss of accuracy
  const y = value - state.correction;
  const t = state.sum + y;
  state.correction = (t - state.sum) - y;
  state.sum = t;
  return state;
}

export function minMaxReducer<A>(comparator: Comparator<A>): Reducer<A, MinMax<A>> {
  return (state: MinMax<A>, a: A) => {
    if (comparator(state.max!, a) < 0) state.max = a;
    if (comparator(state.min!, a) > 0) state.min = a;
    return state;
  }
}
