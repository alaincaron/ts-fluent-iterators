[**ts-fluent-iterators**](../../../README.md) • **Docs**

---

[ts-fluent-iterators](../../../README.md) / [Collectors](../README.md) / ObjectCollector

# Class: ObjectCollector\<V\>

A `Collector` that accepts key-value pairs of type `[string,V]` and collects them to a `Record<string,V>` object.

## Example

```ts
const c = new ObjectCollector<number>();
c.collect(['foo',1]);
c.collect(['bar' 2]);
c.collect(['foo',3]);
//c.result : { foo: 3, bar: 2 }
```

## Type Parameters

• **V**

the type of properties in the returned object.

## Implements

- [`Collector`](../interfaces/Collector.md)\<[`string`, `V`], `Record`\<`string`, `V`\>\>

## Constructors

### new ObjectCollector()

> **new ObjectCollector**\<`V`\>(`collisionHandler`?): [`ObjectCollector`](ObjectCollector.md)\<`V`\>

#### Parameters

• **collisionHandler?**: [`CollisionHandler`](../../../type-aliases/CollisionHandler.md)\<`string`, `V`\>

Specify how to handle collisions. Default is to ignore collisions, i.e. newer elements override previous ones.

#### Returns

[`ObjectCollector`](ObjectCollector.md)\<`V`\>

## Accessors

### result

> `get` **result**(): `Record`\<`string`, `V`\>

Returns the aggregated object.

#### Returns

`Record`\<`string`, `V`\>

The aggregated object resulting from collecting all objects

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`result`](../interfaces/Collector.md#result)

## Methods

### collect()

> **collect**(`a`): `void`

Collects an element.

#### Parameters

• **a**: [`string`, `V`]

The element being collected.

#### Returns

`void`

#### Implementation of

[`Collector`](../interfaces/Collector.md).[`collect`](../interfaces/Collector.md#collect)
