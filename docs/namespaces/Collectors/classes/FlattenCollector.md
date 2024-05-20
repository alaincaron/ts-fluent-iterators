[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Collectors](../README.md) / FlattenCollector

# Class: FlattenCollector\<A\>

A `Collector` that accepts `Iterable<A>` or `Iterator<A>` and returns a `FluentIterator<A>` that consists of the concatenation of all the collected iterable objects.

## Example

```ts
const c = new FlattenCollector<number>();
c.collect([1,2]);
c.collect([3,4]);
c.result.collect() : [1,2,3,4]
```

## Type parameters

• **A**

the type of elements being iterated on.

## Implements

- [`Collector`](../interfaces/Collector.md)\<`Iterable`\<`A`\> \| `Iterator`\<`A`\>, [`FluentIterator`](../../../classes/FluentIterator.md)\<`A`\>\>
