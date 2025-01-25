[**ts-fluent-iterators**](../README.md)

---

[ts-fluent-iterators](../README.md) / AvgCollector

# Class: AvgCollector

A `Collector` that accepts numbers and return their average.

## Example

```ts
const c = new AvgCollector();
c.collect(1);
c.collect(2);
c.result : 1.5
```

## Implements

- [`Collector`](../interfaces/Collector.md)\<`number`, `number`\>

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
