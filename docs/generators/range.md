[ts-fluent-iterators](../../README.md) › [API](../index.md) ›
[Generators](../index.md#generators) › [range](range.md)

# range generator

```typescript
function* range(
   start? number,
   end?: number,
   step?: number
): Iterator<number>
```

Creates a new `Iterator<number>` with lower bound set to `start`
(inclusive) and upper set to `end` (exclusive) with increments of `step`.

- `start` defaults to 0
- `end` defaults to infinity
- `step` defaults to 1 if `start < end`, to -1 otherwise.

Example:

```typescript
import { Generators, AsyncGenerators, PromiseGenerators } from 'ts-fluent-iterators';

const r1 = Generators.range(); // yields, 0, 1, 2, 3, ...
const r2 = AsyncGenerators.range(0, 0); // empty
const r3 = Generators.range(1, 5); // yields 1, 2, 3, 4
const r4 = AsyncGenerators.range(5, 0); // yields 5, 4 ,3 ,2, 1
const r5 = Generators.range(1, 6, 2); // yields 1, 3, 5
```
