[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / MapCollector

# Class: MapCollector\<K, V\>

[Collectors](../modules/Collectors.md).MapCollector

A `Collector` that accepts key-value pairs of type `[K,V]` and collects them to a `Map<K,V>` object.

**`Example`**

```ts
const c = new MapCollector<string,number>();
c.collect(['foo',1]);
c.collect(['bar' 2]);
c.collect(['foo',3]);
//c.result : Map.set('foo',3).set('bar',2)
```

## Type parameters

| Name | Description                        |
| :--- | :--------------------------------- |
| `K`  | The type of the keys of the map.   |
| `V`  | the type of the values in the map. |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<[`K`, `V`], `Map`\<`K`, `V`\>\>

## Table of contents

### Constructors

- [constructor](Collectors.MapCollector.md#constructor)

## Constructors

### constructor

• **new MapCollector**\<`K`, `V`\>(`collisionHandler?`): [`MapCollector`](Collectors.MapCollector.md)\<`K`, `V`\>

#### Type parameters

| Name |
| :--- |
| `K`  |
| `V`  |

#### Parameters

| Name                | Type                                                            | Description                                                                                                    |
| :------------------ | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `collisionHandler?` | [`CollisionHandler`](../README.md#collisionhandler)\<`K`, `V`\> | Specify how to handle collisions. Default is to ignore collisions, i.e. newer elements override previous ones. |

#### Returns

[`MapCollector`](Collectors.MapCollector.md)\<`K`, `V`\>
