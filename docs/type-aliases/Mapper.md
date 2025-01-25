[**ts-fluent-iterators**](../README.md)

---

[ts-fluent-iterators](../README.md) / Mapper

# Type Alias: Mapper()\<A, B\>

> **Mapper**\<`A`, `B`\>: (`a`) => `B`

A function mapping a value of type `A` to type `B`

## Type Parameters

• **A**

the source type on which the `Mapper` is applied.

• **B**

the target type

## Parameters

### a

`A`

## Returns

`B`

## Example

```ts
const strlen: Mapper<string, number> = s => s.length;
```
