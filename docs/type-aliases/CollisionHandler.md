[**ts-fluent-iterators**](../README.md) • **Docs**

---

[ts-fluent-iterators](../README.md) / CollisionHandler

# Type Alias: CollisionHandler()\<K, V\>

> **CollisionHandler**\<`K`, `V`\>: (`k`, `oldValue`, `newValue`) => `V`

A collision handler for collectors. Used by `Collectors` `MapCollector` and `ObjectCollector` to handle collisions.
The value returned will be the new mapping for the key. It can also throw to abort the collecting of elements.

## Type Parameters

• **K**

the keys on which collisions are detected.

• **V**

the type of the values

## Parameters

• **k**: `K`

The key for which the collision is detected.

• **oldValue**: `V`

The current value mapped to the key `k`

• **newValue**: `V`

The new value to be mapped to the key `k`

## Returns

`V`

The value that should be mapped to the key `k`

## Throws

It can throw to reject the collision and abort the collecting
