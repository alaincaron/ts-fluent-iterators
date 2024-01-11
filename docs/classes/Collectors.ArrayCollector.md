[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / [Collectors](../modules/Collectors.md) / ArrayCollector

# Class: ArrayCollector\<A\>

[Collectors](../modules/Collectors.md).ArrayCollector

## Type parameters

| Name |
| :------ |
| `A` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `A`[]\>

## Table of contents

### Constructors

- [constructor](Collectors.ArrayCollector.md#constructor)

### Properties

- [acc](Collectors.ArrayCollector.md#acc)

### Accessors

- [result](Collectors.ArrayCollector.md#result)

### Methods

- [collect](Collectors.ArrayCollector.md#collect)

## Constructors

### constructor

• **new ArrayCollector**\<`A`\>(): [`ArrayCollector`](Collectors.ArrayCollector.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Returns

[`ArrayCollector`](Collectors.ArrayCollector.md)\<`A`\>

## Properties

### acc

• `Private` `Readonly` **acc**: `A`[] = `[]`

## Accessors

### result

• `get` **result**(): `A`[]

#### Returns

`A`[]

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
