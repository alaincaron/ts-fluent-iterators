[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / [Collectors](../modules/Collectors.md) / MaxCollector

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

### Properties

- [acc](Collectors.MaxCollector.md#acc)
- [comparator](Collectors.MaxCollector.md#comparator)

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
| `comparator` | [`Comparator`](../modules.md#comparator)\<`A`\> | `defaultComparator` |

#### Returns

[`MaxCollector`](Collectors.MaxCollector.md)\<`A`\>

## Properties

### acc

• `Private` **acc**: `undefined` \| `A`

___

### comparator

• `Private` `Readonly` **comparator**: [`Comparator`](../modules.md#comparator)\<`A`\> = `defaultComparator`

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
