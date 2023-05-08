[ts-fluent-iterators](../../README.md) › [API](../index.md) ›
[Factory methods](../index.md#factories) › [iterator](iterator.md)

# iterator factory function

```typescript
function iterator<A>(iter: Iterable<A> | Iterator<A>): FluentIterator<A>;
```

Creates a new [FluentIterator<A>](../iterators/fluent_iterator.md) from an `Iterable<A>`
or an `Iterator<A>` object.  
This function is used to convert its argument into an `Iterator<A>` before
invoking the [FluentIterator's constructor](../iterators/fluent_iterator.md#constructor)

Example:

```typescript
import { iterator, FluentIterator } from 'ts-fluent-iterators';

const iter: FluentIterator<number> = iterator([1, 2, 3]);
```
