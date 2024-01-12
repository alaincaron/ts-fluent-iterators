[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / TallyCollector

# Class: TallyCollector\<K\>

[Collectors](../modules/Collectors.md).TallyCollector

A `Collector` that accepts elements of type `K` and returns a `Map<K,number>` indicating how many times has an element been seen.

**`Example`**

```ts
const c = new TallyCollector<string>();
c.collect('foo');
c.collect('bar');
c.collect('foo');
// c.result : Map(2) { 'foo' => 2, 'bar' => 1 }
```

## Type parameters

| Name | Description |
| :------ | :------ |
| `K` | The type of the keys of the map. |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`K`, `Map`\<`K`, `number`\>\>
