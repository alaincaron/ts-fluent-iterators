import * as SyncGenerators from '../sync';
import * as AsyncIterators from './asyncIterators';
import { EventualMapper } from '../types';

export function range(start?: number, end?: number, step?: number): AsyncIterableIterator<number> {
  return AsyncIterators.toAsync(SyncGenerators.range(start, end, step));
}

export function repeat<T>(
  f: EventualMapper<number, T>,
  start?: number,
  end?: number,
  step?: number
): AsyncIterableIterator<T> {
  return AsyncIterators.map(range(start, end, step), f);
}
