[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Collectors](../README.md) / MaxCollector

# Class: MaxCollector\<A\>

A `Collector` that accepts elements of type `A` and return their maximum or `undefined` if no elements were collected.

## Example

```ts
const c = new MaxCollector<string>();
c.collect('foo');
c.collect('bar');
c.result : 'foo'
```

## Type parameters

• **A**

## Implements

- [`Collector`](../interfaces/Collector.md)\<`A`, `A` \| `undefined`\>

## Constructors

### new MaxCollector()

> **new MaxCollector**\<`A`\>(`comparator`): [`MaxCollector`](MaxCollector.md)\<`A`\>

#### Parameters

• **comparator**: [`Comparator`](../../../type-aliases/Comparator.md)\<`A`\>= `Comparators.natural`

The comparator used to compare elements. Default is natural ordering.

#### Returns

[`MaxCollector`](MaxCollector.md)\<`A`\>
