import * as Iterators from './iterators';
import { Mapper } from '../types';

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

export function loop<T>(f: Mapper<number, T>, start?: number, end?: number, step?: number): IterableIterator<T> {
  return Iterators.map(range(start, end, step), f);
}

export function repeat<T>(f: Mapper<number, T>, count?: number): IterableIterator<T> {
  return Iterators.map(range(0, count, 1), f);
}
