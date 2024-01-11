[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / [Collectors](../modules/Collectors.md) / ObjectCollector

# Class: ObjectCollector\<V\>

[Collectors](../modules/Collectors.md).ObjectCollector

## Type parameters

| Name |
| :------ |
| `V` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<[`string`, `V`], `Record`\<`string`, `V`\>\>

## Table of contents

### Constructors

- [constructor](Collectors.ObjectCollector.md#constructor)

### Accessors

- [result](Collectors.ObjectCollector.md#result)

### Methods

- [collect](Collectors.ObjectCollector.md#collect)

## Constructors

### constructor

• **new ObjectCollector**\<`V`\>(`collisionHandler?`): [`ObjectCollector`](Collectors.ObjectCollector.md)\<`V`\>

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `collisionHandler?` | [`CollisionHandler`](../modules.md#collisionhandler)\<`string`, `V`\> |

#### Returns

[`ObjectCollector`](Collectors.ObjectCollector.md)\<`V`\>

## Accessors

### result

• `get` **result**(): `Record`\<`string`, `V`\>

#### Returns

`Record`\<`string`, `V`\>

#### Implementation of

Collector.result

## Methods

### collect

▸ **collect**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`string`, `V`] |

#### Returns

`void`

#### Implementation of

[Collector](../interfaces/Collectors.Collector.md).[collect](../interfaces/Collectors.Collector.md#collect)
