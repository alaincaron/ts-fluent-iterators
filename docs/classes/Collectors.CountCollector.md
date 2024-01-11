[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / CountCollector

# Class: CountCollector\<A\>

[Collectors](../modules/Collectors.md).CountCollector

A `Collector` that accepts elements of type `A` and return the number of elements collected.

**`Example`**

```ts
const c = new CountCollector();
c.collect('foo');
c.collect('bar');
c.collect('baz')
c.result : 3
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `unknown` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `number`\>

## Table of contents

### Constructors

- [constructor](Collectors.CountCollector.md#constructor)

### Accessors

- [result](Collectors.CountCollector.md#result)

### Methods

- [collect](Collectors.CountCollector.md#collect)

## Constructors

### constructor

• **new CountCollector**\<`A`\>(): [`CountCollector`](Collectors.CountCollector.md)\<`A`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `unknown` |

#### Returns

[`CountCollector`](Collectors.CountCollector.md)\<`A`\>

## Accessors

### result

• `get` **result**(): `number`

Returns the aggregated object.

#### Returns

`number`

The aggregated object resulting from collecting all objects

#### Implementation of

Collector.result

## Methods

### collect

▸ **collect**(`_a`): `void`

Collects an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_a` | `A` | The element being collected. |

#### Returns

`void`

#### Implementation of

[Collector](../interfaces/Collectors.Collector.md).[collect](../interfaces/Collectors.Collector.md#collect)
