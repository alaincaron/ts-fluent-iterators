
export function iterator<A>(iter: Iterator<A> | Iterable<A>): Iterator<A> {
  if (isIterable(iter)) return (iter as any)[Symbol.iterator]() as Iterator<A>;
  throw new Error(`Object is not iterable: ${iter}`);
}

export function isIterable(obj: any): boolean {
  return obj != null && typeof obj[Symbol.iterator] === 'function';
}

export function* map<A, B>(iter: Iterator<A>, f: (a: A) => B): Iterator<B> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    yield f(item.value);
  }
}

export function first<A>(iter: Iterator<A>): A | undefined {
  return iter.next().value;
}

export function* take<A>(iter: Iterator<A>, n: number): Iterator<A> {
  let i = 0;
  for (; ;) {
    if (++i > n) break;
    const item = iter.next();
    if (item.done) break;
    yield item.value;
  }
}

export function* tap<A>(iter: Iterator<A>, f: (a: A) => any): Iterator<A> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    const value = item.value;
    f(value);
    yield value;
  }
}

export function* skip<A>(iter: Iterator<A>, n: number): Iterator<A> {
  let i = 0;
  for (; ;) {
    if (++i > n) break;
    const item = iter.next();
    if (item.done) break;
  }

  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    yield item.value;
  }
}

export function* filter<A>(iter: Iterator<A>, predicate: (a: A) => boolean): Iterator<A> {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    if (predicate(item.value)) yield item.value
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

export function* enumerate<A>(iter: Iterator<A>): Iterator<[A, number]> {
  let n = 0;
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    yield [item.value, n++];
  }
}

export function find<A>(iter: Iterator<A>, predicate: (a: A) => boolean): A | undefined {
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    if (predicate(item.value)) return item.value
  }
}

export function fold<A, B>(iter: Iterator<A>, reducer: (b: B, a: A) => B, initialValue: B): B {
  let acc = initialValue;
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    acc = reducer(acc, item.value);
  }
  return acc;
}

export function reduce<A>(iter: Iterator<A>, reducer: (acc: A, a: A) => A, initialValue?: A): A | undefined {
  if (initialValue == null) {
    const current = iter.next();
    if (current.done) {
      return undefined;
    }
    initialValue = current.value;
  }
  return fold(iter, reducer, initialValue);
}

export function collect<A>(iter: Iterator<A>): A[] {
  const result: A[] = [];
  for (; ;) {
    const item = iter.next();
    if (item.done) break;
    result.push(item.value)
  }
  return result;
}

export function* range(start: number, end?: number, step: number = 1): Iterator<number> {
  let value = start;
  while (end == null || value < end) {
    yield value;
    value += step;
  }
}
