import * as SyncGenerators from '../sync';
import * as AsyncIterators from './asyncIterators';
import { Predicate } from '../types';

export function range(start?: number, end?: number, step?: number): AsyncIterableIterator<number> {
  return AsyncIterators.toAsync(SyncGenerators.range(start, end, step));
}

export function repeat<T>(f: (i: number) => T, n?: number): AsyncIterableIterator<T> {
  return AsyncIterators.toAsync(SyncGenerators.repeat(f, n));
}

export function repeatWhile<T>(f: (t: T) => T, seed: T, condition?: Predicate<T>): AsyncIterableIterator<T> {
  return AsyncIterators.toAsync(SyncGenerators.repeatWhile(f, seed, condition));
}

export function doWhile<T>(f: (t: T) => T, seed: T, condition?: Predicate<T>): AsyncIterableIterator<T> {
  return AsyncIterators.toAsync(SyncGenerators.doWhile(f, seed, condition));
}
export function yieldWhile<T>(f: (t: T) => T, seed: T, condition?: Predicate<T>): AsyncIterableIterator<T> {
  return AsyncIterators.toAsync(SyncGenerators.yieldWhile(f, seed, condition));
}

export function doYieldWhile<T>(f: (t: T) => T, seed: T, condition?: Predicate<T>): AsyncIterableIterator<T> {
  return AsyncIterators.toAsync(SyncGenerators.doYieldWhile(f, seed, condition));
}
