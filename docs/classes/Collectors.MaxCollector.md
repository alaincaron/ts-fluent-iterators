[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / MaxCollector

# Class: MaxCollector\<A\>

[Collectors](../modules/Collectors.md).MaxCollector

A `Collector` that accepts elements of type `A` and return their maximum or `undefined` if no elements were collected.

**`Example`**

```ts
const c = new MaxCollector<string>();
c.collect('foo');
c.collect('bar');
c.result : 'foo'
```

## Type parameters

| Name |
| :--- |
| `A`  |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `A` \| `undefined`\>

## Table of contents

### Constructors

- [constructor](Collectors.MaxCollector.md#constructor)

## Constructors

### constructor

• **new MaxCollector**\<`A`\>(`comparator?`): [`MaxCollector`](Collectors.MaxCollector.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name         | Type                                           | Default value       | Description                                                           |
| :----------- | :--------------------------------------------- | :------------------ | :-------------------------------------------------------------------- |
| `comparator` | [`Comparator`](../README.md#comparator)\<`A`\> | `defaultComparator` | The comparator used to compare elements. Default is natural ordering. |

#### Returns

[`MaxCollector`](Collectors.MaxCollector.md)\<`A`\>
