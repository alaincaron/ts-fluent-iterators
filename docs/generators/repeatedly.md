[ts-fluent-iterators - v1.1.1](../../README.md) › [API](../index.md) ›
[Generators](../index.md#generators) › [repeatedly](repeatedly.md)

# repeatedly generator
```typescript
function* repeatedly<T>(
   f: () => T,
   n?: number, 
): Iterator<nT>
```

Creates a new `Iterator<T>` by invoking function `f` repeatedly.
The number of invocations is given by parameter `n` which defaults to infinity.


Example:
```typescript
import { Generators, AsyncGenerators, PromiseGenerators } from "ts-fluent-iterators";

function fib(): () => number {
   let x = 0;
   let y = 1;
   return { 
      y = x + y;
      x = y - x;
      return y;
   };
}

const r1 = Generators.repeatedly(fib()); // yields  1, 2, 3, 5, 8, 13, ...
const r2 = AsyncGenerators.repeatedly(fib(), 2); // yields 1, 2
```

