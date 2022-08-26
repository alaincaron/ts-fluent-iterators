import { Comparator, Mapper, Predicate, Reducer, MinMax } from "../types";
import { alwaysTrue, defaultComparator, sumReducer, avgReducer, minMaxReducer, identity } from "../functions";

export function toIterator<A>(iter: Iterable<A> | Iterator<A>): Iterator<A> {
  const x: any = iter;
  if (typeof (x?.next) === "function") {
    return x as Iterator<A>;
  }
  if (typeof x?.[Symbol.iterator] === "function") {
    return (x as Iterable<A>)[Symbol.iterator]();
  }
  throw new Error(`Invalid non-iterable object: ${iter}`);
}

export function* map<A, B>(iter: Iterator<A>, mapper: Mapper<A, B>): Iterator<B> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    yield mapper(item.value);
  }
}

export function first<A>(iter: Iterator<A>, predicate: Predicate<A> = alwaysTrue): A | undefined {
  for (; ;) {
    const item = iter.next();
    if (item.done) return undefined;
    if (predicate(item.value)) return item.value;
  }
}

export function* take<A>(iter: Iterator<A>, n: number): Iterator<A> {
  for (let i = 0; i < n; ++i) {
    const item = iter.next();
    if (item.done) break;
    yield item.value;
  }
}

export function* tap<A>(iter: Iterator<A>, mapper: Mapper<A, any>): Iterator<A> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    mapper(item.value);
    yield item.value;
  }
}

export function* skip<A>(iter: Iterator<A>, n: number): Iterator<A> {
  for (let i = 0; i < n; ++i) {
    const item = iter.next();
    if (item.done) break;
  }

  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    yield item.value;
  }
}

export function* filter<A>(iter: Iterator<A>, predicate: Predicate<A>): Iterator<A> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    if (predicate(item.value)) yield item.value;
  }
}

export function* filter_map<A, B>(iter: Iterator<A>, mapper: Mapper<A, B>): Iterator<B> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    const value = mapper(item.value);
    if (value != null) yield value;
  }
}

export function* zip<A, B>(iter1: Iterator<A>, iter2: Iterator<B>): Iterator<[A, B]> {
  for (; ;) {
    const item1 = iter1.next();
    const item2 = iter2.next();
    if (item1.done || item2.done) break;
    yield [item1.value, item2.value];
  }
}

export function* enumerate<A>(iter: Iterator<A>, start = 0): Iterator<[A, number]> {
  let i = start;
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    yield [item.value, i++];
  }
}

export function contains<A>(iter: Iterator<A>, predicate: Predicate<A>): boolean {
  return first(iter, predicate) !== undefined;
}

export function includes<A>(iter: Iterator<A>, target: A): boolean {
  return first(iter, a => a === target) !== undefined;
}

export function fold<A, B>(iter: Iterator<A>, reducer: Reducer<A, B>, initialValue: B): B {
  let acc = initialValue;
  for (; ;) {
    const item = iter.next();
    if (item.done) return acc;
    acc = reducer(acc, item.value);
  }
}

export function reduce<A>(iter: Iterator<A>, reducer: Reducer<A, A>, initialValue?: A): A | undefined {
  let acc = initialValue;
  if (acc == null) {
    acc = first(iter);
    if (acc == null) return undefined;
  }

  for (; ;) {
    const item = iter.next();
    if (item.done) return acc;
    acc = reducer(acc, item.value);
  }
}

export function forEach<A>(iter: Iterator<A>, mapper: Mapper<A, any>): void {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    mapper(item.value);
  }
}

export function* append<A>(iter: Iterator<A>, other: Iterator<A>): Iterator<A> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    yield item.value;
  }
  for (; ;) {
    const item = other.next();
    if (item.done) break;
    yield item.value;
  }
}

export function* prepend<A>(iter: Iterator<A>, other: Iterator<A>): Iterator<A> {
  for (; ;) {
    const item = other.next();
    if (item.done) break;
    yield item.value;
  }
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    yield item.value;
  }
}

export function* concat<A>(...iters: Iterator<A>[]): Iterator<A> {
  for (const iter of iters) {
    for (; ;) {
      const item = iter.next();
      if (item.done) break;
      yield item.value;
    }
  }
}

