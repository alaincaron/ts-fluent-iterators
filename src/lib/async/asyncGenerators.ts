import * as SyncGenerators from "../sync/generators";
import * as AsyncIterators from "../async/asyncIterators";

export function range(start?: number, end?: number, step?: number): AsyncIterator<number> {
  return AsyncIterators.toAsync(SyncGenerators.range(start, end, step));
}

export function repeatedly<T>(f: () => T, n?: number): AsyncIterator<T> {
  return AsyncIterators.toAsync(SyncGenerators.repeatedly(f, n));
}

export function iterate<T>(f: (t: T) => T, seed: T, n?: number): AsyncIterator<T> {
  return AsyncIterators.toAsync(SyncGenerators.iterate(f, seed, n));
}
