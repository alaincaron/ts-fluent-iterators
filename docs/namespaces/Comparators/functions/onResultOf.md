[**ts-fluent-iterators**](../../../README.md)

---

[ts-fluent-iterators](../../../README.md) / [Comparators](../README.md) / onResultOf

# Function: onResultOf()

> **onResultOf**\<`A`, `B`\>(`comparator`, `mapper`): [`Comparator`](../../../type-aliases/Comparator.md)\<`A`\>

Returns a comparator that applies a comparator to the result of applying the mapper.

## Type Parameters

• **A**

• **B**

## Parameters

### comparator

[`Comparator`](../../../type-aliases/Comparator.md)\<`B`\>

### mapper

[`Mapper`](../../../type-aliases/Mapper.md)\<`A`, `B`\>

## Returns

[`Comparator`](../../../type-aliases/Comparator.md)\<`A`\>

## Example

```ts
const orderByLen = onResultOf<string, number>(natural, s => s.length);
// comparator to sort string according to their lengths.
```
