[**ts-fluent-iterators**](../README.md)

---

[ts-fluent-iterators](../README.md) / Predicate

# Type Alias: Predicate\<A\>

> **Predicate**\<`A`\>: [`Mapper`](Mapper.md)\<`A`, `boolean`\>

A predicate on a value.

## Type Parameters

• **A**

the type of values on which the predicate is to be evaluated.

## Example

```ts
const lengthGreaterThanFive: Predicate<string> = s => s.length > 5;
```
