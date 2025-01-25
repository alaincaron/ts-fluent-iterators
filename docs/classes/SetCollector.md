[**ts-fluent-iterators**](../README.md)

---

[ts-fluent-iterators](../README.md) / SetCollector

# Class: SetCollector\<A\>

A Collector that collects elements of type `A` into a `Set` of type `Set<A>`.

## Type Parameters

• **A**

the type of elements being collected.

## Implements

- [`Collector`](../interfaces/Collector.md)\<`A`, `Set`\<`A`\>\>

## Accessors

### result

#### Get Signature

> **get** **result**(): `Set`\<`A`\>

Returns the aggregated object.

##### Returns

`Set`\<`A`\>

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
