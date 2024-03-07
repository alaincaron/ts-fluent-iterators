[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / CountCollector

# Class: CountCollector\<A\>

[Collectors](../modules/Collectors.md).CountCollector

A `Collector` that accepts elements of type `A` and return the number of elements collected.

**`Example`**

```ts
const c = new CountCollector();
c.collect('foo');
c.collect('bar');
c.collect('baz')
c.result : 3
```

## Type parameters

| Name | Type      |
| :--- | :-------- |
| `A`  | `unknown` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `number`\>
