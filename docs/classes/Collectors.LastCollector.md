[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / LastCollector

# Class: LastCollector\<A\>

[Collectors](../modules/Collectors.md).LastCollector

A `Collector` that accepts elements of type `A` and return the last element collected or `undefined` if no elements were collected.

**`Example`**

```ts
const c = new LastCollector();
c.collect('foo');
c.collect('bar');
c.collect('baz')
c.result : 'baz'
```

## Type parameters

| Name | Type      |
| :--- | :-------- |
| `A`  | `unknown` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `A` \| `undefined`\>
