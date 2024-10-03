import { BinaryMapper, Mapper, Predicate } from '../utils';

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

export function chain<A, B>(firstMapper: Mapper<A, B>, ...mappers: Mapper<B, B>[]): Mapper<A, B> {
  return (a: A) => mappers.reduce((b, mapper) => mapper(b), firstMapper(a));
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

export function compose_f_gx_hy<T1, R1, T2, R2, R>(
  f: BinaryMapper<R1, R2, R>,
  g: Mapper<T1, R1>,
  h: Mapper<T2, R2>
): BinaryMapper<T1, T2, R> {
  return (t1: T1, t2: T2) => f(g(t1), h(t2));
}

export function compose_f_gx_hx<T, R1, R2, R>(
  f: BinaryMapper<R1, R2, R>,
  g: Mapper<T, R1>,
  h: Mapper<T, R2>
): Mapper<T, R> {
  return (t: T) => f(g(t), h(t));
}

export const alwaysTrue = always(true);
export const alwaysFalse = always(false);
