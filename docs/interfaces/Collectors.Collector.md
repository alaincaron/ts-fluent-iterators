[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / Collector

# Interface: Collector\<A, B\>

[Collectors](../modules/Collectors.md).Collector

A `Collector` is an object that collects elements of type `A` and aggregates them into an object of type `B`.

## Type parameters

| Name | Description                           |
| :--- | :------------------------------------ |
| `A`  | the type of elements being collected. |
| `B`  | the type of the aggregated object.    |

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

Returns the aggregated object.

#### Returns

`B`

The aggregated object resulting from collecting all objects

## Methods

### collect

▸ **collect**(`a`): `void`

Collects an element.

#### Parameters

| Name | Type | Description                  |
| :--- | :--- | :--------------------------- |
| `a`  | `A`  | The element being collected. |

#### Returns

`void`
