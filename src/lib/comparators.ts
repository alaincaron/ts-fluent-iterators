/**
 * Default comparator.
 *  @typeParam A The type of elements to be compared
 * @param a1 The left-hand size argument
 * @param a2 The right-hand size argument
 *  @returns
 * - -1 if `a1 < a2`,
 * - 1 if `a1 > a2`,
 * - 0 otherwise.
 */
export function defaultComparator<A>(a1: A, a2: A) {
  if (a1 < a2) return -1;
  if (a1 > a2) return 1;
  return 0;
}

/**
 * Reverse comparator.
 *  @typeParam A The type of elements to be compared
 * @param a1 The left-hand size argument
 * @param a2 The right-hand size argument
 *  @returns
 * - 1 if `a1 < a2`,
 * - -1 if `a1 > a2`,
 * - 0 otherwise.
 */
export function reverseComparator<A>(a1: A, a2: A) {
  return defaultComparator(a2, a1);
}
