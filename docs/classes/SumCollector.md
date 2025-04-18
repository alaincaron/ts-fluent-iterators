[**ts-fluent-iterators**](../README.md)

---

[ts-fluent-iterators](../README.md) / SumCollector

# Class: SumCollector

A `Collector` that accepts numbers and return their sum.

## Example

```ts
const c = new SumCollector();
c.collect(1);
c.collect(2);
c.result : 3.0
```

## Implements

- [`Collector`](../interfaces/Collector.md)\<`number`, `number`\>

## Constructors

### Constructor

> **new SumCollector**(`initial`): `SumCollector`

#### Parameters

##### initial

`number` = `0`

The initial value of the sum.

#### Returns

`SumCollector`

## Accessors

### result

#### Get Signature

> **get** **result**(): `number`

Returns the aggregated object.

##### Returns

`number`

The aggregated object resulting from collecting all objects

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`result`](../interfaces/Collector.md#result)

## Methods

### collect()

> **collect**(`a`): `void`

Collects an element.

#### Parameters

##### a

`number`

The element being collected.

#### Returns

`void`

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`collect`](../interfaces/Collector.md#collect)
