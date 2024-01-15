[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / EventualCollector

# Interface: EventualCollector\<A, B\>

[Collectors](../modules/Collectors.md).EventualCollector

A `Collector` or an `AsyncCollector`.

## Type parameters

| Name |
| :------ |
| `A` |
| `B` |

## Table of contents

### Methods

- [collect](Collectors.EventualCollector.md#collect)

## Methods

### collect

▸ **collect**(`a`): `void` \| `Promise`\<`void`\>

Collects an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `A` | The element being collected. |

#### Returns

`void` \| `Promise`\<`void`\>
