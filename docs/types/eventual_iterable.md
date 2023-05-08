[ts-fluent-iterators](../../README.md) › [API](../index.md) › [types](../index.md#Types) › [EventualIterable](eventual_iterable.md)

# Type: EventualIterable <**A**>

Represents either an Iterable or an AsyncIterable yielding values of
type `A`.

Definition:

```typescript
type EventualIterable<A> = Iterable<A> | AsyncIterable<A>;
```

Example:

```typescript
const numbers: EventualIterable<number> = [1, 2, 3];
```
