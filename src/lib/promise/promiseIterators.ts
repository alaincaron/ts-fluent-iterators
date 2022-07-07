import * as SyncIterators from "../sync/iterators";
import { sumReducer, avgReducer } from "../sync/iterators";
import { EventualMapper, EventualPredicate, EventualReducer, Eventually, Comparator } from "../types";
import { defaultComparator, alwaysTrue } from "../functions";

export function* map<A, B>(iter: Iterator<Promise<A>>, mapper: EventualMapper<A, B>): Iterator<Promise<B>> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    yield item.value.then(a => mapper(a));
  }
}

export function* flatmap<A, B>(iter: Iterator<Promise<A>>, mapper: EventualMapper<Promise<A>, B>): Iterator<Promise<B>> {
  for (; ;) {
    const item = iter.next();
    if (item.done) return Promise.resolve(undefined);
    yield item.value.then(a => mapper(Promise.resolve(a)));
  }
}

export async function first<A>(iter: Iterator<Promise<A>>, predicate: EventualPredicate<A> = alwaysTrue): Promise<A | undefined> {
  for (; ;) {
    const item = iter.next();
    if (item.done) return undefined;
    if (await predicate(await item.value)) return item.value;
  }
}

export async function* filter<A>(iter: Iterator<Promise<A>>, predicate: EventualPredicate<A>): AsyncIterator<A> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    const value = await item.value;
    if (await predicate(value)) yield value;
  }
}

export function* tap<A>(iter: Iterator<Promise<A>>, mapper: EventualMapper<A, any>): Iterator<Promise<A>> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    yield item.value.then(a => mapper(a)).then((_: any) => item.value);
  }
}

export function* zip<A, B>(iter1: Iterator<Promise<A>>, iter2: Iterator<Promise<B>>): Iterator<Promise<[A, B]>> {
  for (; ;) {
    const item1 = iter1.next();
    const item2 = iter2.next();
    if (item1.done || item2.done) break;
    yield Promise.all([item1.value, item2.value]);
  }
}

export function* enumerate<A>(iter: Iterator<Promise<A>>, start = 0): Iterator<Promise<[A, number]>> {
  let i = start;
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    yield Promise.all([item.value, i++]);
  }
}

export async function contains<A>(iter: Iterator<Promise<A>>, predicate: EventualPredicate<A>): Promise<boolean> {
  return await first(iter, predicate) !== undefined;
}

export async function includes<A>(iter: Iterator<Promise<A>>, target: Eventually<A>): Promise<boolean> {
  return await first(iter, async (a) => a === await target) !== undefined;
}

export async function fold<A, B>(iter: Iterator<Promise<A>>, reducer: EventualReducer<A, B>, initialValue: Eventually<B>): Promise<B> {
  let acc = await initialValue;
  for (; ;) {
    const item = iter.next();
    if (item.done) return acc;
    acc = await reducer(acc, await item.value);
  }
}

export async function reduce<A>(iter: Iterator<Promise<A>>, reducer: EventualReducer<A, A>, initialValue?: Eventually<A>): Promise<A | undefined> {
  let acc = initialValue;
  if (acc == null) {
    acc = await first(iter);
    if (acc == null) return undefined;
  }

  for (; ;) {
    const item = iter.next();
    if (item.done) return acc;
    acc = await reducer(await acc, await item.value);
  }
}

export async function forEach<A>(iter: Iterator<Promise<A>>, mapper: EventualMapper<A, any>): Promise<void> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    await mapper(await item.value);
  }
}

export async function* takeWhile<A>(iter: Iterator<Promise<A>>, predicate: EventualPredicate<A>): AsyncIterator<A> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    const value = await item.value;
    if (!await predicate(value)) break;
    yield value;
  }
}

export async function* skipWhile<A>(iter: Iterator<Promise<A>>, predicate: EventualPredicate<A>): AsyncIterator<A> {
  let skip = true;
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    const value = await item.value;
    if (skip) {
      skip = await predicate(value);
      if (skip) continue;
    }
    yield value;
  }
}

export async function* distinct<A>(iter: Iterator<Promise<A>>): AsyncIterator<A> {
  const seen = new Set<A>();
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    const value = await item.value;
    if (seen.has(value)) continue;
    seen.add(value);
    yield value;
  }
}

