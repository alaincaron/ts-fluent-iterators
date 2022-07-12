export function* range(start?: number, end?: number, step?: number): Iterator<number> {
  if (step === 0) {
    throw new Error(`Invalid value for step: ${step}`);
  }
  start ??= 0;
  let value = start!;
  step ??= end == null || start < end ? 1 : -1;
  if (end == null) {
    for (; ;) {
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

export function* repeatedly<T>(f: () => T, n?: number): Iterator<T> {
  if (n == null) {
    for (; ;) {
      yield f();
    }
  }
  if (n <= 0) return;
  for (let i = 0; i < n; ++i) {
    yield f();
  }
}

export function* applyFunction<T>(f: (t: T) => T, seed: T): Iterator<T> {
  for (; ;) {
    yield seed;
    seed = f(seed);
  }
}

export function* sequence<T>(f: (x: number) => T, start?: number, end?: number, step?: number): Iterator<T> {
  const r = range(start, end, step);
  for (; ;) {
    const item = r.next();
    if (item.done) break;
    yield f(item.value);
  }
}
