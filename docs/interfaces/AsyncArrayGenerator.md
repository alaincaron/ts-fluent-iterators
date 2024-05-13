[ts-fluent-iterators](../README.md) / AsyncArrayGenerator

# Interface: AsyncArrayGenerator\<E\>

An interface used to asynchronously generate arrays from `length` and `seed`

## Type parameters

| Name | Description                                      |
| :--- | :----------------------------------------------- |
| `E`  | the type of the objects in the generated `Array` |

## Table of contents

### Properties

- [length](AsyncArrayGenerator.md#length)
- [seed](AsyncArrayGenerator.md#seed)

## Properties

### length

• **length**: `number`

The number of items to generate.

---

### seed

• **seed**: [`AsyncIteratorLike`](../README.md#asynciteratorlike)\<`E`\>

Generates the entry in the array.
