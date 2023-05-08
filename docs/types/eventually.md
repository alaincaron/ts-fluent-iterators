[ts-fluent-iterators](../../README.md) › [API](../index.md) › [types](../index.md#Types) › [Eventually](eventually.md)

# Type: Eventually <**A**>

Represents a value of type `A` or `Promise<A>`.

Definition:

```typescript
type Eventually<A> = A | Promise<A>;
```

Example:

```typescript
const value: Eventually<number> = Promise.resolve(5);
```
