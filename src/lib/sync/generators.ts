import { alwaysTrue } from '../functions';
import { Predicate } from '../types';

export function* range(start?: number, end?: number, step?: number): IterableIterator<number> {
  if (step === 0) {
    throw new Error(`Invalid value for step: ${step}`);
  }
  start ??= 0;
  let value = start!;
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

export function* repeat<T>(f: (i: number) => T, n?: number): IterableIterator<T> {
  if (n == null) {
    for (let i = 0; ; ++i) yield f(i);
  } else if (n > 0) {
    for (let i = 0; i < n; ++i) yield f(i);
  }
}

export function* yieldWhile<T>(f: (t: T) => T, seed: T, condition?: Predicate<T>): IterableIterator<T> {
  condition ??= alwaysTrue;
  while (condition(seed)) {
    yield seed;
    seed = f(seed);
  }
}

export function* repeatWhile<T>(f: (t: T) => T, seed: T, condition?: Predicate<T>): IterableIterator<T> {
  condition ??= alwaysTrue;
  while (condition(seed)) {
    seed = f(seed);
    yield seed;
  }
}

export function* doWhile<T>(f: (t: T) => T, seed: T, condition?: Predicate<T>): IterableIterator<T> {
  condition ??= alwaysTrue;
  do {
    seed = f(seed);
    yield seed;
  } while (condition(seed));
}

export function* doYieldWhile<T>(f: (t: T) => T, seed: T, condition?: Predicate<T>): IterableIterator<T> {
  condition ??= alwaysTrue;
  do {
    yield seed;
    seed = f(seed);
  } while (condition(seed));
}
