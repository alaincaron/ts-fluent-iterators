[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / MaxCollector

# Class: MaxCollector\<A\>

[Collectors](../modules/Collectors.md).MaxCollector

A `Collector` that accepts elements of type `A` and return their maximum or `undefined` if no elements were collected.

**`Example`**

```ts
const c = new MaxCollector<string>();
c.collect('foo');
c.collect('bar');
c.result : 'foo'
```

## Type parameters

| Name |
| :------ |
| `A` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `A` \| `undefined`\>

## Table of contents

### Constructors

- [constructor](Collectors.MaxCollector.md#constructor)

### Accessors

- [result](Collectors.MaxCollector.md#result)

### Methods

- [collect](Collectors.MaxCollector.md#collect)

## Constructors

### constructor

• **new MaxCollector**\<`A`\>(`comparator?`): [`MaxCollector`](Collectors.MaxCollector.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `comparator` | [`Comparator`](../README.md#comparator)\<`A`\> | `defaultComparator` | The comparator used to compare elements. Default is natural ordering. |

#### Returns

[`MaxCollector`](Collectors.MaxCollector.md)\<`A`\>

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
