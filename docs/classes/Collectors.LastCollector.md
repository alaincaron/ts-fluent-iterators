[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / LastCollector

# Class: LastCollector\<A\>

[Collectors](../modules/Collectors.md).LastCollector

## Type parameters

| Name |
| :------ |
| `A` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `A` \| `undefined`\>

## Table of contents

### Constructors

- [constructor](Collectors.LastCollector.md#constructor)

### Accessors

- [result](Collectors.LastCollector.md#result)

### Methods

- [collect](Collectors.LastCollector.md#collect)

## Constructors

### constructor

• **new LastCollector**\<`A`\>(): [`LastCollector`](Collectors.LastCollector.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Returns

[`LastCollector`](Collectors.LastCollector.md)\<`A`\>

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
