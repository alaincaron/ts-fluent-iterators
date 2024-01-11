[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / [Collectors](../modules/Collectors.md) / StringJoiner

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

### Properties

- [acc](Collectors.StringJoiner.md#acc)
- [done](Collectors.StringJoiner.md#done)
- [first](Collectors.StringJoiner.md#first)
- [separator](Collectors.StringJoiner.md#separator)
- [suffix](Collectors.StringJoiner.md#suffix)

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

## Properties

### acc

• `Private` **acc**: `string`

___

### done

• `Private` **done**: `boolean` = `false`

___

### first

• `Private` **first**: `boolean` = `true`

___

### separator

• `Private` `Readonly` **separator**: `string` = `','`

___

### suffix

• `Private` `Readonly` **suffix**: `string` = `''`

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
