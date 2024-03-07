[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / AsyncCollector

# Interface: AsyncCollector\<A, B\>

[Collectors](../modules/Collectors.md).AsyncCollector

An `AsyncCollector` is an object that asynchronously collects elements of type `A` and aggregates them into an object of type `B`.

## Type parameters

| Name | Description                           |
| :--- | :------------------------------------ |
| `A`  | the type of elements being collected. |
| `B`  | the type of the aggregated object.    |

## Table of contents

### Accessors

- [result](Collectors.AsyncCollector.md#result)

### Methods

- [collect](Collectors.AsyncCollector.md#collect)

## Accessors

### result

• `get` **result**(): `B`

Returns the aggregated object.

#### Returns

`B`

The aggregated object resulting from collecting all objects

## Methods

### collect

▸ **collect**(`a`): `Promise`\<`void`\>

Collects an element.

#### Parameters

| Name | Type | Description                  |
| :--- | :--- | :--------------------------- |
| `a`  | `A`  | The element being collected. |

#### Returns

`Promise`\<`void`\>
