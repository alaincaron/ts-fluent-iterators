import * as SyncGenerators from "../sync/generators";
import * as AsyncIterators from "../async/asyncIterators";

export function range(start?: number, end?: number, step: number = 1): AsyncIterator<number> {
  return AsyncIterators.toAsync(SyncGenerators.range(start, end, step));
}
