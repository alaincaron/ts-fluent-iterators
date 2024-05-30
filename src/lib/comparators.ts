import { Comparator } from './types';

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
 * A `Comparator` that orders elements in the reverser order of the `natural` `Comparator`.
 */
export const reversed = reverse(natural);
