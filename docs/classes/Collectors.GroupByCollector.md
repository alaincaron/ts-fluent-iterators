[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / GroupByCollector

# Class: GroupByCollector\<K, V\>

[Collectors](../modules/Collectors.md).GroupByCollector

## Type parameters

| Name |
| :------ |
| `K` |
| `V` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<[`K`, `V`], `Map`\<`K`, `V`[]\>\>

## Table of contents

### Constructors

- [constructor](Collectors.GroupByCollector.md#constructor)

### Accessors

- [result](Collectors.GroupByCollector.md#result)

### Methods

- [collect](Collectors.GroupByCollector.md#collect)

## Constructors

### constructor

• **new GroupByCollector**\<`K`, `V`\>(): [`GroupByCollector`](Collectors.GroupByCollector.md)\<`K`, `V`\>

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Returns

[`GroupByCollector`](Collectors.GroupByCollector.md)\<`K`, `V`\>

## Accessors

### result

• `get` **result**(): `Map`\<`K`, `V`[]\>

#### Returns

`Map`\<`K`, `V`[]\>

#### Implementation of

Collector.result

## Methods

### collect

▸ **collect**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`K`, `V`] |

#### Returns

`void`

#### Implementation of

[Collector](../interfaces/Collectors.Collector.md).[collect](../interfaces/Collectors.Collector.md#collect)
