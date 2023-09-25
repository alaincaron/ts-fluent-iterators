[ts-fluent-iterators](../../README.md) › [API](../index.md) › [types](../index.md#Types) › [CollisiionHandler](collision_handler.md)

# Type: CollisionHandler<**K**,**V**>

Represents a function specifying how to handle collisions in
MapCollector and ObjectColletor objects.
It receives as parameter the key, the original value and the new
value.  It should return either the original value or the new value,
or throw an exception to indicate a failure.

Definition:

```typescript
type CollisionHandler<K,V> = (k: Key, original_value: V, new_value: V) => V
```

Example:

```typescript
const overwrite: CollisionHandler<K,V> = (_k: K, _original: V, new_value: V) => new_value; 
```
