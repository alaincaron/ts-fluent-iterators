[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / Collector

# Interface: Collector\<A, B\>

[Collectors](../modules/Collectors.md).Collector

## Type parameters

| Name |
| :------ |
| `A` |
| `B` |

## Hierarchy

- [`CollectorResult`](Collectors.CollectorResult.md)\<`B`\>

  ↳ **`Collector`**

## Implemented by

- [`ArrayCollector`](../classes/Collectors.ArrayCollector.md)
- [`AvgCollector`](../classes/Collectors.AvgCollector.md)
- [`CountCollector`](../classes/Collectors.CountCollector.md)
- [`FlattenCollector`](../classes/Collectors.FlattenCollector.md)
- [`GroupByCollector`](../classes/Collectors.GroupByCollector.md)
- [`LastCollector`](../classes/Collectors.LastCollector.md)
- [`MapCollector`](../classes/Collectors.MapCollector.md)
- [`MaxCollector`](../classes/Collectors.MaxCollector.md)
- [`MinCollector`](../classes/Collectors.MinCollector.md)
- [`MinMaxCollector`](../classes/Collectors.MinMaxCollector.md)
- [`ObjectCollector`](../classes/Collectors.ObjectCollector.md)
- [`SetCollector`](../classes/Collectors.SetCollector.md)
- [`StringJoiner`](../classes/Collectors.StringJoiner.md)
- [`SumCollector`](../classes/Collectors.SumCollector.md)
- [`TallyCollector`](../classes/Collectors.TallyCollector.md)

## Table of contents

### Accessors

- [result](Collectors.Collector.md#result)

### Methods

- [collect](Collectors.Collector.md#collect)

## Accessors

### result

• `get` **result**(): `B`

#### Returns

`B`

#### Inherited from

CollectorResult.result

## Methods

### collect

▸ **collect**(`a`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

#### Returns

`void`
