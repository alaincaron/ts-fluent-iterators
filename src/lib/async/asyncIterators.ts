import { sumReducer, avgReducer } from "../sync/iterators";
import { EventualMapper, EventualPredicate, Eventually, Reducer, Comparator } from "../types";
import { alwaysTrue, defaultComparator } from "../functions";

export async function* map<A, B>(iter: AsyncIterable<A>, mapper: EventualMapper<A, B>): AsyncIterable<B> {
  for await (const a of iter) {
    yield await mapper(a);
  }
}

export async function first<A>(iter: AsyncIterable<A>): Promise<A | undefined> {
  for await (const a of iter) {
    return a;
  }
}

export async function* take<A>(iter: AsyncIterable<A>, n: number): AsyncIterable<A> {
  let i = 0;
  for await (const a of iter) {
    if (++i > n) break;
    yield a;
  }
}

export async function* tap<A>(iter: AsyncIterable<A>, mapper: EventualMapper<A, any>): AsyncIterable<A> {
  for await (const a of iter) {
    await mapper(a);
    yield a;
  }
}

export async function* skip<A>(iter: AsyncIterable<A>, n: number): AsyncIterable<A> {
  const iterator = iter[Symbol.asyncIterator]();
  let i = 0;
  for (; ;) {
    if (++i > n) break;
    const item = await iterator.next();
    if (item.done) break;
  }

  for (; ;) {
    const item = await iterator.next();
    if (item.done) break;
    yield item.value;
  }
}

export async function* filter<A>(iter: AsyncIterable<A>, predicate: EventualPredicate<A>): AsyncIterable<A> {
  for await (const a of iter) {
    if (await predicate(a)) yield a;
  }
}

export async function* zip<A, B>(iter1: AsyncIterable<A>, iter2: AsyncIterable<B>): AsyncIterable<[A, B]> {
  const iterator1 = iter1[Symbol.asyncIterator]();
  const iterator2 = iter2[Symbol.asyncIterator]();
  for (; ;) {
    const item1 = await iterator1.next();
    const item2 = await iterator2.next();
    if (item1.done || item2.done) break;
    yield [item1.value, item2.value];
  }
}

export async function* enumerate<A>(iter: AsyncIterable<A>): AsyncIterable<[A, number]> {
  let n = 0;
  for await (const a of iter) {
    yield [a, n++];
  }
}

export async function find<A>(iter: AsyncIterable<A>, predicate: EventualPredicate<A>): Promise<A | undefined> {
  for await (const a of iter) {
    if (await predicate(a)) return a;
  }
}

export async function contains<A>(iter: AsyncIterable<A>, predicate: EventualPredicate<A>): Promise<boolean> {
  return await find(iter, predicate) !== undefined;
}

export async function includes<A>(iter: AsyncIterable<A>, target: Eventually<A>): Promise<boolean> {
  return await find(iter, async (a) => a === await target) !== undefined;
}

export async function fold<A, B>(iter: AsyncIterable<A>, reducer: Reducer<A, B>, initialValue: B): Promise<B> {
  let acc = initialValue;
  for await (const a of iter) {
    acc = reducer(acc, a);
  }
  return acc;
}

export async function reduce<A>(iter: AsyncIterable<A>, reducer: Reducer<A, A>, initialValue?: A): Promise<A | undefined> {
  const iterator = iter[Symbol.asyncIterator]();

  let acc = initialValue;
  if (acc == null) {
    const current = await iterator.next();
    if (current.done) {
      return undefined;
    }
    acc = current.value;
  }

  for (; ;) {
    const item = await iterator.next();
    if (item.done) break;
    acc = reducer(acc, item.value);
  }
  return acc;
}

export async function forEach<A>(iter: AsyncIterable<A>, mapper: EventualMapper<A, any>): Promise<void> {
  for await (const a of iter) {
    await mapper(a);
  }
}

export async function* append<A>(iter: AsyncIterable<A>, items: AsyncIterable<A> | Iterable<A>): AsyncIterable<A> {
  yield* iter;
  yield* items;
}

export async function* prepend<A>(iter: AsyncIterable<A>, items: AsyncIterable<A> | Iterable<A>): AsyncIterable<A> {
  yield* items;
  yield* iter;
}

export async function* concat<A>(...iters: (AsyncIterable<A> | Iterable<A>)[]): AsyncIterable<A> {
  for await (const iter of iters) {
    yield* iter;
  }
}

export async function* takeWhile<A>(iter: AsyncIterable<A>, predicate: EventualPredicate<A>): AsyncIterable<A> {
  for await (const a of iter) {
    if (!await predicate(a)) break;
    yield a;
  }
}

export async function* skipWhile<A>(iter: AsyncIterable<A>, predicate: EventualPredicate<A>): AsyncIterable<A> {
  let skip = true;
  for await (const a of iter) {
    if (skip) {
      skip = await predicate(a);
    }
    if (skip) continue;
    yield a;
  }
}

export async function* distinct<A>(iter: AsyncIterable<A>): AsyncIterable<A> {
  const seen = new Set<A>();
  for await (const a of iter) {
    if (seen.has(a)) continue;
    seen.add(a);
    yield a;
  }
}

export async function all<A>(iter: AsyncIterable<A>, predicate: EventualPredicate<A>): Promise<boolean> {
  for await (const a of iter) {
    if (!await Promise.resolve(predicate(a))) return false;
  }
  return true;
}

export async function some<A>(iter: AsyncIterable<A>, predicate: EventualPredicate<A>): Promise<boolean> {
  for await (const a of iter) {
    if (await Promise.resolve(predicate(a))) return true;
  }
  return false;
}

export async function collect<A>(iter: AsyncIterable<A>): Promise<A[]> {
  const result: A[] = [];
  for await (const a of iter) {
    result.push(a);
  }
  return result;
}

export function sum(iter: AsyncIterable<number>): Promise<number> {
  return fold(iter, sumReducer, { sum: 0, correction: 0 }).then(s => s.sum);
}

export function avg(iter: AsyncIterable<number>): Promise<number> {
  return fold(iter, avgReducer, { avg: 0, i: 0 }).then(s => s.avg);
}

export async function count<A>(iter: AsyncIterable<A>, predicate?: EventualPredicate<A>): Promise<number> {
  predicate ??= alwaysTrue;
  let n = 0;
  for await (const a of iter) {
    if (await predicate(a)) ++n;
  }
  return n;
}

export function min<A>(iter: AsyncIterable<A>, comparator: Comparator<A> = defaultComparator): Promise<A | undefined> {
  const reducer = (acc: A, a: A) => comparator(acc, a) <= 0 ? acc : a;
  return reduce(iter, reducer);
}

export function max<A>(iter: AsyncIterable<A>, comparator: Comparator<A> = defaultComparator): Promise<A | undefined> {
  const reducer = (acc: A, a: A) => comparator(acc, a) >= 0 ? acc : a;
  return reduce(iter, reducer);
}

export async function last<A>(iter: AsyncIterable<A>, predicate: EventualPredicate<A> = alwaysTrue): Promise<A | undefined> {
  let result: A | undefined;
  for await (const a of iter) {
    if (await predicate(a)) result = a;
  }
  return result;
}

export function join<A>(iter: AsyncIterable<A>, separator: string = ','): Promise<string> {
  return fold(iter, (state, a) => {
    state.acc = state.first ? `${a}` : `${state.acc}${separator}${a}`;
    state.first = false;
    return state;
  }, { first: true, acc: '' }).then(state => state.acc);
}


export async function* toAsync<A>(iter: Iterable<A>): AsyncIterable<A> {
  yield* iter;
}
