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

export function* repeatedly<T>(f: () => T, n?: number): IterableIterator<T> {
  if (n == null) {
    for (;;) {
      yield f();
    }
  }
  if (n <= 0) return;
  for (let i = 0; i < n; ++i) {
    yield f();
  }
}

export function* iterate<T>(f: (t: T) => T, seed: T, n?: number): IterableIterator<T> {
  if (n == null) {
    yield seed;
    for (;;) {
      seed = f(seed);
      yield seed;
    }
  }
  if (n <= 0) return;
  yield seed;
  for (let i = 1; i < n; ++i) {
    seed = f(seed);
    yield seed;
  }
}
