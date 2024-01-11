[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / [Collectors](../modules/Collectors.md) / MapCollector

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

### Properties

- [collisionHandler](Collectors.MapCollector.md#collisionhandler)
- [map](Collectors.MapCollector.md#map)

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
| `collisionHandler?` | [`CollisionHandler`](../modules.md#collisionhandler)\<`K`, `V`\> |

#### Returns

[`MapCollector`](Collectors.MapCollector.md)\<`K`, `V`\>

## Properties

### collisionHandler

• `Private` `Optional` `Readonly` **collisionHandler**: [`CollisionHandler`](../modules.md#collisionhandler)\<`K`, `V`\>

___

### map

• `Private` `Readonly` **map**: `Map`\<`K`, `V`\>

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
