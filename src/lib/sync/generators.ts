import * as Iterators from './iterators';
import { Mapper } from '../types';

/**
 *  Returns an iterator from `start` (inclusively) to `end` (exclusively) by increment of `step`.
 *  @param start the start of the range.  Defaults to 0.
 *  @param end the end of the range. Defaults to infinity.
 *  @param step increment in the range. Defaults to 1 if `end` > `start`, -1 otherwise.
 *
 * @returns A new iterator for the range [`start`,`end`[ by increment of `step`.
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
 * This is equivalent to
 * ```ts
 *   for (const v of range(start, end, step)) yield f(v)
 * ```
 * @param f The function to apply on each element of the range.
 * @param start the start of the range.  Defaults to 0.
 * @param end the end of the range. Defaults to infinity.
 * @param step increment in the range. Defaults to 1 if `end` > `start`, -1 otherwise.
 *
 *
 * @returns A new iterator resulting from apply f on all elements in the [`start`,`end`[ range by increment of `step`.
 */
export function loop<T>(f: Mapper<number, T>, start?: number, end?: number, step?: number): IterableIterator<T> {
  return Iterators.map(range(start, end, step), f);
}

/**
 * Returns an iterator resulting from applying f on all elements of the range [0,`count`]
 * from `start` (inclusively) to `end` (exclusively) by increment of `step`.
 *
 * This is equivalent to
 * ```ts
 *   loop(f,0,count,1)
 * ```
 *
 * @param f The function to apply on each element of the range.
 * @param count the numbe of times f should be invoked.
 *
 * @returns A new iterator resulting from apply f on all elements in the [`start`,`end`[ range by increment of `step`.
 */
export function repeat<T>(f: Mapper<number, T>, count?: number): IterableIterator<T> {
  return Iterators.map(range(0, count, 1), f);
}
