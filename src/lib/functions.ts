export const identity = <A>(a: A) => a;
export const asyncIdentity = <A>(a: A) => Promise.resolve(a);
export const alwaysTrue = <A>(_: A) => true;
export const alwaysFalse = <A>(_: A) => false;
export const asyncAlwaysTrue = <A>(_: A) => Promise.resolve(true);
export const asyncAlwaysFalse = <A>(_: A) => Promise.resolve(false);

export function defaultComparator<A>(a1: A, a2: A) {
  if (a1 < a2) return -1;
  if (a1 > a2) return 1;
  return 0;
}

export const lengthComparator = (a: { length: number }, b: { length: number }) => defaultComparator(a.length, b.length);
