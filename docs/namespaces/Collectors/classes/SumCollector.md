[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Collectors](../README.md) / SumCollector

# Class: SumCollector

A `Collector` that accepts numbers and return their sum.

## Example

```ts
const c = new SumCollector();
c.collect(1);
c.collect(2);
c.result : 3.0
```

## Implements

- [`Collector`](../interfaces/Collector.md)\<`number`, `number`\>

## Constructors

### new SumCollector()

> **new SumCollector**(`initial`): [`SumCollector`](SumCollector.md)

#### Parameters

• **initial**: `number`= `0`

The initial value of the sum.

#### Returns

[`SumCollector`](SumCollector.md)
