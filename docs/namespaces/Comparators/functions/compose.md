[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Comparators](../README.md) / compose

# Function: compose()

> **compose**\<`A`, `B`\>(`comparator`, `mapper`): [`Comparator`](../../../type-aliases/Comparator.md)\<`A`\>

Returns a comparator that applies a comparator to the elements after they'be mapped by a mapper.

## Type parameters

• **A**

• **B**

## Parameters

• **comparator**: [`Comparator`](../../../type-aliases/Comparator.md)\<`B`\>

• **mapper**: [`Mapper`](../../../type-aliases/Mapper.md)\<`A`, `B`\>

## Returns

[`Comparator`](../../../type-aliases/Comparator.md)\<`A`\>

## Example

```ts
const orderByLen = compose<string, number>(natural, s => s.length);
// comparator to sort string according to their lengths.
```
