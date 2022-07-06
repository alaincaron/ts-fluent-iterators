[ts-fluent-iterators - v1,0,0](../../README.md) › [API](../index.md) › [types](../index.md#Types) › [EventualReducer](eventual_reducer.md)

# Type: EventualReducer <**A**,**B**>

Represents a binary operator accepting argument of types `B` and `A` and returning a
value of type  [`Eventually<B>`](eventually.md).  
  
Definition:
```typescript
type EventualReducer<A,B> = (B: b, a: A) => Eventually<B>;
```

Example:
```typescript
const sum: EventualReducer<number, number> = (b,a) => Promise.resolve(b + a);
```

