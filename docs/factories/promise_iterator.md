[ts-fluent-iterators - v1.1.1](../../README.md) › [API](../index.md) ›
[Factory methods](../index.md#factories) › [promiseIterator](promise_iterator.md)

# promiseIterator factory function
```typescript
function promiseIterator<A>(
   iter: Iterator<Promise<A>> | Iterable<Promise<A>>
):  PromiseIterator<A>
```

Creates a new [`PromiseIterator<A>`](../iterators/promise_iterator.md) from an `Iterator<Promise<A>>`
or an `Iterable<Promise<A>>` object.  
This function is used to convert its argument to an `Iterator<Promise<A>>`
before 
invoking the [PromiseIterator's constructor](../iterators/promise_iterator.md#constructor)

Example:
```typescript
import { 
   promiseIterator, 
   PromiseIterators, 
   PromiseIterator 
} from "ts-fluent-iterators";

const iter: PromiseIterator<number> = 
   promiseIterator(Iterators.toPromise([1,2,3]));
```

