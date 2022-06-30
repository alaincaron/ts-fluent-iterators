import * as SyncIterators from "../sync/iterators";
import { sumReducer, avgReducer } from "../sync/iterators";

export function* map<A, B>(iter: Iterable<Promise<A>>, f: (a: A) => B | Promise<B>): Iterable<Promise<B>> {
  for (const a of iter) {
    yield a.then(a => f(a));
  }
}

export function* flatmap<A, B>(iter: Iterable<Promise<A>>, f: (a: Promise<A>) => B | Promise<B>): Iterable<Promise<B>> {
  for (const a of iter) {
    yield a.then(a => f(Promise.resolve(a)));
  }
}

export function first<A>(iter: Iterable<Promise<A>>): Promise<A | undefined> {
  for (const a of iter) {
    return a;
  }
  return Promise.resolve(undefined);
}

export function* tap<A>(iter: Iterable<Promise<A>>, f: (a: A) => any): Iterable<Promise<A>> {
  for (const a of iter) {
    yield a.then(a => {
      f(a);
      return a;
    });
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

export async function find<A>(iter: Iterable<Promise<A>>, predicate: (a: A) => boolean | Promise<boolean>): Promise<A | undefined> {
  for (const a of iter) {
    const value = await a;
    if (await predicate(value)) return value;
  }
}

export async function contains<A>(iter: Iterable<Promise<A>>, predicate: (a: A) => boolean | Promise<boolean>): Promise<boolean> {
  return await find(iter, predicate) !== undefined;
}

export async function includes<A>(iter: Iterable<Promise<A>>, target: A | Promise<A>): Promise<boolean> {
  return await find(iter, async (a) => a === await target) !== undefined;
}

export function fold<A, B>(iter: Iterable<Promise<A>>, reducer: (b: B, a: A) => B | Promise<B>, initialValue: B | Promise<B>): Promise<B> {
  let acc = Promise.resolve(initialValue);
  for (const a of iter) {
    acc = acc.then((async (b) => reducer(b, await a)));
  }
  return acc;
}

export async function forEach<A>(iter: Iterable<Promise<A>>, f: (a: A) => any): Promise<void> {
  for (const x of map(iter, f)) {
    await x;
  }
}

export function reduce<A>(iter: Iterable<Promise<A>>, reducer: (acc: A, a: A) => A | Promise<A>, initialValue?: A | Promise<A>): Promise<A | undefined> {
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

export async function all<A>(iter: Iterable<Promise<A>>, predicate: (a: A) => boolean | Promise<boolean>): Promise<boolean> {
  for (const promise of iter) {
    if (!await predicate(await promise)) return false;
  }
  return true;
}

export async function some<A>(iter: Iterable<Promise<A>>, predicate: (a: A) => boolean | Promise<boolean>): Promise<boolean> {
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

export function* toPromise<A>(iter: Iterable<A>): Iterable<Promise<A>> {
  yield* SyncIterators.map(iter, a => Promise.resolve(a));
}
