[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / [Collectors](../modules/Collectors.md) / SetCollector

# Class: SetCollector\<A\>

[Collectors](../modules/Collectors.md).SetCollector

## Type parameters

| Name |
| :------ |
| `A` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `Set`\<`A`\>\>

## Table of contents

### Constructors

- [constructor](Collectors.SetCollector.md#constructor)

### Properties

- [acc](Collectors.SetCollector.md#acc)

### Accessors

- [result](Collectors.SetCollector.md#result)

### Methods

- [collect](Collectors.SetCollector.md#collect)

## Constructors

### constructor

• **new SetCollector**\<`A`\>(): [`SetCollector`](Collectors.SetCollector.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Returns

[`SetCollector`](Collectors.SetCollector.md)\<`A`\>

## Properties

### acc

• `Private` `Readonly` **acc**: `Set`\<`A`\>

## Accessors

### result

• `get` **result**(): `Set`\<`A`\>

#### Returns

`Set`\<`A`\>

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
