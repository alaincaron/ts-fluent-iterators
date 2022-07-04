import { Comparator, Mapper, Predicate, Reducer } from "../types";
import { alwaysTrue, defaultComparator } from "../functions";
import { sortAndDeduplicateDiagnostics } from "typescript";

export function* map<A, B>(iter: Iterable<A>, mapper: Mapper<A, B>): Iterable<B> {
  for (const a of iter) {
    yield mapper(a);
  }
}

export function first<A>(iter: Iterable<A>): A | undefined {
  for (const a of iter) {
    return a;
  }
}

export function* take<A>(iter: Iterable<A>, n: number): Iterable<A> {
  let i = 0;
  for (const a of iter) {
    if (++i > n) break;
    yield a;
  }
}

export function* tap<A>(iter: Iterable<A>, mapper: Mapper<A, any>): Iterable<A> {
  for (const a of iter) {
    mapper(a);
    yield a;
  }
}

export function* skip<A>(iter: Iterable<A>, n: number): Iterable<A> {
  let i = 0;
  const iterator = iter[Symbol.iterator]();
  for (; ;) {
    if (++i > n) break;
    const item = iterator.next();
    if (item.done) break;
  }

  for (; ;) {
    const item = iterator.next();
    if (item.done) break;
    yield item.value;
  }
}

export function* filter<A>(iter: Iterable<A>, predicate: Predicate<A>): Iterable<A> {
  for (const a of iter) {
    if (predicate(a)) yield a;
  }
}

export function* zip<A, B>(iter1: Iterable<A>, iter2: Iterable<B>): Iterable<[A, B]> {
  const iterator1 = iter1[Symbol.iterator]();
  const iterator2 = iter2[Symbol.iterator]();
  for (; ;) {
    const item1 = iterator1.next();
    const item2 = iterator2.next();
    if (item1.done || item2.done) break;
    yield [item1.value, item2.value];
  }
}

export function* enumerate<A>(iter: Iterable<A>): Iterable<[A, number]> {
  let i = 0;
  for (const a of iter) {
    yield [a, i++];
  }
}

export function find<A>(iter: Iterable<A>, predicate: Predicate<A>): A | undefined {
  for (const a of iter) {
    if (predicate(a)) return a;
  }
}

export function contains<A>(iter: Iterable<A>, predicate: Predicate<A>): boolean {
  return find(iter, predicate) !== undefined;
}

export function includes<A>(iter: Iterable<A>, target: A): boolean {
  return find(iter, a => a === target) !== undefined;
}

export function fold<A, B>(iter: Iterable<A>, reducer: Reducer<A, B>, initialValue: B): B {
  let acc = initialValue;
  for (const a of iter) {
    acc = reducer(acc, a);
  }
  return acc;
}

export function reduce<A>(iter: Iterable<A>, reducer: Reducer<A, A>, initialValue?: A): A | undefined {
  const iterator = iter[Symbol.iterator]();
  let acc = initialValue;
  if (acc == null) {
    const current = iterator.next();
    if (current.done) {
      return undefined;
    }
    acc = current.value;
  }

  for (; ;) {
    const item = iterator.next();
    if (item.done) break;
    acc = reducer(acc, item.value);
  }
  return acc;
}

export function forEach<A>(iter: Iterable<A>, mapper: Mapper<A, any>): void {
  for (const a of iter) {
    mapper(a);
  }
}

export function* append<A>(iter: Iterable<A>, items: Iterable<A>): Iterable<A> {
  yield* iter;
  yield* items;
}

export function* prepend<A>(iter: Iterable<A>, items: Iterable<A>): Iterable<A> {
  yield* items;
  yield* iter;
}

export function* concat<A>(...iters: Iterable<A>[]): Iterable<A> {
  for (const iter of iters) {
    yield* iter;
  }
}

export function* takeWhile<A>(iter: Iterable<A>, predicate: Predicate<A>): Iterable<A> {
  for (const a of iter) {
    if (!predicate(a)) break;
    yield a;
  }
}

export function* skipWhile<A>(iter: Iterable<A>, predicate: Predicate<A>): Iterable<A> {
  let skip = true;
  for (const a of iter) {
    if (skip) {
      skip = predicate(a);
    }
    if (skip) continue;
    yield a;
  }
}

export function* distinct<A>(iter: Iterable<A>): Iterable<A> {
  const seen = new Set<A>();
  for (const a of iter) {
    if (seen.has(a)) continue;
    seen.add(a);
    yield a;
  }
}

export function all<A>(iter: Iterable<A>, predicate: Predicate<A>): boolean {
  for (const a of iter) {
    if (!predicate(a)) return false;
  }
  return true;
}

export function some<A>(iter: Iterable<A>, predicate: Predicate<A>): boolean {
  for (const a of iter) {
    if (predicate(a)) return true;
  }
  return false;
}

export function collect<A>(iter: Iterable<A>): A[] {
  const result: A[] = [];
  for (const a of iter) {
    result.push(a);
  }
  return result;
}

export function sum(iter: Iterable<number>): number {
  return fold(iter, sumReducer, { sum: 0, correction: 0 }).sum;
}

export function avg(iter: Iterable<number>): number {
  return fold(iter, avgReducer, { avg: 0, i: 0 }).avg;
}

export function count<A>(iter: Iterable<A>, predicate: Predicate<A> = alwaysTrue): number {
  let n = 0;
  for (const a of iter) {
    if (predicate(a)) ++n;
  }
  return n;
}

export function min<A>(iter: Iterable<A>, comparator: Comparator<A> = defaultComparator): A | undefined {
  const reducer = (acc: A, a: A) => comparator(acc, a) <= 0 ? acc : a;
  return reduce(iter, reducer);
}

export function max<A>(iter: Iterable<A>, comparator: Comparator<A> = defaultComparator): A | undefined {
  const reducer = (acc: A, a: A) => comparator(acc, a) >= 0 ? acc : a;
  return reduce(iter, reducer);
}

export function last<A>(iter: Iterable<A>, predicate: Predicate<A> = alwaysTrue): A | undefined {
  let result: A | undefined;
  for (const a of iter) {
    if (predicate(a)) result = a;
  }
  return result;
}

export function join<A>(iter: Iterable<A>, separator: string = ','): string {
  return fold(iter, (state, a) => {
    state.acc = state.first ? `${a}` : `${state.acc}${separator}${a}`;
    state.first = false;
    return state;
  }, { first: true, acc: '' }).acc;
}

export function collectSorted<A>(iter: Iterable<A>, comparator: Comparator<A> = defaultComparator): A[] {
  return collect(iter).sort(comparator);
}

export function* sort<A>(iter: Iterable<A>, comparator?: Comparator<A>): Iterable<A> {
  yield* collectSorted(iter, comparator);
}

export function collectToMap<A, K>(iter: Iterable<A>, mapper: Mapper<A, K>): Map<K, A[]> {
  const result = new Map<K, A[]>();
  for (const a of iter) {
    const k = mapper(a);
    let arr = result.get(k);
    if (!arr) {
      arr = [];
      result.set(k, arr);
    }
    arr.push(a);
  }
  return result;
}

export function* partition<A, K>(iter: Iterable<A>, mapper: Mapper<A, K>): Iterable<[K, A[]]> {
  yield* collectToMap(iter, mapper).entries();
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
