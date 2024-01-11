[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / ArrayCollector

# Class: ArrayCollector\<A\>

[Collectors](../modules/Collectors.md).ArrayCollector

A Collector that collects elements of type `A` into an array of type `A[]`.

## Type parameters

| Name | Description |
| :------ | :------ |
| `A` | the type of elements being collected. |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `A`[]\>

## Table of contents

### Constructors

- [constructor](Collectors.ArrayCollector.md#constructor)

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

## Accessors

### result

• `get` **result**(): `A`[]

Returns the aggregated object.

#### Returns

`A`[]

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
