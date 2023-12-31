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

function handleCollisionOverwrite<K, V>(_k: K, _oldValue: V, newValue: V): V {
  return newValue;
}

function handleCollisionIgnore<K, V>(_k: K, oldValue: V, _newValue: V): V {
  return oldValue;
}

function handleCollisionThrow<K, V>(k: K, oldValue: V, newValue: V): never {
  throw new Error(`Collision detected: k =${k}, oldValue = ${oldValue}, newValue = ${newValue}`);
}

export const CollisionHandlers = Object.freeze({
  overwrite: handleCollisionOverwrite,
  ignore: handleCollisionIgnore,
  reject: handleCollisionThrow,
});
