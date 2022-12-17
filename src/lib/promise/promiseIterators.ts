import * as SyncIterators from "../sync/iterators";
import { EventualMapper, EventualPredicate, EventualReducer, Eventually, Comparator, MinMax } from "../types";
import { defaultComparator, alwaysTrue, sumReducer, avgReducer, minMaxReducer, identity } from "../functions";
import { Collector, ArrayCollector, EventualGroupByCollector, SetCollector } from "../collectors";

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
  if (acc === undefined) {
    const item = iter.next();
    if (item.done) return undefined;
    acc = await item.value;
  }
  return fold(iter, reducer, acc);
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

export async function* distinct<A, B>(iter: Iterator<Promise<A>>, mapper?: EventualMapper<A, B>): AsyncIterator<A> {
  mapper ??= identity as EventualMapper<A, B>;
  const seen = new Set<B>();
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    const value = await item.value;
    const mappedValue = await mapper(value);
    if (seen.has(mappedValue)) continue;
    seen.add(mappedValue);
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

export async function collectTo<A, B>(iter: Iterator<Promise<A>>, collector: Collector<A, Eventually<B>>): Promise<B> {
  for (; ;) {
    const item = iter.next();
    if (item.done) return collector.result;
    collector.collect(await item.value);
  }
}

export function collect<A>(iter: Iterator<Promise<A>>): Promise<A[]> {
  return collectTo(iter, new ArrayCollector());
}

export function collectToSet<A>(iter: Iterator<Promise<A>>): Promise<Set<A>> {
  return collectTo(iter, new SetCollector());
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
  return fold(iter, avgReducer, { avg: 0, n: 0 }).then(s => s.avg);
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

export async function minmax<A>(iter: Iterator<Promise<A>>, comparator: Comparator<A> = defaultComparator): Promise<MinMax<A>> {
  const item = iter.next();
  if (item.done) return {};
  const v = await item.value;
  return fold(iter, minMaxReducer(comparator), { min: v, max: v });
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

export async function groupBy<A, K>(iter: Iterator<Promise<A>>, mapper: EventualMapper<A, K>): Promise<Map<K, A[]>> {
  return collectTo(iter, new EventualGroupByCollector(mapper));
}

export async function tally<A, K>(iter: Iterator<Promise<A>>, mapper?: EventualMapper<A, K>): Promise<Map<K, number>> {
  mapper ??= identity as EventualMapper<A, K>;
  const map = new Map<K, number>();
  for (; ;) {
    const item = iter.next();
    if (item.done) return map;
    const k = await mapper(await item.value);
    const v = map.get(k);
    map.set(k, (v ?? 0) + 1);
  }
}

export function toPromise<A>(iter: Iterator<A> | Iterable<A>): Iterator<Promise<A>> {
  return SyncIterators.map(SyncIterators.toIterator(iter), a => Promise.resolve(a));
}
