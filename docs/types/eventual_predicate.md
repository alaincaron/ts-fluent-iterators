[ts-fluent-iterators - v1,0,0](../../README.md) › [API](../index.md) › [types](../index.md#Types) › [EventualPredicate](eventual_prediate.md)

# Type: EventualPredicate <**A**>

Represents a function accepting argument of type `A` and returning a
value of type  [`Eventually<boolean>`](eventually.md).  
  
Definition:
```typescript
type EventualPredicate<A,B> = (a: A) => Eventually<boolean>;
```

Example:
```typescript
const isEven: EventualPredicate<number> =
    (x) => Promise.resolve(x % 2 === 0);
```

