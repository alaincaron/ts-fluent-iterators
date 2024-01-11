[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / TallyCollector

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
