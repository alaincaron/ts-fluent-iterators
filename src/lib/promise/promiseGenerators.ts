export function* range(start?: number, end?: number, step: number = 1): Iterable<Promise<number>> {
  if (start === undefined) return;
  if (step === 0) {
    throw new Error(`Invalid value for step: ${step}`);
  }
  let value = start!;
  if (end == null) {
    for (; ;) {
      yield Promise.resolve(value);
      value += step;
    }
  } else if (step > 0) {
    while (value < end) {
      yield Promise.resolve(value);
      value += step;
    }
  } else {
    while (value > end) {
      yield Promise.resolve(value);
      value += step;
    }
  }
}
