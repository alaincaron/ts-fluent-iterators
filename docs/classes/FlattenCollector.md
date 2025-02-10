[**ts-fluent-iterators**](../README.md)

---

[ts-fluent-iterators](../README.md) / FlattenCollector

# Class: FlattenCollector\<A\>

A `Collector` that accepts `Iterable<A>` or `Iterator<A>` and returns a `FluentIterator<A>` that consists of the concatenation of all the collected iterable objects.

## Example

```ts
const c = new FlattenCollector<number>();
c.collect([1,2]);
c.collect([3,4]);
c.result.collect() : [1,2,3,4]
```

## Type Parameters

• **A**

the type of elements being iterated on.

## Implements

- [`Collector`](../interfaces/Collector.md)\<`Iterable`\<`A`\> \| `Iterator`\<`A`\>, [`FluentIterator`](FluentIterator.md)\<`A`\>\>

## Accessors

### result

#### Get Signature

> **get** **result**(): [`FluentIterator`](FluentIterator.md)\<`A`\>

Returns the aggregated object.

##### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

The aggregated object resulting from collecting all objects

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`result`](../interfaces/Collector.md#result)

## Methods

### collect()

> **collect**(`a`): `void`

Collects an element.

#### Parameters

##### a

The element being collected.

`Iterable`\<`A`, `any`, `any`\> | `Iterator`\<`A`, `any`, `any`\>

#### Returns

`void`

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`collect`](../interfaces/Collector.md#collect)
