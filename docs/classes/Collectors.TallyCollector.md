[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / [Collectors](../modules/Collectors.md) / TallyCollector

# Class: TallyCollector\<A\>

[Collectors](../modules/Collectors.md).TallyCollector

## Type parameters

| Name |
| :------ |
| `A` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `Map`\<`A`, `number`\>\>

## Table of contents

### Constructors

- [constructor](Collectors.TallyCollector.md#constructor)

### Properties

- [map](Collectors.TallyCollector.md#map)

### Accessors

- [result](Collectors.TallyCollector.md#result)

### Methods

- [collect](Collectors.TallyCollector.md#collect)

## Constructors

### constructor

• **new TallyCollector**\<`A`\>(): [`TallyCollector`](Collectors.TallyCollector.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Returns

[`TallyCollector`](Collectors.TallyCollector.md)\<`A`\>

## Properties

### map

• `Private` `Readonly` **map**: `Map`\<`A`, `number`\>

## Accessors

### result

• `get` **result**(): `Map`\<`A`, `number`\>

#### Returns

`Map`\<`A`, `number`\>

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
