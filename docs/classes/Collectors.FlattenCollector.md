[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / FlattenCollector

# Class: FlattenCollector\<A\>

[Collectors](../modules/Collectors.md).FlattenCollector

A `Collector` that accepts `Iterable<A>` or `Iterator<A>` and returns a `FluentIterator<A>` that consists of the concatenation of all the collected iterable objects.

**`Example`**

```ts
const c = new FlattenCollector<number>();
c.collect([1,2]);
c.collect([3,4]);
c.result.collect() : [1,2,3,4]
```

## Type parameters

| Name | Description |
| :------ | :------ |
| `A` | the type of elements being iterated on. |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`Iterable`\<`A`\> \| `Iterator`\<`A`\>, [`FluentIterator`](FluentIterator.md)\<`A`\>\>

## Table of contents

### Constructors

- [constructor](Collectors.FlattenCollector.md#constructor)

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

## Accessors

### result

• `get` **result**(): [`FluentIterator`](FluentIterator.md)\<`A`\>

Returns the aggregated object.

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

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
| `a` | `Iterable`\<`A`\> \| `Iterator`\<`A`, `any`, `undefined`\> | The element being collected. |

#### Returns

`void`

#### Implementation of

[Collector](../interfaces/Collectors.Collector.md).[collect](../interfaces/Collectors.Collector.md#collect)
