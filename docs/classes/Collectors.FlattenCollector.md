[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / FlattenCollector

# Class: FlattenCollector\<A\>

[Collectors](../modules/Collectors.md).FlattenCollector

A `Collector` that accepts `Iterable<A>` or `Iterator<A>` and returns a `FluentIterator<A>` that consists of the concatenation of all the collected iterable objects.

**`Example`**

```ts
const c = new FlattenCollector<number>();
c.collect([1,2]);
c.collect([3,4]);
c.result.collect() : [1,2,3,4]
```

## Type parameters

| Name | Description |
| :------ | :------ |
| `A` | the type of elements being iterated on. |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`Iterable`\<`A`\> \| `Iterator`\<`A`\>, [`FluentIterator`](FluentIterator.md)\<`A`\>\>
