import * as SyncGenerators from '../sync';
import * as PromiseIterators from '../promise/promiseIterators';
import { Eventually } from '../types';

export function range(start?: number, end?: number, step?: number): IterableIterator<Promise<number>> {
  return PromiseIterators.toPromise(SyncGenerators.range(start, end, step));
}

export function repeat<T>(
  f: (i: number) => Eventually<T>,
  start?: number,
  end?: number,
  step?: number
): IterableIterator<Promise<T>> {
  return PromiseIterators.map(range(start, end, step), f);
}
