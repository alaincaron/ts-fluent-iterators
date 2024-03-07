[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / GroupByCollector

# Class: GroupByCollector\<K, V\>

[Collectors](../modules/Collectors.md).GroupByCollector

A `Collector` that accepts key-value pairs of type `[K,V]` and collects them to a `Map<K,V[]>` object.

**`Example`**

```ts
const c = new GroupBycollector<string,number>();
c.collect(['foo',1]);
c.collect(['bar' 2]);
c.collect(['foo',2]);
//c.result : Map(2) { 'foo' => [1, 2], 'bar' => [2] }
```

## Type parameters

| Name | Description                        |
| :--- | :--------------------------------- |
| `K`  | The type of the keys of the map.   |
| `V`  | the type of the values in the map. |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<[`K`, `V`], `Map`\<`K`, `V`[]\>\>
