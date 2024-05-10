[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Collectors](../README.md) / StringJoiner

# Class: StringJoiner\<A\>

A `Collector` that accepts elements of type `A` and returns a `string`

## Example

```ts
const c = new StringJoiner<string>(', ', '[', ']');
c.collect('foo');
c.collect('bar');
c.collect('baz');
// c.result : [foo, bar, baz]
```

## Type parameters

• **A**

The type of the elements being accepted.

## Implements

- [`Collector`](../interfaces/Collector.md)\<`A`, `string`\>

## Constructors

### new StringJoiner()

> **new StringJoiner**\<`A`\>(`separator`, `prefix`, `suffix`): [`StringJoiner`](StringJoiner.md)\<`A`\>

#### Parameters

• **separator**: `string`= `','`

separator between elements.

• **prefix**: `string`= `''`

prefix of the joined string.

• **suffix**: `string`= `''`

suffix of the joined string.

#### Returns

[`StringJoiner`](StringJoiner.md)\<`A`\>
