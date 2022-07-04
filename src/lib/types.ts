export type Eventually<A> = A | Promise<A>;
export type Mapper<A, B> = (a: A) => B;
export type EventualMapper<A, B> = Mapper<A, Eventually<B>>;
export type Predicate<A> = Mapper<A, boolean>;
export type EventualPredicate<A> = Mapper<A, Eventually<boolean>>;
export type Reducer<A, B> = (acc: B, a: A) => B;
export type EventualReducer<A, B> = (acc: B, a: A) => Eventually<B>;
export type Comparator<A> = (a1: A, a2: A) => number;
