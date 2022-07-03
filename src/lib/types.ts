export type Mapper<A, B> = (a: A) => B;
export type Eventually<A> = A | Promise<A>;
export type Predicate<A> = Mapper<A, boolean>;
export type EventualPredicate<A> = Mapper<A, Eventually<boolean>>;
export type EventualMapper<A, B> = Mapper<A, Eventually<B>>;
export type Reducer<A, B> = (acc: B, a: A) => B;
export type EventualReducer<A, B> = (acc: B, a: A) => Eventually<B>;

export const identity = <A>(a: A) => a;
export const asyncIdentity = <A>(a: A) => Promise.resolve(a);
export const alwaysTrue = <A>(_: A) => true;
export const alwaysFalse = <A>(_: A) => false;
export const asyncAlwaysTrue = <A>(_: A) => Promise.resolve(true);
export const asyncAlwaysFalse = <A>(_: A) => Promise.resolve(false);
