[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / [Collectors](../modules/Collectors.md) / FlattenCollector

# Class: FlattenCollector\<A\>

[Collectors](../modules/Collectors.md).FlattenCollector

## Type parameters

| Name |
| :------ |
| `A` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`Iterable`\<`A`\> \| `Iterator`\<`A`\>, [`FluentIterator`](FluentIterator.md)\<`A`\>\>

## Table of contents

### Constructors

- [constructor](Collectors.FlattenCollector.md#constructor)

### Properties

- [iter](Collectors.FlattenCollector.md#iter)

### Accessors

- [result](Collectors.FlattenCollector.md#result)

### Methods

- [collect](Collectors.FlattenCollector.md#collect)

## Constructors

### constructor

• **new FlattenCollector**\<`A`\>(): [`FlattenCollector`](Collectors.FlattenCollector.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Returns

[`FlattenCollector`](Collectors.FlattenCollector.md)\<`A`\>

## Properties

### iter

• `Private` **iter**: [`FluentIterator`](FluentIterator.md)\<`A`\>

## Accessors

### result

• `get` **result**(): [`FluentIterator`](FluentIterator.md)\<`A`\>

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

#### Implementation of

Collector.result

## Methods

### collect

▸ **collect**(`a`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `Iterable`\<`A`\> \| `Iterator`\<`A`, `any`, `undefined`\> |

#### Returns

`void`

#### Implementation of

[Collector](../interfaces/Collectors.Collector.md).[collect](../interfaces/Collectors.Collector.md#collect)
