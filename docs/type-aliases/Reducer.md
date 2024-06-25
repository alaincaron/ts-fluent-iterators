[**ts-fluent-iterators**](../README.md) • **Docs**

---

[ts-fluent-iterators](../README.md) / Reducer

# Type alias: Reducer\<A, B\>

> **Reducer**\<`A`, `B`\>: [`BinaryOperator`](BinaryOperator.md)\<`B`, `A`, `B`\>

Function used in `reduce` and `fold` operations.

## Param

The current value of the accumulator

## Param

The current value to reduce

## Example

To compute the sum of the length of strings:

```ts
const sumLenReducer: Reducer<string, number> = (sum, s) => {
  sum += s.length;
  return sum;
};
```

## Type parameters

• **A**

Type of elements being reduced

• **B**

Type into which the elements are being reduced to.
