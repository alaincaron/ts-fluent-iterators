[**ts-fluent-iterators**](../README.md) • **Docs**

---

[ts-fluent-iterators](../README.md) / BinaryMapper

# Type alias: BinaryMapper()\<A, B, C\>

> **BinaryMapper**\<`A`, `B`, `C`\>: (`a`, `b`) => `C`

A function mapping a pair of values of types `A` and `B` to type `C`

## Example

```ts
const sum: BinaryMapper<number, number, number> = (a, b) => a + b;
```

## Type parameters

• **A**

the type of the first operand

• **B**

the type of the second operand

• **C**

## Parameters

• **a**: `A`

• **b**: `B`

## Returns

`C`
