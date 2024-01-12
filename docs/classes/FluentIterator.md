[ts-fluent-iterators](../README.md) / FluentIterator

# Class: FluentIterator\<A\>

Iterator with a Fluent interface.

## Type parameters

| Name | Description |
| :------ | :------ |
| `A` | The type of elements being iterated. |

## Implements

- `Iterator`\<`A`\>
- `Iterable`\<`A`\>

## Table of contents

### Constructors

- [constructor](FluentIterator.md#constructor)

### Methods

- [collect](FluentIterator.md#collect)
- [collectTo](FluentIterator.md#collectto)
- [collectToMap](FluentIterator.md#collecttomap)
- [collectToMap2](FluentIterator.md#collecttomap2)
- [collectToObject](FluentIterator.md#collecttoobject)
- [collectToSet](FluentIterator.md#collecttoset)
- [empty](FluentIterator.md#empty)
- [from](FluentIterator.md#from)

## Constructors

### constructor

• **new FluentIterator**\<`A`\>(`iter`): [`FluentIterator`](FluentIterator.md)\<`A`\>

Creates a `FluentIterator` by wrapping an `Iterator`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> | The `Iterator` being wrapped into a `FluentIterator` |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

**`Example`**

```ts
const iterator = new FluentIterator([1,2,3][Symbol.iterator]());
```

## Methods

### collect

▸ **collect**(): `A`[]

Collects items into an array.

#### Returns

`A`[]

an array consisting of the elements of this `FluentIterator`

**`Example`**

```ts
const iterator = FluentIterator.from([1,2,3]);
const data = iterator.collect();
// data is [1,2,3]
```

___

### collectTo

▸ **collectTo**\<`B`\>(`collector`): `B`

Collects items from the `FluentIterator` into a `Collector`.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `B` | The result type of the `Collector`. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `collector` | [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `B`\> | The `Collector` into which to collect the items |

#### Returns

`B`

The result of the `collector`

**`Example`**

```ts
const collector = new ArrayCollector<string>;
const iterator = FluentIterator.from([1,2,3]);
const data = iterator.collectTo(collector);
// data is [1,2,3]
```

___

### collectToMap

▸ **collectToMap**\<`K`\>(`mapper`, `collisionHandler?`): `Map`\<`K`, `A`\>

Collects items into a `Map` by mapping values into keys.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `K` | The type of the keys of the `Map` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapper` | [`Mapper`](../README.md#mapper)\<`A`, `K`\> | Maps the values into keys |
| `collisionHandler?` | [`CollisionHandler`](../README.md#collisionhandler)\<`K`, `A`\> | Specifies how to handle the collision. Default is to ignore collision. |

#### Returns

`Map`\<`K`, `A`\>

a Map whose keys are the result of applying the `mapper` to the values of this [FluentIterator](FluentIterator.md) and the values are iterated items.

**`Example`**

```ts
const iterator = FluentIterator.from("foo","bar","foobar")
const data = iterator.collectToMap(s => s.length);
// data is Map {3 => "foo", 6 => "foobar"}
```

___

### collectToMap2

▸ **collectToMap2**\<`K`, `V`\>(`mapper`, `collisionHandler?`): `Map`\<`K`, `V`\>

Collects items into a `Map` by mapping values into keys and new value

#### Type parameters

| Name | Description |
| :------ | :------ |
| `K` | The type of the keys of the `Map` |
| `V` | The type of the values of the `Map` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapper` | [`Mapper`](../README.md#mapper)\<`A`, [`K`, `V`]\> | Maps the values into [key, values] pairs |
| `collisionHandler?` | [`CollisionHandler`](../README.md#collisionhandler)\<`K`, `V`\> | Specifies how to handle the collision. Default is to ignore collision. |

#### Returns

`Map`\<`K`, `V`\>

a Map whose entries are the result of applying the `mapper` to the values of this [FluentIterator](FluentIterator.md).

**`Example`**

```ts
const iterator = FluentIterator.from("foo","bar","foobar")
const data = iterator.collectToMap2(s => [s, s.length]);
// data is Map { "foo" => 3, "bar" => 3, "foobar" => 6 }
```

___

### collectToObject

▸ **collectToObject**\<`V`\>(`mapper`, `collisionHandler?`): `Record`\<`string`, `V`\>

Collects items into a `Record` by mapping values into keys and new value

#### Type parameters

| Name | Description |
| :------ | :------ |
| `V` | The type of the values of the `Map` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapper` | [`Mapper`](../README.md#mapper)\<`A`, [`string`, `V`]\> | Maps the values into [key, values] pairs |
| `collisionHandler?` | [`CollisionHandler`](../README.md#collisionhandler)\<`string`, `V`\> | Specifies how to handle the collision. Default is to ignore collision. |

#### Returns

`Record`\<`string`, `V`\>

a Map whose entries are the result of applying the `mapper` to the values of this [FluentIterator](FluentIterator.md).

**`Example`**

```ts
const iterator = FluentIterator.from("foo","bar","foobar")
const data = iterator.collectToObject(s => [s, s.length]);
// data is { foo: 3, bar: 3, foobar: 6 }
```

___

### collectToSet

▸ **collectToSet**(): `Set`\<`A`\>

Collects items into a `Set`.

#### Returns

`Set`\<`A`\>

a Set consisting of the elements of this [FluentIterator](FluentIterator.md)

**`Example`**

```ts
const iterator = FluentIterator.from([1,2,3,1,2,3]);
const data = iterator.collectToSet();
// data is Set { 1,2,3 }
```

___

### empty

▸ **empty**\<`A`\>(): [`FluentIterator`](FluentIterator.md)\<`A`\>

Creates an empty `FluentIterator`.  The returned iterator will not yield any element.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `A` | `never` | the type of elements of the `FluentIterator` |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

An empty `FluentIterator`

___

### from

▸ **from**\<`A`\>(`generator`): [`FluentIterator`](FluentIterator.md)\<`A`\>

Creates a `FluentIterator` from an `IteratorGenerator`.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | the type of elements of the `FluentIterator` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `generator` | [`IteratorGenerator`](../README.md#iteratorgenerator)\<`A`\> | Used to generate an `Iterator` that will be wrapped into a `FluentIterator` |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

A new `FluentIterator`

**`Example`**

```ts
const iterator = FluentIterator.from([1,2,3]);
```
