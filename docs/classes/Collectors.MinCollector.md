[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / MinCollector

# Class: MinCollector\<A\>

[Collectors](../modules/Collectors.md).MinCollector

A `Collector` that accepts elements of type `A` and return their minimum or `undefined` if no elements were collected.

**`Example`**

```ts
const c = new MinCollector<string>();
c.collect('foo');
c.collect('bar');
c.result : 'bar'
```

## Type parameters

| Name |
| :------ |
| `A` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `A` \| `undefined`\>

## Table of contents

### Constructors

- [constructor](Collectors.MinCollector.md#constructor)

### Accessors

- [result](Collectors.MinCollector.md#result)

### Methods

- [collect](Collectors.MinCollector.md#collect)

## Constructors

### constructor

• **new MinCollector**\<`A`\>(`comparator?`): [`MinCollector`](Collectors.MinCollector.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `comparator` | [`Comparator`](../README.md#comparator)\<`A`\> | `defaultComparator` | The comparator used to compare elements. Default is natural ordering. |

#### Returns

[`MinCollector`](Collectors.MinCollector.md)\<`A`\>

## Accessors

### result

• `get` **result**(): `undefined` \| `A`

Returns the aggregated object.

#### Returns

`undefined` \| `A`

The aggregated object resulting from collecting all objects

#### Implementation of

Collector.result

## Methods

### collect

▸ **collect**(`a`): `void`

Collects an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `A` | The element being collected. |

#### Returns

`void`

#### Implementation of

[Collector](../interfaces/Collectors.Collector.md).[collect](../interfaces/Collectors.Collector.md#collect)
