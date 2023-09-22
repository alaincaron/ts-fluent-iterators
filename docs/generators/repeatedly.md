[ts-fluent-iterators](../../README.md) › [API](../index.md) ›
[Generators](../index.md#generators) › [repeat](repeat.md)

# repeat generator

```typescript
function* repeat<T>(f: () => T, n?: number): Iterator<T>;
```

Creates a new `Iterator<T>` by invoking function `f` repeatedly.
The number of invocations is given by parameter `n` which defaults to infinity.

Example:

```typescript
import { Generators, AsyncGenerators, PromiseGenerators } from "ts-fluent-iterators";

const r1 = Generators.repeat(Math.random); // yields a sequence of random numbers between 0 and 1
```