export function* takeWhile<A>(iter: Iterator<A>, predicate: Predicate<A>): Iterator<A> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    if (!predicate(item.value)) break;
    yield item.value;
  }
}

export function* skipWhile<A>(iter: Iterator<A>, predicate: Predicate<A>): Iterator<A> {
  let skip = true;
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    if (skip) {
      skip = predicate(item.value);
      if (skip) continue;
    }
    yield item.value;
  }
}

export function* distinct<A>(iter: Iterator<A>): Iterator<A> {
  const seen = new Set<A>();
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    if (seen.has(item.value)) continue;
    seen.add(item.value);
    yield item.value;
  }
}

export function all<A>(iter: Iterator<A>, predicate: Predicate<A>): boolean {
  for (; ;) {
    const item = iter.next();
    if (item.done) return true;
    if (!predicate(item.value)) return false;
  }
}

export function some<A>(iter: Iterator<A>, predicate: Predicate<A>): boolean {
  for (; ;) {
    const item = iter.next();
    if (item.done) return false;
    if (predicate(item.value)) return true;
  }
}

export function collect<A>(iter: Iterator<A>): A[] {
  const result: A[] = [];
  for (; ;) {
    const item = iter.next();
    if (item.done) return result;
    result.push(item.value);
  }
}

export function sum(iter: Iterator<number>): number {
  return fold(iter, sumReducer, { sum: 0, correction: 0 }).sum;
}

export function avg(iter: Iterator<number>): number {
  return fold(iter, avgReducer, { avg: 0, n: 0 }).avg;
}

export function count<A>(iter: Iterator<A>, predicate: Predicate<A> = alwaysTrue): number {
  let n = 0;
  for (; ;) {
    const item = iter.next();
    if (item.done) return n;
    if (predicate(item.value)) ++n;
  }
}

export function min<A>(iter: Iterator<A>, comparator: Comparator<A> = defaultComparator): A | undefined {
  const reducer = (acc: A, a: A) => comparator(acc, a) <= 0 ? acc : a;
  return reduce(iter, reducer);
}

export function max<A>(iter: Iterator<A>, comparator: Comparator<A> = defaultComparator): A | undefined {
  const reducer = (acc: A, a: A) => comparator(acc, a) >= 0 ? acc : a;
  return reduce(iter, reducer);
}

export function minmax<A>(iter: Iterator<A>, comparator: Comparator<A> = defaultComparator): MinMax<A> {
  const item = iter.next();
  if (item.done) return {};
  return fold(iter, minMaxReducer(comparator), { min: item.value, max: item.value });
}

export function last<A>(iter: Iterator<A>, predicate: Predicate<A> = alwaysTrue): A | undefined {
  let result: A | undefined;
  for (; ;) {
    const item = iter.next();
    if (item.done) return result;
    if (predicate(item.value)) result = item.value;
  }
}

export function join<A>(iter: Iterator<A>, separator: string = ','): string {
  return fold(iter, (state, a) => {
    state.acc = state.first ? `${a}` : `${state.acc}${separator}${a}`;
    state.first = false;
    return state;
  }, { first: true, acc: '' }).acc;
}

export function* sort<A>(iter: Iterator<A>, comparator?: Comparator<A>): Iterator<A> {
  yield* collect(iter).sort(comparator);
}

export function collectToMap<A, K>(iter: Iterator<A>, mapper: Mapper<A, K>): Map<K, A[]> {
  const result = new Map<K, A[]>();
  for (; ;) {
    const item = iter.next();
    if (item.done) return result;
    const k = mapper(item.value);
    let arr = result.get(k);
    if (!arr) {
      arr = [];
      result.set(k, arr);
    }
    arr.push(item.value);
  }
}

export function* partition<A, K>(iter: Iterator<A>, mapper: Mapper<A, K>): Iterator<[K, A[]]> {
  yield* collectToMap(iter, mapper).entries();
}


export function tally<A, K>(iter: Iterator<A>, mapper?: Mapper<A, K>): Map<K, number> {
  mapper ??= identity as Mapper<A, K>;
  const map = new Map<K, number>();
  for (; ;) {
    const item = iter.next();
    if (item.done) return map;
    const k = mapper(item.value);
    const v = map.get(k);
    map.set(k, (v ?? 0) + 1);
  }
}
