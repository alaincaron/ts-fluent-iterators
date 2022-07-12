import * as SyncGenerators from "../sync/generators";
import * as AsyncIterators from "../async/asyncIterators";

export function range(start?: number, end?: number, step?: number): AsyncIterator<number> {
  return AsyncIterators.toAsync(SyncGenerators.range(start, end, step));
}

export async function* applyFunction<T>(f: (t: T) => T, seed: T): AsyncIterator<T> {
  for (; ;) {
    yield seed;
    seed = f(seed);
  }
}

export async function* sequence<T>(f: (x: number) => T, start?: number, end?: number, step?: number): AsyncIterator<T> {
  const r = range(start, end, step);
  for (; ;) {
    const item = await r.next();
    if (item.done) break;
    yield f(item.value);
  }
}
