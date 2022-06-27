
export function asyncIterator<A>(iter: AsyncIterator<A> | AsyncIterable<A>): AsyncIterator<A> {
  if (isAsyncIterable(iter)) return (iter as any)[Symbol.asyncIterator]() as AsyncIterator<A>;
  throw new Error(`Object is not async iterable: ${iter}`);
}

export function isAsyncIterable(obj: any): boolean {
  return obj != null && typeof obj[Symbol.asyncIterator] === 'function';
}

export async function* map<A, B>(iter: AsyncIterator<A>, f: (a: A) => B): AsyncIterator<B> {
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    yield f(item.value);
  }
}

export function first<A>(iter: AsyncIterator<A>): Promise<A | undefined> {
  return iter.next().then(i => i.value);
}

export async function* take<A>(iter: AsyncIterator<A>, n: number): AsyncIterator<A> {
  let i = 0;
  for (; ;) {
    if (++i > n) break;
    const item = await iter.next();
    if (item.done) break;
    yield item.value;
  }
}

export async function* tap<A>(iter: AsyncIterator<A>, f: (a: A) => any): AsyncIterator<A> {
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    f(item.value);
    yield item.value;
  }
}

export async function* skip<A>(iter: AsyncIterator<A>, n: number): AsyncIterator<A> {
  let i = 0;
  for (; ;) {
    if (++i > n) break;
    const item = await iter.next();
    if (item.done) break;
  }

  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    yield item.value;
  }
}

export async function* filter<A>(iter: AsyncIterator<A>, predicate: (a: A) => boolean): AsyncIterator<A> {
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    if (predicate(item.value)) yield item.value
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

export async function* enumerate<A>(iter: AsyncIterator<A>): AsyncIterator<[A, number]> {
  let n = 0;
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    yield [item.value, n++];
  }
}

export async function find<A>(iter: AsyncIterator<A>, predicate: (a: A) => boolean): Promise<A | undefined> {
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    if (predicate(item.value)) return item.value
  }
}

export async function fold<A, B>(iter: AsyncIterator<A>, reducer: (b: B, a: A) => B, initialValue: B): Promise<B> {
  let acc = initialValue;
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    acc = reducer(acc, item.value);
  }
  return acc;
}

export async function reduce<A>(iter: AsyncIterator<A>, reducer: (acc: A, a: A) => A, initialValue?: A): Promise<A | undefined> {
  if (initialValue == null) {
    const current = await iter.next();
    if (current.done) {
      return undefined;
    }
    initialValue = current.value;
  }
  return fold(iter, reducer, initialValue);
}

export async function collect<A>(iter: AsyncIterator<A>): Promise<A[]> {
  const result: A[] = [];
  for (; ;) {
    const item = await iter.next();
    if (item.done) break;
    result.push(item.value)
  }
  return result;
}
