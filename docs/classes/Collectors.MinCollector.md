[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / [Collectors](../modules/Collectors.md) / MinCollector

# Class: MinCollector\<A\>

[Collectors](../modules/Collectors.md).MinCollector

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

| Name | Type | Default value |
| :------ | :------ | :------ |
| `comparator` | [`Comparator`](../modules.md#comparator)\<`A`\> | `defaultComparator` |

#### Returns

[`MinCollector`](Collectors.MinCollector.md)\<`A`\>

## Accessors

### result

• `get` **result**(): `undefined` \| `A`

#### Returns

`undefined` \| `A`

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
