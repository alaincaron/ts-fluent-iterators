[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / [Collectors](../modules/Collectors.md) / SumCollector

# Class: SumCollector

[Collectors](../modules/Collectors.md).SumCollector

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`number`, `number`\>

## Table of contents

### Constructors

- [constructor](Collectors.SumCollector.md#constructor)

### Accessors

- [result](Collectors.SumCollector.md#result)

### Methods

- [collect](Collectors.SumCollector.md#collect)

## Constructors

### constructor

• **new SumCollector**(`initial?`): [`SumCollector`](Collectors.SumCollector.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `initial` | `number` | `0` |

#### Returns

[`SumCollector`](Collectors.SumCollector.md)

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
