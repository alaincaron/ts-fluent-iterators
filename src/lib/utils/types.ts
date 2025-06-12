/**
 * A function mapping a value of type `A` to type `B`
 * @typeParam A the source type on which the `Mapper` is applied.
 * @typeParam B the target type
 * @example
 * const strlen: Mapper<string,number> = s => s.length;
 */
export type Mapper<A, B> = (a: A) => B;

/**
 * A function that provides a value of type `A`
 * @typeParam A the type of elements being provided
 **/
export type Provider<A> = () => A;

/**
 * A function that consumes a value of type `A`
 * @typeParam A the type of elements being consumed
 **/
export type Consumer<A> = (a: A) => void;

/**
 * A predicate on a value.
 * @typeParam A the type of values on which the predicate is to be evaluated.
 * @example
 * const lengthGreaterThanFive: Predicate<string> = s => s.length > 5;
 */
export type Predicate<A> = Mapper<A, boolean>;

/**
 * A function mapping a pair of values of types `A` and `B` to type `C`
 * @typeParam A the type of the first operand
 * @typeParam B the type of the second operand
 * @typeParam the type of the result
 @example
 const sum: BinaryMapper<number,number,number> = (a,b) => a + b;
 */
export type BinaryMapper<A, B, C> = (a: A, b: B) => C;

/**
 * A function mapping a pair of values of types `A` and `B` to type `boolean`
 * @typeParam A the type of the first operand
 * @typeParam B the type of the second operand
 */
export type BinaryPredicate<A, B> = BinaryMapper<A, B, boolean>;

/**
 * A collision handler for collectors. Used by `Collectors` `MapCollector` and `ObjectCollector` to handle collisions.
 * The value returned will be the new mapping for the key. It can also throw to abort the collecting of elements.
 *
 * @typeParam K the keys on which collisions are detected.
 * @typeParam V the type of the values

 * @param k The key for which the collision is detected.
 * @param oldValue The current value mapped to the key `k`
 * @param newValue The new value to be mapped to the key `k`
 * @returns The value that should be mapped to the key `k`
 * @throws It can throw to reject the collision and abort the collecting
 */
export type CollisionHandler<K, V> = (k: K, oldValue: V, newValue: V) => V;

/**
 * Function used in `reduce` and `fold` operations.
 * @typeParam A Type of elements being reduced
 * @typeParam B Type into which the elements are being reduced to.
 * @param acc The current value of the accumulator
 * @param a The current value to reduce
 * @example
 * To compute the sum of the length of strings:
 * ```ts
 * const sumLenReducer: Reducer<string, number> = (sum, s) => { sum += s.length; return sum; };
 * ```
 */
export type Reducer<A, B> = BinaryMapper<B, A, B>;

/**
 * A function used to compare objects for ordering. Its return value should satisfy the following properties:
 *
 * - strictly negative if first operand is before (<) second operand
 * - strictly positive if first operand is after (>) second operand
 * - 0 if both operands have same ordering (===)
 *
 * @typeParam A Type of objects to compare.
 * @param a1 The first operand
 * @param a2 The second operand
 * @example
 * To compare string case insensitively:
 * ```ts
 * const ignoreCaseComparator: Comparator<string> = (s1, s2) => {
 *    const l1 = s1.toLowerCase();
 *    const l2 = s2.toLowerCase();
 *    if (l1 < l2) return -1;
 *    if (l1 > l2) return 1;
 *    return 0;
 };
 * ```
 */
export type Comparator<A> = (a1: A, a2: A) => number;

/**
 * An interface used to generate arrays from `length` and `seed`
 * @typeParam E the type of the objects in the generated `Array`
 *
 */
export interface ArrayGenerator<E> {
  /**
   * The number of items to generate.
   */
  length: number;

  /**
   * Generates the entry in the array.
   */
  seed: IteratorLike<E>;
}

/**
 * An object that behaves like an iterator.
 * @typeParam E the type of the objects that can be iterated on
 */
export type IteratorLike<E> = Mapper<number, E> | Iterator<E> | Iterable<E>;

/**
 * An object that can generate an iterator.
 * @typeParam E the type of the objects that can be iterated on
 */
export type IteratorGenerator<E> = ArrayGenerator<E> | IteratorLike<E>;
