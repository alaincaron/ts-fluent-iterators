[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Collectors](../README.md) / MinCollector

# Class: MinCollector\<A\>

A `Collector` that accepts elements of type `A` and return their minimum or `undefined` if no elements were collected.

## Example

```ts
const c = new MinCollector<string>();
c.collect('foo');
c.collect('bar');
c.result : 'bar'
```

## Type Parameters

• **A**

## Implements

- [`Collector`](../interfaces/Collector.md)\<`A`, `A` \| `undefined`\>

## Constructors

### new MinCollector()

> **new MinCollector**\<`A`\>(`comparator`): [`MinCollector`](MinCollector.md)\<`A`\>

#### Parameters

• **comparator**: [`Comparator`](../../../type-aliases/Comparator.md)\<`A`\> = `Comparators.natural`

The comparator used to compare elements. Default is natural ordering.

#### Returns

[`MinCollector`](MinCollector.md)\<`A`\>

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
