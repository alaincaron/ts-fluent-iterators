[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / [Collectors](../modules/Collectors.md) / AvgCollector

# Class: AvgCollector

[Collectors](../modules/Collectors.md).AvgCollector

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`number`, `number`\>

## Table of contents

### Constructors

- [constructor](Collectors.AvgCollector.md#constructor)

### Properties

- [avg](Collectors.AvgCollector.md#avg)
- [n](Collectors.AvgCollector.md#n)

### Accessors

- [result](Collectors.AvgCollector.md#result)

### Methods

- [collect](Collectors.AvgCollector.md#collect)

## Constructors

### constructor

• **new AvgCollector**(): [`AvgCollector`](Collectors.AvgCollector.md)

#### Returns

[`AvgCollector`](Collectors.AvgCollector.md)

## Properties

### avg

• `Private` **avg**: `number` = `0`

___

### n

• `Private` **n**: `number` = `0`

## Accessors

### result

• `get` **result**(): `number`

#### Returns

`number`

#### Implementation of

Collector.result

## Methods

### collect

▸ **collect**(`a`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `number` |

#### Returns

`void`

#### Implementation of

[Collector](../interfaces/Collectors.Collector.md).[collect](../interfaces/Collectors.Collector.md#collect)
