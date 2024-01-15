[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / MinMaxCollector

# Class: MinMaxCollector\<A\>

[Collectors](../modules/Collectors.md).MinMaxCollector

A `Collector` that accepts elements of type `A` and return their minimum and maximum elements or `undefined` if no elements were collected.

**`Example`**

```ts
const c = new MinMaxCollector<string>();
c.collect('foo');
c.collect('bar');
c.collect('baz')
c.result : { min: 'bar', max: 'foo' }
```

## Type parameters

| Name |
| :------ |
| `A` |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, [`MinMax`](../interfaces/MinMax.md)\<`A`\> \| `undefined`\>

## Table of contents

### Constructors

- [constructor](Collectors.MinMaxCollector.md#constructor)

## Constructors

### constructor

• **new MinMaxCollector**\<`A`\>(`comparator?`): [`MinMaxCollector`](Collectors.MinMaxCollector.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `comparator` | [`Comparator`](../README.md#comparator)\<`A`\> | `defaultComparator` | The comparator used to compare elements. Default is natural ordering. |

#### Returns

[`MinMaxCollector`](Collectors.MinMaxCollector.md)\<`A`\>
