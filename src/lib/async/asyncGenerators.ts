import * as AsyncIterators from './asyncIterators';
import * as SyncGenerators from '../sync';
import { EventualMapper } from '../types';

export function range(start?: number, end?: number, step?: number): AsyncIterableIterator<number> {
  return AsyncIterators.toAsync(SyncGenerators.range(start, end, step));
}

export function loop<T>(
  f: EventualMapper<number, T>,
  start?: number,
  end?: number,
  step?: number
): AsyncIterableIterator<T> {
  return AsyncIterators.map(range(start, end, step), f);
}

export function repeat<T>(f: EventualMapper<number, T>, count?: number): AsyncIterableIterator<T> {
  return AsyncIterators.map(range(0, count, 1), f);
}
