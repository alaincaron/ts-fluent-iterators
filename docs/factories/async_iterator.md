[ts-fluent-iterators - v1,0,0](../../README.md) › [API](../index.md) ›
[Factory methods](../index.md#factories) › [asyncIterator](async_iterator.md)

# asyncIterator factory function
```typescript
function asyncIterator<A>(
   iter: AsyncIterator<A> | EventualIterable<A>
): AsyncFluentIterator<A>
```

Creates a new [AsyncFluentIterator<A>](../iterators/async_fluent_iterator.md) from an [`EventualIterable<A>`](../types/eventual_iterable.md)
or an `AsyncIterator<A>` object.  
This function is used to convert its argument to an `AsyncIterator<A>`
before 
invoking the [AsyncFluentIterator's constructor](../iterators/async_fluent_iterator.md#constructor)

Example:
```typescript
import { 
  asyncIterator,
  AsyncFluentIterators
} from "ts-fluent-iterators";

const iter: AsyncFluentIterator<number> = asyncIterator([1,2,3]);
```

