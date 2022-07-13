[ts-fluent-iterators - v1.1.1](../../README.md) › [API](../index.md) ›
[Generators](../index.md#generators) › [repeatedly](repeatedly.md)

# repeatedly generator
```typescript
function* iterate<T>(
   f: (t: T) => T,
   seed: T,
   n?: number, 
): Iterator<T>
```

Creates a new `Iterator<T>` of the results of successively invoking
applying `f` to `seed`.
The number of invocations is given by parameter `n` which defaults to infinity.


Example:
```typescript
import { Generators, AsyncGenerators, PromiseGenerators } from "ts-fluent-iterators";

const r1 = Generators.iterate((x: number) => 2 * x, 1); yields 1,2,4,8,16,...
```

