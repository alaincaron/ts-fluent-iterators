[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / TallyCollector

# Class: TallyCollector\<K\>

[Collectors](../modules/Collectors.md).TallyCollector

A `Collector` that accepts elements of type `K` and returns a `Map<K,number>` indicating how many times has an element been seen.

**`Example`**

```ts
const c = new TallyCollector<string>();
c.collect('foo');
c.collect('bar');
c.collect('foo');
// c.result : Map(2) { 'foo' => 2, 'bar' => 1 }
```

## Type parameters

| Name | Description |
| :------ | :------ |
| `K` | The type of the keys of the map. |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`K`, `Map`\<`K`, `number`\>\>

## Table of contents

### Constructors

- [constructor](Collectors.TallyCollector.md#constructor)

### Accessors

- [result](Collectors.TallyCollector.md#result)

### Methods

- [collect](Collectors.TallyCollector.md#collect)

## Constructors

### constructor

• **new TallyCollector**\<`K`\>(): [`TallyCollector`](Collectors.TallyCollector.md)\<`K`\>

#### Type parameters

| Name |
| :------ |
| `K` |

#### Returns

[`TallyCollector`](Collectors.TallyCollector.md)\<`K`\>

## Accessors

### result

• `get` **result**(): `Map`\<`K`, `number`\>

Returns the aggregated object.

#### Returns

`Map`\<`K`, `number`\>

The aggregated object resulting from collecting all objects

#### Implementation of

Collector.result

## Methods

### collect

▸ **collect**(`k`): `void`

Collects an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `k` | `K` | The element being collected. |

#### Returns

`void`

#### Implementation of

[Collector](../interfaces/Collectors.Collector.md).[collect](../interfaces/Collectors.Collector.md#collect)
