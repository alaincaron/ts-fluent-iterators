[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / ObjectCollector

# Class: ObjectCollector\<V\>

[Collectors](../modules/Collectors.md).ObjectCollector

A `Collector` that accepts key-value pairs of type `[string,V]` and collects them to a `Record<string,V>` object.

**`Example`**

```ts
const c = new ObjectCollector<number>();
c.collect(['foo',1]);
c.collect(['bar' 2]);
c.collect(['foo',3]);
//c.result : { foo: 3, bar: 2 }
```

## Type parameters

| Name | Description                                    |
| :--- | :--------------------------------------------- |
| `V`  | the type of properties in the returned object. |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<[`string`, `V`], `Record`\<`string`, `V`\>\>

## Table of contents

### Constructors

- [constructor](Collectors.ObjectCollector.md#constructor)

## Constructors

### constructor

• **new ObjectCollector**\<`V`\>(`collisionHandler?`): [`ObjectCollector`](Collectors.ObjectCollector.md)\<`V`\>

#### Type parameters

| Name |
| :--- |
| `V`  |

#### Parameters

| Name                | Type                                                                 | Description                                                                                                    |
| :------------------ | :------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `collisionHandler?` | [`CollisionHandler`](../README.md#collisionhandler)\<`string`, `V`\> | Specify how to handle collisions. Default is to ignore collisions, i.e. newer elements override previous ones. |

#### Returns

[`ObjectCollector`](Collectors.ObjectCollector.md)\<`V`\>
