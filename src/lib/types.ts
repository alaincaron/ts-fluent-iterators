export type Eventually<A> = A | Promise<Awaited<A>>;
export type Mapper<A, B> = (a: A) => B;
export type EventualMapper<A, B> = Mapper<A, Eventually<B>>;
export type Predicate<A> = Mapper<A, boolean>;
export type CollisionHandler<K, V> = (k: K, oldValue: V, newValue: V) => V;
export type EventualPredicate<A> = Mapper<A, Eventually<boolean>>;
export type Reducer<A, B> = (acc: B, a: A) => B;
export type EventualReducer<A, B> = (acc: B, a: A) => Eventually<B>;
export type Comparator<A> = (a1: A, a2: A) => number;
export type EventualIterator<A> = Iterator<A> | AsyncIterator<A>;
export type EventualIterable<A> = Iterable<A> | AsyncIterable<A>;
export type EventualIterableIterator<A> = IterableIterator<A> | AsyncIterableIterator<A>;

export interface MinMax<A> {
  min?: A;
  max?: A;
}

export interface AvgState {
  avg: number;
  n: number;
}

export interface SumState {
  sum: number;
  correction: number;
}

export interface ArrayGenerator<E> {
  length: number;
  seed: IteratorLike<E>;
}

export type IteratorLike<E> = ((i: number) => E) | Iterator<E> | Iterable<E>;
export type IteratorGenerator<E> = ArrayGenerator<E> | IteratorLike<E>;

export interface AsyncArrayGenerator<E> {
  length: number;
  seed: AsyncIteratorLike<E>;
}

export type AsyncIteratorLike<E> = ((i: number) => Promise<E>) | AsyncIterator<E> | AsyncIterable<E>;
export type AsyncIteratorGenerator<E> = AsyncArrayGenerator<E> | AsyncIteratorLike<E>;

export type EventualIteratorGenerator<E> = IteratorGenerator<E> | AsyncGenerator<E>;
