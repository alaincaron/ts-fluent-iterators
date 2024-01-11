[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / SumCollector

# Class: SumCollector

[Collectors](../modules/Collectors.md).SumCollector

A `Collector` that accepts numbers and return their sum.

**`Example`**

```ts
const c = new SumCollector();
c.collect(1);
c.collect(2);
c.result : 3.0
```

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`number`, `number`\>

## Table of contents

### Constructors

- [constructor](Collectors.SumCollector.md#constructor)

### Accessors

- [result](Collectors.SumCollector.md#result)

### Methods

- [collect](Collectors.SumCollector.md#collect)

## Constructors

### constructor

• **new SumCollector**(`initial?`): [`SumCollector`](Collectors.SumCollector.md)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `initial` | `number` | `0` | The initial value of the sum. |

#### Returns

[`SumCollector`](Collectors.SumCollector.md)

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
