[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / MaxCollector

# Class: MaxCollector\<A\>

[Collectors](../modules/Collectors.md).MaxCollector

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

| Name | Type | Default value |
| :------ | :------ | :------ |
| `comparator` | [`Comparator`](../README.md#comparator)\<`A`\> | `defaultComparator` |

#### Returns

[`MaxCollector`](Collectors.MaxCollector.md)\<`A`\>

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
