[ts-fluent-iterators](../../README.md) › [API](../index.md) › [types](../index.md#Types) › [Predicate](predicate.md)

# Type: Predicate <**A**>

Represents a function accepting argument of type `A` and returning a
value of type `boolean`.

Definition:

```typescript
type Predicate<A> = (a: A) => boolean;
```

Example:

```typescript
const isEven: Predicate<number> = x => x % 2 === 0;
```
