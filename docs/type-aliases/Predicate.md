[**ts-fluent-iterators**](../README.md) • **Docs**

---

[ts-fluent-iterators](../README.md) / Predicate

# Type alias: Predicate\<A\>

> **Predicate**\<`A`\>: [`Mapper`](Mapper.md)\<`A`, `boolean`\>

A predicate on a value.

## Example

```ts
const lengthGreaterThanFive: Predicate<string> = s => s.length > 5;
```

## Type parameters

• **A**

the type of values on which the predicate is to be evaluated.
