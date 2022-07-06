[ts-fluent-iterators - v1,0,0](../../README.md) › [API](../index.md) › [types](../index.md#Types) › [EventualIterator](eventual_iterator.md)

# Type: EventualIterator <**A**>

Represents either an Iterator or an AsyncIterator yielding values of type `A`.
  
Definition:
```typescript
type EventualIterator<A> = Iterator<A> | AsyncIterator<A>
```

Example:
```typescript
const numbers: EventualIterator<number> = [1,2,3][Symbol.iterator]();
```

