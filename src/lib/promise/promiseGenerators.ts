import * as PromiseIterators from '../promise/promiseIterators';
import * as SyncGenerators from '../sync/generators';
import { EventualMapper } from '../types';

export function range(start?: number, end?: number, step?: number): IterableIterator<Promise<number>> {
  return PromiseIterators.toPromise(SyncGenerators.range(start, end, step));
}

export function loop<T>(
  f: EventualMapper<number, T>,
  start?: number,
  end?: number,
  step?: number
): IterableIterator<Promise<T>> {
  return PromiseIterators.map(range(start, end, step), f);
}

export function repeat<T>(f: EventualMapper<number, T>, count?: number): IterableIterator<Promise<T>> {
  return PromiseIterators.map(range(0, count, 1), f);
}
