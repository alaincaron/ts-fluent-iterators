[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Collectors](../README.md) / AvgCollector

# Class: AvgCollector

A `Collector` that accepts numbers and return their average.

## Example

```ts
const c = new AvgCollector();
c.collect(1);
c.collect(2);
c.result : 1.5
```

## Implements

- [`Collector`](../interfaces/Collector.md)\<`number`, `number`\>
