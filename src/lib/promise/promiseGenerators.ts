import * as SyncGenerators from "../sync";
import * as PromiseIterators from "../promise/promiseIterators";
import { Eventually } from "../types";

export function range(start?: number, end?: number, step?: number): Iterator<Promise<number>> {
  return PromiseIterators.toPromise(SyncGenerators.range(start, end, step));
}

export function repeatedly<T>(f: () => Eventually<T>, n?: number): Iterator<Promise<T>> {
  return SyncGenerators.repeatedly(() => Promise.resolve(f()), n);
}

export function iterate<T>(f: (t: T) => Eventually<T>, seed: Eventually<T>, n?: number): Iterator<Promise<T>> {
  return SyncGenerators.iterate((t: Promise<T>) => t.then((x) => f(x)), Promise.resolve(seed), n);
}
