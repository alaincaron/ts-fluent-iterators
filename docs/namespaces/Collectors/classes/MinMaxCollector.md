[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Collectors](../README.md) / MinMaxCollector

# Class: MinMaxCollector\<A\>

A `Collector` that accepts elements of type `A` and return their minimum and maximum elements or `undefined` if no elements were collected.

## Example

```ts
const c = new MinMaxCollector<string>();
c.collect('foo');
c.collect('bar');
c.collect('baz')
c.result : { min: 'bar', max: 'foo' }
```

## Type Parameters

• **A**

## Implements

- [`Collector`](../interfaces/Collector.md)\<`A`, [`MinMax`](../../../interfaces/MinMax.md)\<`A`\> \| `undefined`\>

## Constructors

### new MinMaxCollector()

> **new MinMaxCollector**\<`A`\>(`comparator`): [`MinMaxCollector`](MinMaxCollector.md)\<`A`\>

#### Parameters

• **comparator**: [`Comparator`](../../../type-aliases/Comparator.md)\<`A`\> = `Comparators.natural`

The comparator used to compare elements. Default is natural ordering.

#### Returns

[`MinMaxCollector`](MinMaxCollector.md)\<`A`\>

## Accessors

### result

#### Get Signature

> **get** **result**(): `undefined` \| [`MinMax`](../../../interfaces/MinMax.md)\<`A`\>

Returns the aggregated object.

##### Returns

`undefined` \| [`MinMax`](../../../interfaces/MinMax.md)\<`A`\>

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
