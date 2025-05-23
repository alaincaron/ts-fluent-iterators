[**ts-fluent-iterators**](../README.md)

---

[ts-fluent-iterators](../README.md) / GroupByCollector

# Class: GroupByCollector\<K, V\>

A `Collector` that accepts key-value pairs of type `[K,V]` and collects them to a `Map<K,V[]>` object.

## Example

```ts
const c = new GroupBycollector<string,number>();
c.collect(['foo',1]);
c.collect(['bar' 2]);
c.collect(['foo',2]);
//c.result : Map(2) { 'foo' => [1, 2], 'bar' => [2] }
```

## Type Parameters

### K

`K`

The type of the keys of the map.

### V

`V`

the type of the values in the map.

## Implements

- [`Collector`](../interfaces/Collector.md)\<\[`K`, `V`\], `Map`\<`K`, `V`[]\>\>

## Accessors

### result

#### Get Signature

> **get** **result**(): `Map`\<`K`, `V`[]\>

Returns the aggregated object.

##### Returns

`Map`\<`K`, `V`[]\>

The aggregated object resulting from collecting all objects

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`result`](../interfaces/Collector.md#result)

## Methods

### collect()

> **collect**(`a`): `void`

Collects an element.

#### Parameters

##### a

\[`K`, `V`\]

The element being collected.

#### Returns

`void`

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`collect`](../interfaces/Collector.md#collect)
