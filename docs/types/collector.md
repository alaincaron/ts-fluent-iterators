[ts-fluent-iterators](../../README.md) › [API](../index.md) › [types](../index.md#Types) › [Collector](collector.md)

# Type: Collector <**A**,**B**>

Represents a object accepting arguments of type `A` and collecting them
value into a value of type `B`.

Definition:

```typescript
interface Collector<A, B> {
  collect(a: A): void;
  get result(): B;
}
```

Example:

```typescript
class ArrayCollector<A> implements Collector<A, A[]> {
  private readonly acc: A[] = [];

  collect(a: A): void {
    this.acc.push(a);
  }

  get result(): A[] {
    return this.acc;
  }
}
```

