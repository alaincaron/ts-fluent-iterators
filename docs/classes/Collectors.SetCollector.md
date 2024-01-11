[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / SetCollector

# Class: SetCollector\<A\>

[Collectors](../modules/Collectors.md).SetCollector

A Collector that collects elements of type `A` into a `Set` of type `Set<A>`.

## Type parameters

| Name | Description |
| :------ | :------ |
| `A` | the type of elements being collected. |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `Set`\<`A`\>\>

## Table of contents

### Constructors

- [constructor](Collectors.SetCollector.md#constructor)

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

## Accessors

### result

• `get` **result**(): `Set`\<`A`\>

Returns the aggregated object.

#### Returns

`Set`\<`A`\>

The aggregated object resulting from collecting all objects

#### Implementation of

Collector.result

## Methods

### collect

▸ **collect**(`a`): `void`

Collects an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `A` | The element being collected. |

#### Returns

`void`

#### Implementation of

[Collector](../interfaces/Collectors.Collector.md).[collect](../interfaces/Collectors.Collector.md#collect)
