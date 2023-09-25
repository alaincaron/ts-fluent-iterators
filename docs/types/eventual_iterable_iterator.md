[ts-fluent-iterators](../../README.md) › [API](../index.md) › [types](../index.md#Types) › [EventualIterableIterator](eventual_iterable_iterator.md)

# Type: EventualIterableIterator <**A**>

Represents either an IterableIterator or an AsyncIterableIterator yielding values of type `A`.

Definition:

```typescript
type EventualIterableIterator<A> = IterableIterator<A> | AsyncIterableIterator<A>;
```

Example:

```typescript
const numbers: EventualIterableIterator<number> = [1, 2, 3][Symbol.iterator]();
```
