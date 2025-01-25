[**ts-fluent-iterators**](../../../README.md)

---

[ts-fluent-iterators](../../../README.md) / [Comparators](../README.md) / byMapper

# Function: byMapper()

> **byMapper**\<`A`, `B`\>(`mapper`): [`Comparator`](../../../type-aliases/Comparator.md)\<`A`\>

A comparator that sorts the elements based on the natural order of the mappers.

## Type Parameters

• **A**

• **B**

## Parameters

### mapper

[`Mapper`](../../../type-aliases/Mapper.md)\<`A`, `B`\>

## Returns

[`Comparator`](../../../type-aliases/Comparator.md)\<`A`\>

## Example

```ts
const orderByLen = byMapper<string>(s => s.length);
// comparator to sort string according to their lengths.
```
