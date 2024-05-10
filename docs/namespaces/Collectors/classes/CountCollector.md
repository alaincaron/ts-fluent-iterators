[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Collectors](../README.md) / CountCollector

# Class: CountCollector\<A\>

A `Collector` that accepts elements of type `A` and return the number of elements collected.

## Example

```ts
const c = new CountCollector();
c.collect('foo');
c.collect('bar');
c.collect('baz')
c.result : 3
```

## Type parameters

• **A** = `unknown`

## Implements

- [`Collector`](../interfaces/Collector.md)\<`A`, `number`\>
