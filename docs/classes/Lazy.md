[**ts-fluent-iterators**](../README.md)

---

[ts-fluent-iterators](../README.md) / Lazy

# Class: Lazy\<T\>

Represents a lazy-evaluated value that is computed only when needed.
Lazy

## Type Parameters

### T

`T`

The type of the value.

## Methods

### map()

> **map**\<`R`\>(`mapper`): `Lazy`\<`R`\>

Maps the computed value to a new value using the provided function.

#### Type Parameters

##### R

`R`

The type of the result after applying the function.

#### Parameters

##### mapper

[`Mapper`](../type-aliases/Mapper.md)\<`T`, `R`\>

The function to apply to the computed value.

#### Returns

`Lazy`\<`R`\>

A new instance of Lazy with the transformed value.

---

### value()

> **value**(): `T`

Evaluates and returns the computed value, calculating it only when necessary.

#### Returns

`T`

The computed value.

---

### create()

> `static` **create**\<`T`\>(`provider`): `Lazy`\<`T`\>

Static method to create an instance of `Lazy`.

#### Type Parameters

##### T

`T`

The type of the value.

#### Parameters

##### provider

[`Provider`](../type-aliases/Provider.md)\<`T` \| `Try`\<`T`\>\>

The function representing the lazy provider.

#### Returns

`Lazy`\<`T`\>

An instance of Lazy.
