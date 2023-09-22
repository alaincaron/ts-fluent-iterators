import * as SyncGenerators from '../sync';
import * as PromiseIterators from '../promise/promiseIterators';
import { Predicate } from '../types';

export function range(start?: number, end?: number, step?: number): IterableIterator<Promise<number>> {
  return PromiseIterators.toPromise(SyncGenerators.range(start, end, step));
}

export function repeat<T>(f: (i: number) => T, n?: number): IterableIterator<Promise<T>> {
  return PromiseIterators.toPromise(SyncGenerators.repeat(f, n));
}

export function repeatWhile<T>(f: (t: T) => T, seed: T, condition?: Predicate<T>): IterableIterator<Promise<T>> {
  return PromiseIterators.toPromise(SyncGenerators.repeatWhile(f, seed, condition));
}

export function doWhile<T>(f: (t: T) => T, seed: T, condition?: Predicate<T>): IterableIterator<Promise<T>> {
  return PromiseIterators.toPromise(SyncGenerators.doWhile(f, seed, condition));
}

export function yieldWhile<T>(f: (t: T) => T, seed: T, condition?: Predicate<T>): IterableIterator<Promise<T>> {
  return PromiseIterators.toPromise(SyncGenerators.yieldWhile(f, seed, condition));
}

export function doYieldWhile<T>(f: (t: T) => T, seed: T, condition?: Predicate<T>): IterableIterator<Promise<T>> {
  return PromiseIterators.toPromise(SyncGenerators.doYieldWhile(f, seed, condition));
}
