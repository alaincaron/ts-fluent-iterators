[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / LastCollector

# Class: LastCollector\<A\>

[Collectors](../modules/Collectors.md).LastCollector

A `Collector` that accepts elements of type `A` and return the last element collected or `undefined` if no elements were collected.

**`Example`**

```ts
const c = new LastCollector();
c.collect('foo');
c.collect('bar');
c.collect('baz')
c.result : 'baz'
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `unknown` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `A` \| `undefined`\>

## Table of contents

### Constructors

- [constructor](Collectors.LastCollector.md#constructor)

### Accessors

- [result](Collectors.LastCollector.md#result)

### Methods

- [collect](Collectors.LastCollector.md#collect)

## Constructors

### constructor

• **new LastCollector**\<`A`\>(): [`LastCollector`](Collectors.LastCollector.md)\<`A`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `unknown` |

#### Returns

[`LastCollector`](Collectors.LastCollector.md)\<`A`\>

## Accessors

### result

• `get` **result**(): `undefined` \| `A`

Returns the aggregated object.

#### Returns

`undefined` \| `A`

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
