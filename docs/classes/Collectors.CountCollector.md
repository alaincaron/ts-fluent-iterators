[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / [Collectors](../modules/Collectors.md) / CountCollector

# Class: CountCollector\<A\>

[Collectors](../modules/Collectors.md).CountCollector

## Type parameters

| Name |
| :------ |
| `A` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `number`\>

## Table of contents

### Constructors

- [constructor](Collectors.CountCollector.md#constructor)

### Properties

- [count](Collectors.CountCollector.md#count)

### Accessors

- [result](Collectors.CountCollector.md#result)

### Methods

- [collect](Collectors.CountCollector.md#collect)

## Constructors

### constructor

• **new CountCollector**\<`A`\>(): [`CountCollector`](Collectors.CountCollector.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Returns

[`CountCollector`](Collectors.CountCollector.md)\<`A`\>

## Properties

### count

• `Private` **count**: `number` = `0`

## Accessors

### result

• `get` **result**(): `number`

#### Returns

`number`

#### Implementation of

Collector.result

## Methods

### collect

▸ **collect**(`_a`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_a` | `A` |

#### Returns

`void`

#### Implementation of

[Collector](../interfaces/Collectors.Collector.md).[collect](../interfaces/Collectors.Collector.md#collect)
