import { sumReducer, avgReducer, toIterator } from "../sync/iterators";
import { EventualMapper, EventualPredicate, Eventually, Comparator, EventualReducer, EventualIterator, EventualIterable } from "../types";
import { alwaysTrue, defaultComparator } from "../functions";

export function toAsyncIterator<A>(iter: EventualIterable<A> | AsyncIterator<A>): AsyncIterator<A> {
  const x: any = iter;
  if (typeof (x?.next) === "function") {
    return x as AsyncIterator<A>;
  }
  if (typeof x?.[Symbol.asyncIterator] === "function") {
    return (x as AsyncIterable<A>)[Symbol.asyncIterator]();
  }
  if (typeof x?.[Symbol.iterator] === "function") {
    return toAsync((x as Iterable<A>)[Symbol.iterator]());
  }
  throw new Error(`Invalid non-iterable object: ${iter}`);
}

export function toEventualIterator<A>(iter: EventualIterator<A> | EventualIterable<A>): EventualIterator<A> {
  const x: any = iter;
  if (typeof x?.next === "function") {
    return x as EventualIterator<A>;
  }
  if (typeof x?.[Symbol.iterator] === "function") {
    return (x as Iterable<A>)[Symbol.iterator]();
  }
  if (typeof x?.[Symbol.asyncIterator] === "function") {
    return (x as AsyncIterable<A>)[Symbol.asyncIterator]();
  }
  throw new Error(`Invalid non-iterable object: ${iter}`);
}

export async function* map<A, B>(iter: AsyncIterator<A>, mapper: EventualMapper<A, B>): AsyncIterator<B> {
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    yield await mapper(item.value);
  }
}

export async function first<A>(iter: AsyncIterator<A>, predicate: EventualPredicate<A> = alwaysTrue): Promise<A | undefined> {
  for (; ;) {
    const item = await iter.next();
    if (item.done) return undefined;
    if (await predicate(item.value)) return item.value;
  }
}

export async function* take<A>(iter: AsyncIterator<A>, n: number): AsyncIterator<A> {
  for (let i = 0; i < n; ++i) {
    const item = await iter.next();
    if (item.done) break;
    yield item.value;
  }
}

export async function* tap<A>(iter: AsyncIterator<A>, mapper: EventualMapper<A, any>): AsyncIterator<A> {
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    await mapper(item.value);
    yield item.value;
  }
}

export async function* skip<A>(iter: AsyncIterator<A>, n: number): AsyncIterator<A> {
  for (let i = 0; i < n; ++i) {
    const item = await iter.next();
    if (item.done) break;
  }

  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    yield item.value;
  }
}

export async function* filter<A>(iter: AsyncIterator<A>, predicate: EventualPredicate<A>): AsyncIterator<A> {
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    if (await predicate(item.value)) yield item.value;
  }
}

export async function* zip<A, B>(iter1: AsyncIterator<A>, iter2: AsyncIterator<B>): AsyncIterator<[A, B]> {
  for (; ;) {
    const item1 = await iter1.next();
    const item2 = await iter2.next();
    if (item1.done || item2.done) break;
    yield [item1.value, item2.value];
  }
}

export async function* enumerate<A>(iter: AsyncIterator<A>, start = 0): AsyncIterator<[A, number]> {
  let i = start;
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    yield [item.value, i++];
  }
}

export async function contains<A>(iter: AsyncIterator<A>, predicate: EventualPredicate<A>): Promise<boolean> {
  return await first(iter, predicate) !== undefined;
}

export async function includes<A>(iter: AsyncIterator<A>, target: Eventually<A>): Promise<boolean> {
  return await first(iter, async (a) => a === await target) !== undefined;
}

export async function fold<A, B>(iter: AsyncIterator<A>, reducer: EventualReducer<A, B>, initialValue: B): Promise<B> {
  let acc = initialValue;
  for (; ;) {
    const item = await iter.next();
    if (item.done) return acc;
    acc = await reducer(acc, item.value);
  }
}

export async function reduce<A>(iter: AsyncIterator<A>, reducer: EventualReducer<A, A>, initialValue?: A): Promise<A | undefined> {
  let acc = initialValue;
  if (acc == null) {
    acc = await first(iter);
    if (acc == null) return undefined;
  }

  for (; ;) {
    const item = await iter.next();
    if (item.done) return acc;
    acc = await reducer(acc, item.value);
  }
}

export async function forEach<A>(iter: AsyncIterator<A>, mapper: EventualMapper<A, any>): Promise<void> {
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    await mapper(item.value);
  }
}

export async function* append<A>(iter: AsyncIterator<A>, other: EventualIterator<A>): AsyncIterator<A> {
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    yield item.value;
  }
  for (; ;) {
    const item = await other.next();
    if (item.done) break;
    yield item.value;
  }
}

