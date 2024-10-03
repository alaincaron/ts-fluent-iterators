import { Collector } from '../collectors';
import { ArrayGenerator, IteratorGenerator, Mapper, Predicate, Reducer } from '../utils';

export function* empty<A = never>(): IterableIterator<A> {}
export function* singleton<A>(a: A): IterableIterator<A> {
  if (a !== null) yield a;
}

export function* map<A, B>(iter: Iterator<A>, mapper: Mapper<A, B>): IterableIterator<B> {
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    yield mapper(item.value);
  }
}

export function* filterMap<A, B>(iter: Iterator<A>, mapper: Mapper<A, B | null | undefined>): IterableIterator<B> {
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    const b = mapper(item.value);
    if (b != null) yield b;
  }
}

export function first<A>(iter: Iterator<A>): A | undefined {
  for (;;) {
    const item = iter.next();
    if (item.done) return undefined;
    return item.value;
  }
}

export function* take<A>(iter: Iterator<A>, n: number): IterableIterator<A> {
  for (let i = 0; i < n; ++i) {
    const item = iter.next();
    if (item.done) break;
    yield item.value;
  }
}

export function* tap<A>(iter: Iterator<A>, mapper: Mapper<A, any>): IterableIterator<A> {
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    mapper(item.value);
    yield item.value;
  }
}

export function* skip<A>(iter: Iterator<A>, n: number): IterableIterator<A> {
  for (let i = 0; i < n; ++i) {
    const item = iter.next();
    if (item.done) break;
  }

  for (;;) {
    const item = iter.next();
    if (item.done) break;
    yield item.value;
  }
}

export function* filter<A>(iter: Iterator<A>, predicate: Predicate<A>): IterableIterator<A> {
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    if (predicate(item.value)) yield item.value;
  }
}

export function removeNull<A>(iter: Iterator<A>): IterableIterator<A> {
  return filter(iter, a => a != null);
}

export function* zip<A, B>(iter1: Iterator<A>, iter2: Iterator<B>): IterableIterator<[A, B]> {
  for (;;) {
    const item1 = iter1.next();
    const item2 = iter2.next();
    if (item1.done || item2.done) break;
    yield [item1.value, item2.value];
  }
}

export function* enumerate<A>(iter: Iterator<A>, start = 0): IterableIterator<[A, number]> {
  let i = start;
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    yield [item.value, i++];
  }
}

export function contains<A>(iter: Iterator<A>, predicate: Predicate<A>): boolean {
  return first(filter(iter, predicate)) !== undefined;
}

export function includes<A>(iter: Iterator<A>, target: A): boolean {
  return contains(iter, a => a === target);
}

export function fold<A, B>(iter: Iterator<A>, reducer: Reducer<A, B>, initialValue: B): B {
  let acc = initialValue;
  for (;;) {
    const item = iter.next();
    if (item.done) return acc;
    acc = reducer(acc, item.value);
  }
}

export function reduce<A>(iter: Iterator<A>, reducer: Reducer<A, A>, initialValue?: A): A | undefined {
  let acc = initialValue;
  if (acc === undefined) {
    const item = iter.next();
    if (item.done) return undefined;
    acc = item.value;
  }
  return fold(iter, reducer, acc);
}

export function forEach<A>(iter: Iterator<A>, mapper: Mapper<A, any>): void {
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    mapper(item.value);
  }
}

export function* append<A>(iter: Iterator<A>, other: Iterator<A>): IterableIterator<A> {
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    yield item.value;
  }
  for (;;) {
    const item = other.next();
    if (item.done) break;
    yield item.value;
  }
}

export function* prepend<A>(iter: Iterator<A>, other: Iterator<A>): IterableIterator<A> {
  for (;;) {
    const item = other.next();
    if (item.done) break;
    yield item.value;
  }
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    yield item.value;
  }
}

export function* concat<A>(...iters: Iterator<A>[]): IterableIterator<A> {
  for (const iter of iters) {
    for (;;) {
      const item = iter.next();
      if (item.done) break;
      yield item.value;
    }
  }
}

export function* takeWhile<A>(iter: Iterator<A>, predicate: Predicate<A>): IterableIterator<A> {
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    if (!predicate(item.value)) break;
    yield item.value;
  }
}

export function* skipWhile<A>(iter: Iterator<A>, predicate: Predicate<A>): IterableIterator<A> {
  let skip = true;
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    if (skip) {
      skip = predicate(item.value);
      if (skip) continue;
    }
    yield item.value;
  }
}

export function all<A>(iter: Iterator<A>, predicate: Predicate<A>): boolean {
  for (;;) {
    const item = iter.next();
    if (item.done) return true;
    if (!predicate(item.value)) return false;
  }
}

export function some<A>(iter: Iterator<A>, predicate: Predicate<A>): boolean {
  for (;;) {
    const item = iter.next();
    if (item.done) return false;
    if (predicate(item.value)) return true;
  }
}

export function collectTo<A, B>(iter: Iterator<A>, collector: Collector<A, B>): B {
  for (;;) {
    const item = iter.next();
    if (item.done) return collector.result;
    collector.collect(item.value);
  }
}

export function* partition<A>(iter: Iterator<A>, size: number): IterableIterator<A[]> {
  if (!Number.isSafeInteger(size) || size < 0) throw new Error(`Invalid size integer number: ${size}`);
  let values: A[] = [];
  for (;;) {
    const item = iter.next();
    if (item.done) {
      if (values.length > 0) yield values;
      break;
    }
    if (values.push(item.value) >= size) {
      yield values;
      values = [];
    }
  }
}

export function* distinct<A, K = A>(
  iter: Iterator<A>,
  mapper: Mapper<A, K> = (a: A) => a as unknown as K
): IterableIterator<A> {
  const seen = new Set<K>();
  for (;;) {
    const item = iter.next();
    if (item.done) break;
    const value = item.value;
    const key = mapper(value);
    if (!seen.has(key)) {
      seen.add(key);
      yield value;
    }
  }
}

function* seedToIterator<A>(n: number, seed: (i: number) => A) {
  for (let i = 0; i < n; ++i) {
    yield seed(i);
  }
}

function arrayLikeToIterator<A>(arrayLike: ArrayGenerator<A>): Iterator<A> | null {
  const { seed, length } = arrayLike;
  if (seed == null || length == null) return null;
  if (typeof seed === 'function') return seedToIterator(length, seed);
  if ('next' in seed && typeof seed.next === 'function') return take(seed, length);
  if (Symbol.iterator in seed && typeof seed[Symbol.iterator] === 'function')
    return take(seed[Symbol.iterator](), length);
  return null;
}

export function toIteratorMaybe<A>(iter: IteratorGenerator<A>): Iterator<A> | null {
  switch (typeof iter) {
    case 'string':
      return (iter as string)[Symbol.iterator]() as Iterator<A>;
    case 'object':
      if ('next' in iter && typeof iter.next === 'function') return iter;
      if (Symbol.iterator in iter && typeof iter[Symbol.iterator] === 'function') return iter[Symbol.iterator]();
      if ('iterator' in iter && typeof iter.iterator === 'function') return iter.iterator();
      break;
    case 'function':
      return seedToIterator(Number.MAX_SAFE_INTEGER, iter);
  }
  return arrayLikeToIterator(iter as unknown as ArrayGenerator<A>);
}

export function toIterator<A>(x: IteratorGenerator<A>): Iterator<A> {
  const iter = toIteratorMaybe(x);
  if (iter) return iter;
  throw new Error(`Invalid non-iterable object: ${x}`);
}
