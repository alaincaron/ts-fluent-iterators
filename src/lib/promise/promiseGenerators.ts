import * as SyncGenerators from "../sync/generators";
import * as PromiseIterators from "../promise/promiseIterators";

export function* range(start?: number, end?: number, step: number = 1): Iterable<Promise<number>> {
  yield* PromiseIterators.toPromise(SyncGenerators.range(start, end, step));
}
