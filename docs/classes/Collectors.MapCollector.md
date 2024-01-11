[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / MapCollector

# Class: MapCollector\<K, V\>

[Collectors](../modules/Collectors.md).MapCollector

## Type parameters

| Name |
| :------ |
| `K` |
| `V` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<[`K`, `V`], `Map`\<`K`, `V`\>\>

## Table of contents

### Constructors

- [constructor](Collectors.MapCollector.md#constructor)

### Accessors

- [result](Collectors.MapCollector.md#result)

### Methods

- [collect](Collectors.MapCollector.md#collect)

## Constructors

### constructor

• **new MapCollector**\<`K`, `V`\>(`collisionHandler?`): [`MapCollector`](Collectors.MapCollector.md)\<`K`, `V`\>

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `collisionHandler?` | [`CollisionHandler`](../README.md#collisionhandler)\<`K`, `V`\> |

#### Returns

[`MapCollector`](Collectors.MapCollector.md)\<`K`, `V`\>

## Accessors

### result

• `get` **result**(): `Map`\<`K`, `V`\>

#### Returns

`Map`\<`K`, `V`\>

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
