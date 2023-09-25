[ts-fluent-iterators](../../README.md) › [API](../index.md) ›
[Generators](../index.md#generators) › [repeat](repeat.md)

# repeat generator

```typescript
function* repeat<T>(f: Mapper<number,T>, n?: number): Iterator<T>;
```

Creates a new `IterableIterator<T>` by invoking function `f`
repeatedly with value 0, 1,... `n`- 1 .
The argument `n` defaults to infinity.

Example:

```typescript
import { Generators  } from "ts-fluent-iterators";

const r1 = Generators.repeat(_ => Math.random()); // yields an infinite sequence of random numbers between 0 and 1
```
