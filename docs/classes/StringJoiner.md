[**ts-fluent-iterators**](../README.md)

---

[ts-fluent-iterators](../README.md) / StringJoiner

# Class: StringJoiner\<A\>

A `Collector` that accepts elements of type `A` and returns a `string`

## Example

```ts
const c = new StringJoiner<string>(', ', '[', ']');
c.collect('foo');
c.collect('bar');
c.collect('baz');
// c.result : [foo, bar, baz]
```

## Type Parameters

### A

`A`

The type of the elements being accepted.

## Implements

- [`Collector`](../interfaces/Collector.md)\<`A`, `string`\>

## Constructors

### Constructor

> **new StringJoiner**\<`A`\>(`separator`, `prefix`, `suffix`): `StringJoiner`\<`A`\>

#### Parameters

##### separator

`string` = `','`

separator between elements.

##### prefix

`string` = `''`

prefix of the joined string.

##### suffix

`string` = `''`

suffix of the joined string.

#### Returns

`StringJoiner`\<`A`\>

## Accessors

### result

#### Get Signature

> **get** **result**(): `string`

Returns the aggregated object.

##### Returns

`string`

The aggregated object resulting from collecting all objects

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`result`](../interfaces/Collector.md#result)

## Methods

### collect()

> **collect**(`a`): `void`

Collects an element.

#### Parameters

##### a

`A`

The element being collected.

#### Returns

`void`

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`collect`](../interfaces/Collector.md#collect)
