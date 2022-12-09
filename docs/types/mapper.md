[ts-fluent-iterators](../../README.md) › [API](../index.md) › [types](../index.md#Types) › [Mapper](mapper.md)

# Type: Mapper <**A**,**B**>

Represents a function accepting argument of type `A` and returning a
value of type  `B`.  
  
Definition:
```typescript
type Mapper<A,B> = (a: A) => B;
```

Example:
```typescript
const doubleValue: Mapper<number, number> = (x) => 2 * x;
```

