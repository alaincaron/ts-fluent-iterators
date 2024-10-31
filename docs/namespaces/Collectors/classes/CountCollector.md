[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Collectors](../README.md) / CountCollector

# Class: CountCollector\<A\>

A `Collector` that accepts elements of type `A` and return the number of elements collected.

## Example

```ts
const c = new CountCollector();
c.collect('foo');
c.collect('bar');
c.collect('baz')
c.result : 3
```

## Type Parameters

• **A** = `unknown`

## Implements

- [`Collector`](../interfaces/Collector.md)\<`A`, `number`\>

## Accessors

### result

> `get` **result**(): `number`

Returns the aggregated object.

#### Returns

`number`

The aggregated object resulting from collecting all objects

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`result`](../interfaces/Collector.md#result)

## Methods

### collect()

> **collect**(`_a`): `void`

Collects an element.

#### Parameters

• **\_a**: `A`

#### Returns

`void`

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`collect`](../interfaces/Collector.md#collect)
