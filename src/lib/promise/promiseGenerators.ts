import * as SyncGenerators from "../sync/generators";
import * as PromiseIterators from "../promise/promiseIterators";

export function range(start?: number, end?: number, step?: number): Iterator<Promise<number>> {
  return PromiseIterators.toPromise(SyncGenerators.range(start, end, step));
}
