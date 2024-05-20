[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Collectors](../README.md) / MapCollector

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

## Type parameters

• **K**

The type of the keys of the map.

• **V**

the type of the values in the map.

## Implements

- [`Collector`](../interfaces/Collector.md)\<[`K`, `V`], `Map`\<`K`, `V`\>\>

## Constructors

### new MapCollector()

> **new MapCollector**\<`K`, `V`\>(`collisionHandler`?): [`MapCollector`](MapCollector.md)\<`K`, `V`\>

#### Parameters

• **collisionHandler?**: [`CollisionHandler`](../../../type-aliases/CollisionHandler.md)\<`K`, `V`\>

Specify how to handle collisions. Default is to ignore collisions, i.e. newer elements override previous ones.

#### Returns

[`MapCollector`](MapCollector.md)\<`K`, `V`\>
