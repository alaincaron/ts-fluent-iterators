import * as SyncGenerators from "../sync/generators";
import * as PromiseIterators from "../promise/promiseIterators";
import { Eventually } from "../types";

export function range(start?: number, end?: number, step?: number): Iterator<Promise<number>> {
  return PromiseIterators.toPromise(SyncGenerators.range(start, end, step));
}

export function* applyFunction<T>(f: (t: T) => Eventually<T>, seed: Eventually<T>): Iterator<Promise<T>> {
  let s = Promise.resolve(seed);
  for (; ;) {
    yield s;
    s = s.then(f);
  }
}

export function* sequence<T>(f: (x: number) => Eventually<T>, start?: number, end?: number, step?: number): Iterator<Promise<T>> {
  const r = range(start, end, step);
  for (; ;) {
    const item = r.next();
    if (item.done) break;
    yield item.value.then(f);
  }
}
