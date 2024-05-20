[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Collectors](../README.md) / TallyCollector

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

## Type parameters

• **K**

The type of the keys of the map.

## Implements

- [`Collector`](../interfaces/Collector.md)\<`K`, `Map`\<`K`, `number`\>\>
