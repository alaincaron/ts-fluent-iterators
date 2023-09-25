[ts-fluent-iterators](../../README.md) › [API](../index.md) ›
[Generators](../index.md#generators) › [loop](loop.md)

# loop generator

```typescript
function* loop<T>(f: Mapper<number,T>, start?: number, end?: number,
step?: number);
```

Creates a new `IterableIterator<T>` of the results of successively invoking
applying `f` using `start`, `end` and `step` arguments.
The arguments `start`, `end`, and `step` are interpreted as in the
[range](./range.md) generator.

Example:

```typescript
import { Generators } from "ts-fluent-iterators";

const r1 = Generators.loop((x: number) => 2 ** x, 0, 5); yields 1,2,4,8,16
```
