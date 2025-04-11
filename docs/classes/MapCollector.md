[**ts-fluent-iterators**](../README.md)

---

[ts-fluent-iterators](../README.md) / MapCollector

# Class: MapCollector\<K, V\>

A `Collector` that accepts key-value pairs of type `[K,V]` and collects them to a `Map<K,V>` object.

## Example

```ts
const c = new MapCollector<string,number>();
c.collect(['foo',1]);
c.collect(['bar' 2]);
c.collect(['foo',3]);
//c.result : Map.set('foo',3).set('bar',2)
```

## Type Parameters

### K

`K`

The type of the keys of the map.

### V

`V`

the type of the values in the map.

## Implements

- [`Collector`](../interfaces/Collector.md)\<\[`K`, `V`\], `Map`\<`K`, `V`\>\>

## Constructors

### Constructor

> **new MapCollector**\<`K`, `V`\>(`collisionHandler?`): `MapCollector`\<`K`, `V`\>

#### Parameters

##### collisionHandler?

[`CollisionHandler`](../type-aliases/CollisionHandler.md)\<`K`, `V`\>

Specify how to handle collisions. Default is to ignore collisions, i.e. newer elements override previous ones.

#### Returns

`MapCollector`\<`K`, `V`\>

## Accessors

### result

#### Get Signature

> **get** **result**(): `Map`\<`K`, `V`\>

Returns the aggregated object.

##### Returns

`Map`\<`K`, `V`\>

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
