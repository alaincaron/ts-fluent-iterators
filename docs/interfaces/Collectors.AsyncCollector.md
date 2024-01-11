[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / AsyncCollector

# Interface: AsyncCollector\<A, B\>

[Collectors](../modules/Collectors.md).AsyncCollector

## Type parameters

| Name |
| :------ |
| `A` |
| `B` |

## Hierarchy

- [`CollectorResult`](Collectors.CollectorResult.md)\<`B`\>

  ↳ **`AsyncCollector`**

## Table of contents

### Accessors

- [result](Collectors.AsyncCollector.md#result)

### Methods

- [collect](Collectors.AsyncCollector.md#collect)

## Accessors

### result

• `get` **result**(): `B`

#### Returns

`B`

#### Inherited from

CollectorResult.result

## Methods

### collect

▸ **collect**(`a`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

#### Returns

`Promise`\<`void`\>
