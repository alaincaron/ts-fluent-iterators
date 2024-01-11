[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / AvgCollector

# Class: AvgCollector

[Collectors](../modules/Collectors.md).AvgCollector

A `Collector` that accepts numbers and return their average.

**`Example`**

```ts
const c = new AvgCollector();
c.collect(1);
c.collect(2);
c.result : 1.5
```

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`number`, `number`\>

## Table of contents

### Constructors

- [constructor](Collectors.AvgCollector.md#constructor)

### Accessors

- [result](Collectors.AvgCollector.md#result)

### Methods

- [collect](Collectors.AvgCollector.md#collect)

## Constructors

### constructor

• **new AvgCollector**(): [`AvgCollector`](Collectors.AvgCollector.md)

#### Returns

[`AvgCollector`](Collectors.AvgCollector.md)

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

▸ **collect**(`a`): `void`

Collects an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `number` | The element being collected. |

#### Returns

`void`

#### Implementation of

[Collector](../interfaces/Collectors.Collector.md).[collect](../interfaces/Collectors.Collector.md#collect)
