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
export function reverse<A>(comparator: Comparator<A> = natural) {
  return (a1: A, a2: A) => comparator(a2, a1);
}

/**
 * A `Comparator` that orders elements in the reverse order of the `natural` `Comparator`.
 */
export const reversed = reverse(natural);

/**
 *   A comparator that sorts the elements based on the natural order of the mappers.
 *
 *   @example
 *   const orderByLen = orderBy<string>(s => s.length);
 *   // comparator to sort string according to their lengths.
 */
export function orderBy<A>(mapper: Mapper<A, number>): Comparator<A> {
  return compose(natural, mapper);
}

/**
 *   Returns a  comparator that applies a comparator to the elements after they'be mapped by a mapper.
 *
 *   @example
 *   const orderByLen = compose<string,number>(natural, s => s.length);
 *   // comparator to sort string according to their lengths.
 */
export function compose<A, B>(comparator: Comparator<B>, mapper: Mapper<A, B>): Comparator<A> {
  return (a1: A, a2: A) => comparator(mapper(a1), mapper(a2));
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
