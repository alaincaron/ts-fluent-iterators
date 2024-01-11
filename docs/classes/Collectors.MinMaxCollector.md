[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / MinMaxCollector

# Class: MinMaxCollector\<A\>

[Collectors](../modules/Collectors.md).MinMaxCollector

## Type parameters

| Name |
| :------ |
| `A` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, [`MinMax`](../interfaces/MinMax.md)\<`A`\> \| `undefined`\>

## Table of contents

### Constructors

- [constructor](Collectors.MinMaxCollector.md#constructor)

### Accessors

- [result](Collectors.MinMaxCollector.md#result)

### Methods

- [collect](Collectors.MinMaxCollector.md#collect)

## Constructors

### constructor

• **new MinMaxCollector**\<`A`\>(`comparator?`): [`MinMaxCollector`](Collectors.MinMaxCollector.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `comparator` | [`Comparator`](../README.md#comparator)\<`A`\> | `defaultComparator` |

#### Returns

[`MinMaxCollector`](Collectors.MinMaxCollector.md)\<`A`\>

## Accessors

### result

• `get` **result**(): `undefined` \| [`MinMax`](../interfaces/MinMax.md)\<`A`\>

#### Returns

`undefined` \| [`MinMax`](../interfaces/MinMax.md)\<`A`\>

#### Implementation of

Collector.result

## Methods

### collect

▸ **collect**(`a`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

#### Returns

`void`

#### Implementation of

[Collector](../interfaces/Collectors.Collector.md).[collect](../interfaces/Collectors.Collector.md#collect)
