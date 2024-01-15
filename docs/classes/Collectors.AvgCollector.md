[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / AvgCollector

# Class: AvgCollector

[Collectors](../modules/Collectors.md).AvgCollector

A `Collector` that accepts numbers and return their average.

**`Example`**

```ts
const c = new AvgCollector();
c.collect(1);
c.collect(2);
c.result : 1.5
```

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`number`, `number`\>
