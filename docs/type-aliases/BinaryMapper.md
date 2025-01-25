[**ts-fluent-iterators**](../README.md)

---

[ts-fluent-iterators](../README.md) / BinaryMapper

# Type Alias: BinaryMapper()\<A, B, C\>

> **BinaryMapper**\<`A`, `B`, `C`\>: (`a`, `b`) => `C`

A function mapping a pair of values of types `A` and `B` to type `C`

## Type Parameters

• **A**

the type of the first operand

• **B**

the type of the second operand

• **C**

## Parameters

### a

`A`

### b

`B`

## Returns

`C`

## Example

```ts
const sum: BinaryMapper<number, number, number> = (a, b) => a + b;
```
