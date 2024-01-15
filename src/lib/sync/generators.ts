import * as Iterators from './iterators';
import { Mapper } from '../types';

/**
 *  Returns an `IterableIterator` from `start` (inclusively) to `end` (exclusively) by increment of `step`.
 *  @param start the start of the range.  Defaults to 0.
 *  @param end the end of the range. Defaults to infinity.
 *  @param step increment in the range. Defaults to 1 if `end` > `start`, -1 otherwise.
 *
 * @returns A new iterator for the range [`start`,`end`[ by increment of `step`.
 * @example
 * range(1, 100, 2)
 * // yields 1, 3, 5, 7, ..., 99
 */
export function* range(start?: number, end?: number, step?: number): IterableIterator<number> {
  if (step === 0) {
    throw new Error(`Invalid value for step: ${step}`);
  }
  start ??= 0;
  let value = start;
  step ??= end == null || start < end ? 1 : -1;
  if (end == null) {
    for (;;) {
      yield value;
      value += step;
    }
  } else if (step > 0) {
    while (value < end) {
      yield value;
      value += step;
    }
  } else {
    while (value > end) {
      yield value;
      value += step;
    }
  }
}

/**
 * Returns an iterator resulting from applying f on all elements of the range
 * from `start` (inclusively) to `end` (exclusively) by increment of `step`.
 *
 * @param f The function to apply on each element of the range.
 * @param start the start of the range.  Defaults to 0.
 * @param end the end of the range. Defaults to infinity.
 * @param step increment in the range. Defaults to 1 if `end` > `start`, -1 otherwise.
 *
 *
 * @returns A new iterator resulting from apply f on all elements in the [`start`,`end`[ range by increment of `step`.
 * @example
 * loop(x => 2 * x, 1, 100, 2)
 * // yields 2, 6, 10, ..., 198
 * @remarks
 * ```ts
 * for (const v of loop(f, start, end, step)) yield v;
 * ```
 * is equivalent to
 * ```ts
 * for (const v of range(start, end, step)) yield f(v);
 * ```
 */
export function loop<T>(f: Mapper<number, T>, start?: number, end?: number, step?: number): IterableIterator<T> {
  return Iterators.map(range(start, end, step), f);
}

/**
 * Returns an iterator resulting from applying f on all elements of the range [0,`count`]
 * from `start` (inclusively) to `end` (exclusively) by increment of `step`.
 *
 * @param f The function to apply on each element of the range.
 * @param count the numbe of times f should be invoked.
 *
 * @returns A new iterator resulting from apply f on all elements in the [`start`,`end`[ range by increment of `step`.
 * @example
 * repeat(x => x * 2, 10)
 * // yields 0, 2, 4, ..., 18
 * @remarks
 * ```ts
 * for (const v of repeat(f, count)) yield v;
 * ```
 * is equivalent to
 * ```ts
 * for (const v of range(0, count, 1)) yield f(v);
 * ```
 */
export function repeat<T>(f: Mapper<number, T>, count?: number): IterableIterator<T> {
  return Iterators.map(range(0, count, 1), f);
}
