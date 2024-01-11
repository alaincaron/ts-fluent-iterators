[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / GroupByCollector

# Class: GroupByCollector\<K, V\>

[Collectors](../modules/Collectors.md).GroupByCollector

A `Collector` that accepts key-value pairs of type `[K,V]` and collects them to a `Map<K,V[]>` object.

**`Example`**

```ts
const c = new GroupBycollector<string,number>();
c.collect(['foo',1]);
c.collect(['bar' 2]);
c.collect(['foo',2]);
//c.result : Map(2) { 'foo' => [1, 2], 'bar' => [2] }
```

## Type parameters

| Name | Description |
| :------ | :------ |
| `K` | The type of the keys of the map. |
| `V` | the type of the values in the map. |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<[`K`, `V`], `Map`\<`K`, `V`[]\>\>

## Table of contents

### Constructors

- [constructor](Collectors.GroupByCollector.md#constructor)

### Accessors

- [result](Collectors.GroupByCollector.md#result)

### Methods

- [collect](Collectors.GroupByCollector.md#collect)

## Constructors

### constructor

• **new GroupByCollector**\<`K`, `V`\>(): [`GroupByCollector`](Collectors.GroupByCollector.md)\<`K`, `V`\>

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Returns

[`GroupByCollector`](Collectors.GroupByCollector.md)\<`K`, `V`\>

## Accessors

### result

• `get` **result**(): `Map`\<`K`, `V`[]\>

Returns the aggregated object.

#### Returns

`Map`\<`K`, `V`[]\>

The aggregated object resulting from collecting all objects

#### Implementation of

Collector.result

## Methods

### collect

▸ **collect**(`«destructured»`): `void`

Collects an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | [`K`, `V`] | The element being collected. |

#### Returns

`void`

#### Implementation of

[Collector](../interfaces/Collectors.Collector.md).[collect](../interfaces/Collectors.Collector.md#collect)
