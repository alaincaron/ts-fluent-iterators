[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / StringJoiner

# Class: StringJoiner\<A\>

[Collectors](../modules/Collectors.md).StringJoiner

## Type parameters

| Name |
| :------ |
| `A` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `string`\>

## Table of contents

### Constructors

- [constructor](Collectors.StringJoiner.md#constructor)

### Accessors

- [result](Collectors.StringJoiner.md#result)

### Methods

- [collect](Collectors.StringJoiner.md#collect)

## Constructors

### constructor

• **new StringJoiner**\<`A`\>(`separator?`, `prefix?`, `suffix?`): [`StringJoiner`](Collectors.StringJoiner.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `separator` | `string` | `','` |
| `prefix` | `string` | `''` |
| `suffix` | `string` | `''` |

#### Returns

[`StringJoiner`](Collectors.StringJoiner.md)\<`A`\>

## Accessors

### result

• `get` **result**(): `string`

#### Returns

`string`

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
