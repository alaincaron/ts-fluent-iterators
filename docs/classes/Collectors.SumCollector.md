[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / SumCollector

# Class: SumCollector

[Collectors](../modules/Collectors.md).SumCollector

A `Collector` that accepts numbers and return their sum.

**`Example`**

```ts
const c = new SumCollector();
c.collect(1);
c.collect(2);
c.result : 3.0
```

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`number`, `number`\>

## Table of contents

### Constructors

- [constructor](Collectors.SumCollector.md#constructor)

## Constructors

### constructor

• **new SumCollector**(`initial?`): [`SumCollector`](Collectors.SumCollector.md)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `initial` | `number` | `0` | The initial value of the sum. |

#### Returns

[`SumCollector`](Collectors.SumCollector.md)
