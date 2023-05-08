[ts-fluent-iterators](../../README.md) › [API](../index.md) › [types](../index.md#Types) › [Comparator](comparator.md)

# Type: Comparator<**A**>

Represents a function accepting tow arguments of type `A` and returning a
a number value greater than 0 if the first parameter is larger than
the second one, less than 0 if the first parameter is smaller than the
second one and 0 if they are equal.

Definition:

```typescript
type Comparator<A> = (a1: A, a2: A) => number;
```

Example:

```typescript
const compare: Comparator<number> = (a, b) => a - b;
```
