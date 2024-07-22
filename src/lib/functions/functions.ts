import { Mapper, Predicate } from '../types';

const IDENTITY = (x: unknown) => x;
export function identity<T>(): Mapper<T, T> {
  return IDENTITY as Mapper<T, T>;
}

export function compose<T, R, V>(f: Mapper<T, R>, g: Mapper<R, V>): Mapper<T, V> {
  return (t: T) => g(f(t));
}

export function ifElse<T, A, B>(
  predicate: Predicate<T>,
  ifClause: Mapper<T, A>,
  elseClause: Mapper<T, B>
): Mapper<T, A | B> {
  return (t: T) => (predicate(t) ? ifClause(t) : elseClause(t));
}

export function chain<T>(...mappers: Mapper<T, T>[]): Mapper<T, T> {
  return (t: T) => mappers.reduce((t, mapper) => mapper(t), t);
}

export function when<T, A>(...clauses: [Predicate<T>, Mapper<T, A>][]): Mapper<T, A | undefined> {
  return (t: T) => {
    for (const [condition, f] of clauses) {
      if (condition(t)) return f(t);
    }
    return undefined;
  };
}

export function tap<T>(f: Mapper<T, any>): Mapper<T, T> {
  return (t: T) => {
    f(t);
    return t;
  };
}

export function always<T, R>(r: R): Mapper<T, R> {
  return _ => r;
}
