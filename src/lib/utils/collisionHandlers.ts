function handleCollisionOverwrite<K, V>(_k: K, _oldValue: V, newValue: V): V {
  return newValue;
}

function handleCollisionIgnore<K, V>(_k: K, oldValue: V, _newValue: V): V {
  return oldValue;
}

function handleCollisionThrow<K, V>(k: K, oldValue: V, newValue: V): never {
  throw new Error(`Collision detected: k =${k}, oldValue = ${oldValue}, newValue = ${newValue}`);
}

/**
 * Default collision handlers for `MapCollector`
 * ```
 * - overwrite: new value overwrite existing value
 * - ignore: new value is ignored
 * - reject: an Error is thrown
 * ```
 * @enum
 */
export const CollisionHandlers = {
  overwrite: handleCollisionOverwrite,
  ignore: handleCollisionIgnore,
  reject: handleCollisionThrow,
} as const;