export async function all<A>(iter: Iterator<Promise<A>>, predicate: EventualPredicate<A>): Promise<boolean> {
  for (; ;) {
    const item = iter.next();
    if (item.done) return true;
    if (!await predicate(await item.value)) return false;
  }
}

export async function some<A>(iter: Iterator<Promise<A>>, predicate: EventualPredicate<A>): Promise<boolean> {
  for (; ;) {
    const item = iter.next();
    if (item.done) return false;
    if (await predicate(await item.value)) return true;
  }
}

export function collect<A>(iter: Iterator<Promise<A>>): Promise<A[]> {
  return Promise.all(SyncIterators.collect(iter));
}

export function allSettled<A>(iter: Iterator<Promise<A>>): Promise<PromiseSettledResult<A>[]> {
  return Promise.allSettled(SyncIterators.collect(iter));
}

export function race<A>(iter: Iterator<Promise<A>>): Promise<A | undefined> {
  const promises = SyncIterators.collect(iter);
  if (!promises.length) return Promise.resolve(undefined);
  return Promise.race(promises);
}

export function any<A>(iter: Iterator<Promise<A>>): Promise<A | undefined> {
  const promises = SyncIterators.collect(iter);
  if (!promises.length) return Promise.resolve(undefined);
  return Promise.any(promises);
}

export function sum(iter: Iterator<Promise<number>>): Promise<number> {
  return fold(iter, sumReducer, { sum: 0, correction: 0 }).then(s => s.sum);
}

export function avg(iter: Iterator<Promise<number>>): Promise<number> {
  return fold(iter, avgReducer, { avg: 0, i: 0 }).then(s => s.avg);
}

export async function count<A>(iter: Iterator<Promise<A>>, predicate: EventualPredicate<A> = alwaysTrue): Promise<number> {
  let n = 0;
  for (; ;) {
    const item = iter.next();
    if (item.done) return n;
    if (await predicate(await item.value)) ++n;
  }
}

export function min<A>(iter: Iterator<Promise<A>>, comparator: Comparator<A> = defaultComparator): Promise<A | undefined> {
  const reducer = (acc: A, a: A) => comparator(acc, a) <= 0 ? acc : a;
  return reduce(iter, reducer);
}

export function max<A>(iter: Iterator<Promise<A>>, comparator: Comparator<A> = defaultComparator): Promise<A | undefined> {
  const reducer = (acc: A, a: A) => comparator(acc, a) >= 0 ? acc : a;
  return reduce(iter, reducer);
}

export async function last<A>(iter: Iterator<Promise<A>>, predicate: EventualPredicate<A> = alwaysTrue): Promise<A | undefined> {
  let result: A | undefined;
  for (; ;) {
    const item = iter.next();
    if (item.done) return result;
    const value = await item.value;
    if (await predicate(value)) result = value;
  }
}

export function join<A>(iter: Iterator<Promise<A>>, separator: string = ','): Promise<string> {
  return fold(iter, (state, a) => {
    state.acc = state.first ? `${a}` : `${state.acc}${separator}${a}`;
    state.first = false;
    return state;
  }, { first: true, acc: '' }).then(state => state.acc);
}

export async function* sort<A>(iter: Iterator<Promise<A>>, comparator?: Comparator<A>): AsyncIterator<A> {
  yield* (await collect(iter)).sort(comparator);
}

export async function collectToMap<A, K>(iter: Iterator<Promise<A>>, mapper: EventualMapper<A, K>): Promise<Map<K, A[]>> {
  const result = new Map<K, A[]>();
  for (; ;) {
    const item = iter.next();
    if (item.done) return result;
    const value = await item.value;
    const k = await mapper(value);
    let arr = result.get(k);
    if (!arr) {
      arr = [];
      result.set(k, arr);
    }
    arr.push(value);
  }
}

export async function* partition<A, K>(iter: Iterator<Promise<A>>, mapper: EventualMapper<A, K>): AsyncIterator<[K, A[]]> {
  yield* (await collectToMap(iter, mapper)).entries();
}

export function toPromise<A>(iter: Iterator<A> | Iterable<A>): Iterator<Promise<A>> {
  return SyncIterators.map(SyncIterators.toIterator(iter), a => Promise.resolve(a));
}
