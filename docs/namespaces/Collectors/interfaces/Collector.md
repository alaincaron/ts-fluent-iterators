[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Collectors](../README.md) / Collector

# Interface: Collector\<A, B\>

A `Collector` is an object that collects elements of type `A` and aggregates them into an object of type `B`.

## Type parameters

• **A**

the type of elements being collected.

• **B**

the type of the aggregated object.

## Accessors

### result

> `get` **result**(): `B`

Returns the aggregated object.

#### Returns

`B`

The aggregated object resulting from collecting all objects

## Methods

### collect()

> **collect**(`a`): `void`

Collects an element.

#### Parameters

• **a**: `A`

The element being collected.

#### Returns

`void`
