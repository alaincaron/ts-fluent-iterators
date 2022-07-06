[ts-fluent-iterators - v1,0,0](../../README.md) › [API](../index.md) › [types](../index.md#Types) › [EventualMapper](eventual_mapper.md)

# Type: EventualMapper <**A**,**B**>

Represents a function accepting argument of type `A` and returning a
value of type  [`Eventually<B>`](eventually.md).  
  
Definition:
```typescript
type EventualMapper<A,B> = (a: A) => Eventually<B>;
```

Example:
```typescript
const doubleValue: EventualMapper<number, number> = (x) => 2 * x;
```

