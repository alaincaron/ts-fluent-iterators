import * as SyncIterators from "../sync/iterators";
export { iterator, isIterable, take, skip } from "../sync/iterators";

export function* map<A, B>(iter: Iterator<Promise<A>>, f: (a: A) => B | Promise<B>): Iterator<Promise<B>> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    yield item.value.then(a => f(a));
  }
}

export function* flatmap<A, B>(iter: Iterator<Promise<A>>, f: (a: Promise<A>) => B | Promise<B>): Iterator<Promise<B>> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    yield item.value.then(a => f(Promise.resolve(a)));
  }
}

export function first<A>(iter: Iterator<Promise<A>>): Promise<A | undefined> {
  const item = iter.next();
  if (item.done) return Promise.resolve(undefined);
  return item.value;
}

export function* tap<A>(iter: Iterator<Promise<A>>, f: (a: A) => any): Iterator<Promise<A>> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    yield item.value.then(a => {
      f(a);
      return a;
    });
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

export function* enumerate<A>(iter: Iterator<Promise<A>>): Iterator<Promise<[A, number]>> {
  let n = 0;
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    yield Promise.all([item.value, n++]);
  }
}

export async function find<A>(iter: Iterator<Promise<A>>, predicate: (a: A) => boolean): Promise<A | undefined> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    if (predicate(await item.value)) return item.value
  }
}

export function fold<A, B>(iter: Iterator<Promise<A>>, reducer: (b: B, a: A) => B | Promise<B>, initialValue: B): Promise<B> {
  let acc = Promise.resolve(initialValue);
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    acc = acc.then((async (b) => reducer(b, await item.value)));
  }
  return acc;
}

export async function reduce<A>(iter: Iterator<Promise<A>>, reducer: (acc: A, a: A) => A | Promise<A>, initialValue?: A): Promise<A | undefined> {
  if (initialValue == null) {
    const current = iter.next();
    if (current.done) {
      return Promise.resolve(undefined);
    }
    initialValue = await current.value;
  }
  return fold(iter, reducer, initialValue);
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
