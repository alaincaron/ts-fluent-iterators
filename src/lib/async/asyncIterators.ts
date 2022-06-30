import { sumReducer, avgReducer } from "../sync/iterators";

export async function* map<A, B>(iter: AsyncIterable<A>, f: (a: A) => B): AsyncIterable<B> {
  for await (const a of iter) {
    yield f(a);
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

export async function* tap<A>(iter: AsyncIterable<A>, f: (a: A) => any): AsyncIterable<A> {
  for await (const a of iter) {
    f(a);
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

export async function* filter<A>(iter: AsyncIterable<A>, predicate: (a: A) => boolean): AsyncIterable<A> {
  for await (const a of iter) {
    if (predicate(a)) yield a;
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

export async function find<A>(iter: AsyncIterable<A>, predicate: (a: A) => boolean): Promise<A | undefined> {
  for await (const a of iter) {
    if (predicate(a)) return a;
  }
}

export async function fold<A, B>(iter: AsyncIterable<A>, reducer: (b: B, a: A) => B, initialValue: B): Promise<B> {
  let acc = initialValue;
  for await (const a of iter) {
    acc = reducer(acc, a);
  }
  return acc;
}

export async function reduce<A>(iter: AsyncIterable<A>, reducer: (acc: A, a: A) => A, initialValue?: A): Promise<A | undefined> {
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

export async function forEach<A>(iter: AsyncIterable<A>, f: (a: A) => any): Promise<void> {
  for await (const a of iter) {
    f(a);
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

export async function* takeWhile<A>(iter: AsyncIterable<A>, predicate: (a: A) => boolean): AsyncIterable<A> {
  for await (const a of iter) {
    if (!predicate(a)) break;
    yield a;
  }
}

export async function* skipWhile<A>(iter: AsyncIterable<A>, predicate: (a: A) => boolean): AsyncIterable<A> {
  let skip = true;
  for await (const a of iter) {
    if (skip) {
      skip = predicate(a);
    }
    if (skip) continue;
    yield a;
  }
}

export async function all<A>(iter: AsyncIterable<A>, predicate: (a: A) => boolean | Promise<boolean>): Promise<boolean> {
  for await (const a of iter) {
    if (!await Promise.resolve(predicate(a))) return false;
  }
  return true;
}

export async function some<A>(iter: AsyncIterable<A>, predicate: (a: A) => boolean | Promise<boolean>): Promise<boolean> {
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

export async function* toAsync<A>(iter: Iterable<A>): AsyncIterable<A> {
  yield* iter;
}
