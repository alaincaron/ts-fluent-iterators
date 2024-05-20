[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Collectors](../README.md) / LastCollector

# Class: LastCollector\<A\>

A `Collector` that accepts elements of type `A` and return the last element collected or `undefined` if no elements were collected.

## Example

```ts
const c = new LastCollector();
c.collect('foo');
c.collect('bar');
c.collect('baz')
c.result : 'baz'
```

## Type parameters

• **A** = `unknown`

## Implements

- [`Collector`](../interfaces/Collector.md)\<`A`, `A` \| `undefined`\>
