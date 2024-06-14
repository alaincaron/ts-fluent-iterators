[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Comparators](../README.md) / orderBy

# Function: orderBy()

> **orderBy**\<`A`\>(`mapper`): [`Comparator`](../../../type-aliases/Comparator.md)\<`A`\>

A comparator that sorts the elements based on the natural order of the mappers.

## Type parameters

• **A**

## Parameters

• **mapper**: [`Mapper`](../../../type-aliases/Mapper.md)\<`A`, `number`\>

## Returns

[`Comparator`](../../../type-aliases/Comparator.md)\<`A`\>

## Example

```ts
const orderByLen = orderBy<string>(s => s.length);
// comparator to sort string according to their lengths.
```
