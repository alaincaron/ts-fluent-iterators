import { BinaryPredicate, Comparator, Mapper } from '../utils';

/**
 * Natural comparator.
 *  @typeParam A The type of elements to be compared
 * @param a1 The left-hand size argument
 * @param a2 The right-hand size argument
 *  @returns
 * - -1 if `a1 < a2`,
 * - 1 if `a1 > a2`,
 * - 0 otherwise.
 */
export function natural<A>(a1: A, a2: A) {
  if (a1 < a2) return -1;
  if (a1 > a2) return 1;
  return 0;
}

/**
 * Reverse comparator.
 *  @typeParam A The type of elements to be compared
 * @param comparator The comparator being inversed.
 *  @returns
 * A new comparator that reverses the order of the operand on the initial `comparator`
 */
export function reverse<A>(comparator: Comparator<A> = natural): Comparator<A> {
  return (a1, a2) => comparator(a2, a1);
}

/**
 * A `Comparator` that orders elements in the reverse order of the `natural` `Comparator`.
 */
export const reversed = reverse(natural);

/**
 *   A comparator that sorts the elements based on the natural order of the mappers.
 *
 *   @example
 *   const orderByLen = byMapper<string>(s => s.length);
 *   // comparator to sort string according to their lengths.
 */
export function byMapper<A, B>(mapper: Mapper<A, B>): Comparator<A> {
  return onResultOf(natural, mapper);
}

/**
 *   A comparator that sorts the elements based on the natural order of an attribute.
 *
 *   @example
 *   interface X { a: number, b: number };
 *   const orderByA = byAttr<X>('a');
 *   // comparator to object of type X based on their 'a' attribute
 */
export function byAttr<A extends object>(attr: keyof A): Comparator<A> {
  return byMapper(x => x[attr]);
}

/**
 *   Returns a comparator that applies a comparator to the result of applying the mapper.
 *
 *   @example
 *   const orderByLen = onResultOf<string,number>(natural, s => s.length);
 *   // comparator to sort string according to their lengths.
 */
export function onResultOf<A, B>(comparator: Comparator<B>, mapper: Mapper<A, B>): Comparator<A> {
  return (a1, a2) => comparator(mapper(a1), mapper(a2));
}

/**
 * Returns a comparator base on a `Binarypredicate`
 *  @typeParam A The type of elements to be compare
 * @param isLessThan A `BinaryPredicate` used to order the elements.  The predicate must follow ordering rules, i.e isLessThan(a,b) = true implies isLessThan(b,a) is false.
 *
 * @example
 * const orderByLen = fromPredicate<string>((s1,s2) => s1.length < s2.length);
 */
export function fromPredicate<A>(isLessThan: BinaryPredicate<A, A>): Comparator<A> {
  return (a1, a2) => {
    if (isLessThan(a1, a2)) return -1;
    if (isLessThan(a2, a1)) return 1;
    return 0;
  };
}

export function compound<T>(first: Comparator<T>, second: Comparator<T>): Comparator<T> {
  return (t1, t2) => first(t1, t2) || second(t1, t2);
}

export function chain<T>(items: Iterable<Comparator<T>>): Comparator<T> {
  return (t1, t2) => {
    let result = 0;
    for (const c of items) {
      result = c(t1, t2);
      if (result) break;
    }
    return result;
  };
}

export function lexicographical<T>(comparator: Comparator<T>): Comparator<Iterable<T>> {
  return (iterable1, iterable2) => {
    const iter1 = iterable1[Symbol.iterator]();
    const iter2 = iterable2[Symbol.iterator]();
    for (;;) {
      const item1 = iter1.next();
      const item2 = iter2.next();
      if (item1.done) {
        return item2.done ? 0 : -1;
      }
      if (item2.done) return 1;
      const result = comparator(item1.value, item2.value);
      if (result) return result;
    }
  };
}

export function nullsFirst<T>(comparator: Comparator<T>): Comparator<T | null | undefined> {
  return (t1, t2) => {
    if (t1 === t2) return 0;
    if (t1 == null) return t2 == null ? 0 : -1;
    if (t2 == null) return 1;
    return comparator(t1, t2);
  };
}

export function nullsLast<T>(comparator: Comparator<T>): Comparator<T | null | undefined> {
  return (t1, t2) => {
    if (t1 === t2) return 0;
    if (t1 == null) return t2 == null ? 0 : 1;
    if (t2 == null) return -1;
    return comparator(t1, t2);
  };
}

export function isOrdered<T1, T2 extends T1 = T1>(comparator: Comparator<T1>, items: Iterable<T2>): boolean {
  const iterator = items[Symbol.iterator]();
  let prev = iterator.next();
  if (prev.done) return true;
  for (;;) {
    const item = iterator.next();
    if (item.done) return true;
    if (comparator(prev.value, item.value) > 0) return false;
    prev = item;
  }
}

export function isStrictlyOrdered<T1, T2 extends T1 = T1>(comparator: Comparator<T1>, items: Iterable<T2>): boolean {
  const iterator = items[Symbol.iterator]();
  let prev = iterator.next();
  if (prev.done) return true;
  for (;;) {
    const item = iterator.next();
    if (item.done) return true;
    if (comparator(prev.value, item.value) >= 0) return false;
    prev = item;
  }
}
