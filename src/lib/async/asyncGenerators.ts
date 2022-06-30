import * as SyncGenerators from "../sync/generators";
import * as AsyncIterators from "../async/asyncIterators";

export async function* range(start?: number, end?: number, step: number = 1): AsyncIterable<number> {
  yield* AsyncIterators.toAsync(SyncGenerators.range(start, end, step));
}
