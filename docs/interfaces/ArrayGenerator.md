[ts-fluent-iterators](../README.md) / ArrayGenerator

# Interface: ArrayGenerator\<E\>

An interface used to generate arrays from `length` and `seed`

## Type parameters

| Name | Description                                      |
| :--- | :----------------------------------------------- |
| `E`  | the type of the objects in the generated `Array` |

## Table of contents

### Properties

- [length](ArrayGenerator.md#length)
- [seed](ArrayGenerator.md#seed)

## Properties

### length

• **length**: `number`

The number of items to generate.

---

### seed

• **seed**: [`IteratorLike`](../README.md#iteratorlike)\<`E`\>

Generates the entry in the array.
