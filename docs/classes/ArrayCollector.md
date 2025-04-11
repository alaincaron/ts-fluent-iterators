[**ts-fluent-iterators**](../README.md)

---

[ts-fluent-iterators](../README.md) / ArrayCollector

# Class: ArrayCollector\<A\>

A Collector that collects elements of type `A` into an array of type `A[]`.

## Type Parameters

### A

`A`

the type of elements being collected.

## Implements

- [`Collector`](../interfaces/Collector.md)\<`A`, `A`[]\>

## Accessors

### result

#### Get Signature

> **get** **result**(): `A`[]

Returns the aggregated object.

##### Returns

`A`[]

The aggregated object resulting from collecting all objects

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`result`](../interfaces/Collector.md#result)

## Methods

### collect()

> **collect**(`a`): `void`

Collects an element.

#### Parameters

##### a

`A`

The element being collected.

#### Returns

`void`

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`collect`](../interfaces/Collector.md#collect)
