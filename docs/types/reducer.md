[ts-fluent-iterators - v1.1.1](../../README.md) › [API](../index.md) › [types](../index.md#Types) › [Reducer](reducer.md)

# Type: Reducer <**A**,**B**>

Represents a binary operator accepting argument of types `B` and `A` and returning a
value of type  `B`.  
  
Definition:
```typescript
type Reducer<A,B> = (B: b, a: A) => B;
```

Example:
```typescript
const sum: Reducer<number, number> = (b,a) => b + a;
```

