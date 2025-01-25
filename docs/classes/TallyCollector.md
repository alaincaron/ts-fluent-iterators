[**ts-fluent-iterators**](../README.md)

---

[ts-fluent-iterators](../README.md) / TallyCollector

# Class: TallyCollector\<K\>

A `Collector` that accepts elements of type `K` and returns a `Map<K,number>` indicating how many times has an element been seen.

## Example

```ts
const c = new TallyCollector<string>();
c.collect('foo');
c.collect('bar');
c.collect('foo');
// c.result : Map(2) { 'foo' => 2, 'bar' => 1 }
```

## Type Parameters

• **K**

The type of the keys of the map.

## Implements

- [`Collector`](../interfaces/Collector.md)\<`K`, `Map`\<`K`, `number`\>\>

## Accessors

### result

#### Get Signature

> **get** **result**(): `Map`\<`K`, `number`\>

Returns the aggregated object.

##### Returns

`Map`\<`K`, `number`\>

The aggregated object resulting from collecting all objects

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`result`](../interfaces/Collector.md#result)

## Methods

### collect()

> **collect**(`k`): `void`

Collects an element.

#### Parameters

##### k

`K`

#### Returns

`void`

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`collect`](../interfaces/Collector.md#collect)
