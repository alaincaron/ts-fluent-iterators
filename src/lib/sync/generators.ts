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