export async function* prepend<A>(iter: AsyncIterator<A>, other: EventualIterator<A>): AsyncIterator<A> {
  for (; ;) {
    const item = await other.next();
    if (item.done) break;
    yield item.value;
  }
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    yield item.value;
  }
}

export async function* concat<A>(...iters: EventualIterator<A>[]): AsyncIterator<A> {
  for (const iter of iters) {
    for (; ;) {
      const item = await iter.next();
      if (item.done) break;
      yield item.value;
    }
  }
}

export async function* takeWhile<A>(iter: AsyncIterator<A>, predicate: EventualPredicate<A>): AsyncIterator<A> {
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    if (!await predicate(item.value)) break;
    yield item.value;
  }
}

export async function* skipWhile<A>(iter: AsyncIterator<A>, predicate: EventualPredicate<A>): AsyncIterator<A> {
  let skip = true;
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    if (skip) {
      skip = await predicate(item.value);
      if (skip) continue;
    }
    yield item.value;
  }
}

export async function* distinct<A>(iter: AsyncIterator<A>): AsyncIterator<A> {
  const seen = new Set<A>();
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    if (seen.has(item.value)) continue;
    seen.add(item.value);
    yield item.value;
  }
}

export async function all<A>(iter: AsyncIterator<A>, predicate: EventualPredicate<A>): Promise<boolean> {
  for (; ;) {
    const item = await iter.next();
    if (item.done) return true;
    if (!await predicate(item.value)) return false;
  }
}

export async function some<A>(iter: AsyncIterator<A>, predicate: EventualPredicate<A>): Promise<boolean> {
  for (; ;) {
    const item = await iter.next();
    if (item.done) return false;
    if (await predicate(item.value)) return true;
  }
}

export async function collect<A>(iter: AsyncIterator<A>): Promise<A[]> {
  const result: A[] = [];
  for (; ;) {
    const item = await iter.next();
    if (item.done) return result;
    result.push(item.value);
  }
}

export function sum(iter: AsyncIterator<number>): Promise<number> {
  return fold(iter, sumReducer, { sum: 0, correction: 0 }).then(s => s.sum);
}

export function avg(iter: AsyncIterator<number>): Promise<number> {
  return fold(iter, avgReducer, { avg: 0, i: 0 }).then(s => s.avg);
}

export async function count<A>(iter: AsyncIterator<A>, predicate: EventualPredicate<A> = alwaysTrue): Promise<number> {
  let n = 0;
  for (; ;) {
    const item = await iter.next();
    if (item.done) return n;
    if (await predicate(item.value)) ++n;
  }
}

export function min<A>(iter: AsyncIterator<A>, comparator: Comparator<A> = defaultComparator): Promise<A | undefined> {
  const reducer = (acc: A, a: A) => comparator(acc, a) <= 0 ? acc : a;
  return reduce(iter, reducer);
}

export function max<A>(iter: AsyncIterator<A>, comparator: Comparator<A> = defaultComparator): Promise<A | undefined> {
  const reducer = (acc: A, a: A) => comparator(acc, a) >= 0 ? acc : a;
  return reduce(iter, reducer);
}

export async function last<A>(iter: AsyncIterator<A>, predicate: EventualPredicate<A> = alwaysTrue): Promise<A | undefined> {
  let result: A | undefined;
  for (; ;) {
    const item = await iter.next();
    if (item.done) return result;
    if (await predicate(item.value)) result = item.value;
  }
}

export function join<A>(iter: AsyncIterator<A>, separator: string = ','): Promise<string> {
  return fold(iter, (state, a) => {
    state.acc = state.first ? `${a}` : `${state.acc}${separator}${a}`;
    state.first = false;
    return state;
  }, { first: true, acc: '' }).then(state => state.acc);
}

export async function* sort<A>(iter: AsyncIterator<A>, comparator?: Comparator<A>): AsyncIterator<A> {
  yield* (await collect(iter)).sort(comparator);
}

export async function collectToMap<A, K>(iter: AsyncIterator<A>, mapper: EventualMapper<A, K>): Promise<Map<K, A[]>> {
  const result = new Map<K, A[]>();
  for (; ;) {
    const item = await iter.next();
    if (item.done) return result;
    const k = await mapper(item.value);
    let arr = result.get(k);
    if (!arr) {
      arr = [];
      result.set(k, arr);
    }
    arr.push(item.value);
  }
}

export async function* partition<A, K>(iter: AsyncIterator<A>, mapper: EventualMapper<A, K>): AsyncIterator<[K, A[]]> {
  yield* (await collectToMap(iter, mapper)).entries();
}

export async function* toAsync<A>(iter: Iterator<A> | Iterable<A>): AsyncIterator<A> {
  const iterator = toIterator(iter);
  for (; ;) {
    const item = iterator.next();
    if (item.done) break;
    yield item.value;
  }
}
