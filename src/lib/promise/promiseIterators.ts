import * as SyncIterators from "../sync/iterators";
import { sumReducer, avgReducer } from "../sync/iterators";
import { EventualMapper, EventualPredicate, EventualReducer, Eventually } from "../types";

export function* map<A, B>(iter: Iterable<Promise<A>>, mapper: EventualMapper<A, B>): Iterable<Promise<B>> {
  for (const a of iter) {
    yield a.then(a => mapper(a));
  }
}

export function* flatmap<A, B>(iter: Iterable<Promise<A>>, mapper: EventualMapper<Promise<A>, B>): Iterable<Promise<B>> {
  for (const a of iter) {
    yield a.then(a => mapper(Promise.resolve(a)));
  }
}

export function first<A>(iter: Iterable<Promise<A>>): Promise<A | undefined> {
  for (const a of iter) {
    return a;
  }
  return Promise.resolve(undefined);
}

export async function* filter<A>(iter: Iterable<Promise<A>>, predicate: EventualPredicate<A>): AsyncIterable<A> {
  for (const a of iter) {
    const v = await a;
    if (await predicate(v)) yield v;
  }
}

export function* tap<A>(iter: Iterable<Promise<A>>, mapper: EventualMapper<A, any>): Iterable<Promise<A>> {
  for (const a of iter) {
    yield a.then(a => Promise.resolve(mapper(a)).then(_ => a));
  }
}

export function* zip<A, B>(iter1: Iterable<Promise<A>>, iter2: Iterable<Promise<B>>): Iterable<Promise<[A, B]>> {
  const iterator1 = iter1[Symbol.iterator]();
  const iterator2 = iter2[Symbol.iterator]();
  for (; ;) {
    const item1 = iterator1.next();
    const item2 = iterator2.next();
    if (item1.done || item2.done) break;
    yield Promise.all([item1.value, item2.value]);
  }
}

export function* enumerate<A>(iter: Iterable<Promise<A>>): Iterable<Promise<[A, number]>> {
  let n = 0;
  for (const a of iter) {
    yield Promise.all([a, n++]);
  }
}

export async function find<A>(iter: Iterable<Promise<A>>, predicate: EventualPredicate<A>): Promise<A | undefined> {
  for (const a of iter) {
    const value = await a;
    if (await predicate(value)) return value;
  }
}

export async function contains<A>(iter: Iterable<Promise<A>>, predicate: EventualPredicate<A>): Promise<boolean> {
  return await find(iter, predicate) !== undefined;
}

export async function includes<A>(iter: Iterable<Promise<A>>, target: Eventually<A>): Promise<boolean> {
  return await find(iter, async (a) => a === await target) !== undefined;
}

export function fold<A, B>(iter: Iterable<Promise<A>>, reducer: EventualReducer<A, B>, initialValue: Eventually<B>): Promise<B> {
  let acc = Promise.resolve(initialValue);
  for (const a of iter) {
    acc = acc.then((async (b) => reducer(b, await a)));
  }
  return acc;
}

export async function forEach<A>(iter: Iterable<Promise<A>>, mapper: (a: A) => any): Promise<void> {
  for (const x of map(iter, mapper)) {
    await x;
  }
}

export function reduce<A>(iter: Iterable<Promise<A>>, reducer: EventualReducer<A, A>, initialValue?: Eventually<A>): Promise<A | undefined> {
  let acc: Promise<A> | undefined = undefined;

  for (const a of iter) {
    if (acc === undefined) {
      if (initialValue == null) {
        acc = Promise.resolve().then(() => a);
      } else {
        acc = Promise.resolve(initialValue).then(async (acc) => reducer(acc, await a));
      }
    } else {
      acc = acc.then((async (acc) => reducer(acc, await a)));
    }
  }
  return acc!;
}

export async function* takeWhile<A>(iter: Iterable<Promise<A>>, predicate: EventualPredicate<A>): AsyncIterable<A> {
  for (const a of iter) {
    const v = await a;
    if (!await predicate(v)) break;
    yield v;
  }
}

export async function* skipWhile<A>(iter: Iterable<Promise<A>>, predicate: EventualPredicate<A>): AsyncIterable<A> {
  let skip = true;
  for (const a of iter) {
    const v = await a;
    if (skip) {
      skip = await predicate(v);
    }
    if (skip) continue;
    yield v;
  }
}

export async function* distinct<A>(iter: Iterable<Promise<A>>): AsyncIterable<A> {
  const seen = new Set<A>();
  for (const a of iter) {
    const v = await a;
    if (seen.has(v)) continue;
    seen.add(v);
    yield v;
  }
}

export async function all<A>(iter: Iterable<Promise<A>>, predicate: EventualPredicate<A>): Promise<boolean> {
  for (const promise of iter) {
    if (!await predicate(await promise)) return false;
  }
  return true;
}

export async function some<A>(iter: Iterable<Promise<A>>, predicate: EventualPredicate<A>): Promise<boolean> {
  for (const promise of iter) {
    if (await predicate(await promise)) return true;
  }
  return false;
}

export function collect<A>(iter: Iterable<Promise<A>>): Promise<A[]> {
  return Promise.all(SyncIterators.collect(iter));
}

export function allSettled<A>(iter: Iterable<Promise<A>>): Promise<PromiseSettledResult<A>[]> {
  return Promise.allSettled(SyncIterators.collect(iter));
}

export function race<A>(iter: Iterable<Promise<A>>): Promise<A | undefined> {
  const promises = SyncIterators.collect(iter);
  if (!promises.length) return Promise.resolve(undefined);
  return Promise.race(promises);
}

export function any<A>(iter: Iterable<Promise<A>>): Promise<A | undefined> {
  const promises = SyncIterators.collect(iter);
  if (!promises.length) return Promise.resolve(undefined);
  return Promise.any(promises);
}

export function sum(iter: Iterable<Promise<number>>): Promise<number> {
  return fold(iter, sumReducer, { sum: 0, correction: 0 }).then(s => s.sum);
}

export function avg(iter: Iterable<Promise<number>>): Promise<number> {
  return fold(iter, avgReducer, { avg: 0, i: 0 }).then(s => s.avg);
}

export async function count<A>(iter: Iterable<Promise<A>>, predicate?: EventualPredicate<A>): Promise<number> {
  predicate ??= (_: A) => true;
  let n = 0;
  for (const a of iter) {
    if (await predicate(await a)) ++n;
  }
  return n;
}

export function* toPromise<A>(iter: Iterable<A>): Iterable<Promise<A>> {
  yield* SyncIterators.map(iter, a => Promise.resolve(a));
}
