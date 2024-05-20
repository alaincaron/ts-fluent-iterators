[**ts-fluent-iterators**](../README.md) • **Docs**

---

[ts-fluent-iterators](../README.md) / EventualReducer

# Type alias: EventualReducer()\<A, B\>

> **EventualReducer**\<`A`, `B`\>: (`acc`, `a`) => [`Eventually`](Eventually.md)\<`B`\>

An eventual `Reducer`. Used for asynchronous `fold` and `reduce` operations.

## Type parameters

• **A**

Type of elements being reduced

• **B**

Type into which the elements are being reduced to.

## Parameters

• **acc**: `B`

The current value of the accumulator

• **a**: `A`

The current value to reduce

## Returns

[`Eventually`](Eventually.md)\<`B`\>
