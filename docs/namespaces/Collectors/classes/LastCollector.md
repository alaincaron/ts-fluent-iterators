[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Collectors](../README.md) / LastCollector

# Class: LastCollector\<A\>

A `Collector` that accepts elements of type `A` and return the last element collected or `undefined` if no elements were collected.

## Example

```ts
const c = new LastCollector();
c.collect('foo');
c.collect('bar');
c.collect('baz')
c.result : 'baz'
```

## Type Parameters

• **A** = `unknown`

## Implements

- [`Collector`](../interfaces/Collector.md)\<`A`, `A` \| `undefined`\>

## Accessors

### result

#### Get Signature

> **get** **result**(): `undefined` \| `A`

Returns the aggregated object.

##### Returns

`undefined` \| `A`

The aggregated object resulting from collecting all objects

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`result`](../interfaces/Collector.md#result)

## Methods

### collect()

> **collect**(`a`): `void`

Collects an element.

#### Parameters

• **a**: `A`

The element being collected.

#### Returns

`void`

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`collect`](../interfaces/Collector.md#collect)
