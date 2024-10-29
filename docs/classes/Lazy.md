[**ts-fluent-iterators**](../README.md) • **Docs**

---

[ts-fluent-iterators](../README.md) / Lazy

# Class: Lazy\<T\>

Represents a lazy-evaluated value that is computed only when needed.
Lazy

## Type parameters

• **T**

The type of the value.

## Methods

### map()

> **map**\<`R`\>(`mapper`): [`Lazy`](Lazy.md)\<`R`\>

Maps the computed value to a new value using the provided function.

#### Type parameters

• **R**

#### Parameters

• **mapper**: [`Mapper`](../type-aliases/Mapper.md)\<`T`, `R`\>

The function to apply to the computed value.

#### Returns

[`Lazy`](Lazy.md)\<`R`\>

A new instance of Lazy with the transformed value.

#### Param Type

R - The type of the result after applying the function.

---

### value()

> **value**(): `T`

Evaluates and returns the computed value, calculating it only when necessary.

#### Returns

`T`

The computed value.

---

### create()

> `static` **create**\<`T`\>(`provider`): [`Lazy`](Lazy.md)\<`T`\>

Static method to create an instance of `Lazy`.

#### Type parameters

• **T**

The type of the value.

#### Parameters

• **provider**: [`Provider`](../type-aliases/Provider.md)\<`T` \| `Try`\<`T`\>\>

The function representing the lazy provider.

#### Returns

[`Lazy`](Lazy.md)\<`T`\>

An instance of Lazy.
