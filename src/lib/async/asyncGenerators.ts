import * as SyncGenerators from "../sync/generators";
import * as AsyncIterators from "../async/asyncIterators";

export function range(start?: number, end?: number, step?: number): AsyncIterator<number> {
  return AsyncIterators.toAsync(SyncGenerators.range(start, end, step));
}
