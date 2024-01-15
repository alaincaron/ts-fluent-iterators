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

- [[iterator]](FluentIterator.md#[iterator])
- [all](FluentIterator.md#all)
- [append](FluentIterator.md#append)
- [collect](FluentIterator.md#collect)
- [collectTo](FluentIterator.md#collectto)
- [collectToMap](FluentIterator.md#collecttomap)
- [collectToMap2](FluentIterator.md#collecttomap2)
- [collectToObject](FluentIterator.md#collecttoobject)
- [collectToSet](FluentIterator.md#collecttoset)
- [concat](FluentIterator.md#concat)
- [contains](FluentIterator.md#contains)
- [count](FluentIterator.md#count)
- [enumerate](FluentIterator.md#enumerate)
- [filter](FluentIterator.md#filter)
- [filterMap](FluentIterator.md#filtermap)
- [first](FluentIterator.md#first)
- [fold](FluentIterator.md#fold)
- [forEach](FluentIterator.md#foreach)
- [groupBy](FluentIterator.md#groupby)
- [groupBy2](FluentIterator.md#groupby2)
- [includes](FluentIterator.md#includes)
- [join](FluentIterator.md#join)
- [last](FluentIterator.md#last)
- [map](FluentIterator.md#map)
- [max](FluentIterator.md#max)
- [min](FluentIterator.md#min)
- [minmax](FluentIterator.md#minmax)
- [next](FluentIterator.md#next)
- [partition](FluentIterator.md#partition)
- [prepend](FluentIterator.md#prepend)
- [reduce](FluentIterator.md#reduce)
- [removeNull](FluentIterator.md#removenull)
- [skip](FluentIterator.md#skip)
- [skipWhile](FluentIterator.md#skipwhile)
- [some](FluentIterator.md#some)
- [take](FluentIterator.md#take)
- [takeWhile](FluentIterator.md#takewhile)
- [tally](FluentIterator.md#tally)
- [tap](FluentIterator.md#tap)
- [toAsync](FluentIterator.md#toasync)
- [toPromise](FluentIterator.md#topromise)
- [zip](FluentIterator.md#zip)
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
const iterator = iterator([1,2,3][Symbol.iterator]());
```

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`\<`A`, `any`, `undefined`\>

Used to make this [FluentIterator](FluentIterator.md) being seen as an
`Iterable<A>`. This allows them to be used in APIs expecting an
`Iterable<A>`

#### Returns

`Iterator`\<`A`, `any`, `undefined`\>

#### Implementation of

Iterable.[iterator]

___

### all

▸ **all**(`predicate`): `boolean`

Returns `true` if the [predicate](../README.md#predicate) argument evalatues to true for all items of this [FluentIterator](FluentIterator.md), false otherwsie.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | [`Predicate`](../README.md#predicate)\<`A`\> | The predicate being evaluated |

#### Returns

`boolean`

**`Example`**

```ts
iterator([1, 2]).all(x => x > 0); // true
iterator([1, 2]).all(x => x >= 2); // false
FluentIterator.empty().all(_ => false); // true;
```

___

### append

▸ **append**(`items`): [`FluentIterator`](FluentIterator.md)\<`A`\>

Returns a new [FluentIterator](FluentIterator.md) that is the result of appending its argument to this [FluentIterator](FluentIterator.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | `Iterator`\<`A`, `any`, `undefined`\> \| `Iterable`\<`A`\> | An `Iterator` or `Iterable` whose items are appended to this [FluentIterator](FluentIterator.md). |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

**`Example`**

```ts
iterator([1,2,3]).append([4,5,6])
// yield 1, 2, 3, 4, 5, 6
```

___

### collect

▸ **collect**(): `A`[]

Collects items into an array.

#### Returns

`A`[]

an array consisting of the elements of this `FluentIterator`

**`Example`**

```ts
const iter = iterator([1,2,3]);
const data = iter.collect();
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
const iter = iterator([1,2,3]);
const data = iter.collectTo(collector);
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
const iter = iterator("foo","bar","foobar")
const data = iter.collectToMap(s => s.length);
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
const iter = iterator("foo","bar","foobar")
const data = iter.collectToMap2(s => [s, s.length]);
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

a `Record` whose entries are the result of applying the `mapper` to the values of this [FluentIterator](FluentIterator.md).

**`Example`**

```ts
const iter = iterator("foo","bar","foobar")
const data = iter.collectToObject(s => [s, s.length]);
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
const iter = iterator([1,2,3,1,2,3]);
const data = iter.collectToSet();
// data is Set { 1,2,3 }
```

___

### concat

▸ **concat**(`...iterables`): [`FluentIterator`](FluentIterator.md)\<`A`\>

Returns a new [FluentIterator](FluentIterator.md) that is the result of apepending all its argument to this [FluentIterator](FluentIterator.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...iterables` | (`Iterator`\<`A`, `any`, `undefined`\> \| `Iterable`\<`A`\>)[] | An `Array of `Iterator` or `Iterable` whose items are appended to this [FluentIterator](FluentIterator.md). |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

**`Example`**

```ts
iterator([1,2,3]).concat([4,5,6], [7,8,9])
// yield 1, 2 ,3, 4, 5, 6, 7, 8, 9
```

___

### contains

▸ **contains**(`predicate`): `boolean`

Returns true if this [FluentIterator](FluentIterator.md) yields an element for which the [Predicate](../README.md#predicate) evaluates to true.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | [`Predicate`](../README.md#predicate)\<`A`\> | The predicate to evaluate. |

#### Returns

`boolean`

true if this [FluentIterator](FluentIterator.md) yields an element for which the [Predicate](../README.md#predicate) evaluates to true, false otherwise.

___

### count

▸ **count**(): `number`

Returns the number of items in this [FluentIterator](FluentIterator.md).

#### Returns

`number`

**`Example`**

```ts
iterator([1,2]).count(); // 2
FluentIterator.empty().count(); 0
```

___

### enumerate

▸ **enumerate**(`start?`): [`FluentIterator`](FluentIterator.md)\<[`A`, `number`]\>

Returns a new [FluentIterator](FluentIterator.md) that yields pairs of elements
consisting of the elements yielded by this
@{link FluentIterator} and their index in the iteration.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `start` | `number` | `0` | The starting index |

#### Returns

[`FluentIterator`](FluentIterator.md)\<[`A`, `number`]\>

**`Example`**

```ts
const iter = iterator(['a', 'b', 'c']);
const enumerated = iter.enumerate(10);
// enumerated will yield ["a", 10], ["b", 11], ["c", 12]
```

___

### filter

▸ **filter**(`predicate`): [`FluentIterator`](FluentIterator.md)\<`A`\>

Returns a new [FluentIterator](FluentIterator.md) consisting of elements for which the `predicate` evaluates to true.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | [`Predicate`](../README.md#predicate)\<`A`\> | the predicate on which the evaluate the items. |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

a new [FluentIterator](FluentIterator.md) consisting of elements of this [FluentIterator](FluentIterator.md) for which the `predicate` evaluates to true.

**`Example`**

```ts
iterator([1,8,2,3,4,6]).filter(x => x % 2 === 1);
// yields 1, 2
```

___

### filterMap

▸ **filterMap**\<`B`\>(`mapper`): [`FluentIterator`](FluentIterator.md)\<`B`\>

Returns a new [FluentIterator](FluentIterator.md) consisting of applying the
[Mapper](../README.md#mapper) to all elements of this [FluentIterator](FluentIterator.md) and
filtering those for which the [Mapper](../README.md#mapper) returned null or
undefined

#### Type parameters

| Name | Description |
| :------ | :------ |
| `B` | The type of the elements of the returned [FluentIterator](FluentIterator.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapper` | [`Mapper`](../README.md#mapper)\<`A`, `undefined` \| ``null`` \| `B`\> | Transformation applied to elements of this [FluentIterator](FluentIterator.md) |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`B`\>

A new [FluentIterator](FluentIterator.md)

**`Remarks`**

```ts
iter.filterMap(mapper)
```
is equivalent to
```ts
iter.map(mapper).removeNull()
```

___

### first

▸ **first**(): `undefined` \| `A`

Returns the first element of this [FluentIterator](FluentIterator.md) or `undefined` if this [FluentIterator](FluentIterator.md) is empty.

#### Returns

`undefined` \| `A`

The first element of this [FluentIterator](FluentIterator.md) or `undefined`.

___

### fold

▸ **fold**\<`B`\>(`reducer`, `initialValue`): `B`

Executes the [reducer](../README.md#reducer) function on each element
of this [FluentIterator](FluentIterator.md), in order, passing in
the return value from the calculation on the preceding element. The
final result of running the reducer across all elements of the array
is a single value.

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reducer` | [`Reducer`](../README.md#reducer)\<`A`, `B`\> | The reducer to be applied at each iteration. |
| `initialValue` | `B` | The value of the accumulator to be used in the first call to `reducer` |

#### Returns

`B`

**`Param Type`**

B the type into which the elements are being folded to

**`Remarks`**

If the [FluentIterator](FluentIterator.md) is empty, `initialValue` is returned.

**`Example`**

```ts
To compute the sum of elements of an array:
const sum = iterator([1,2,3])
   .fold((acc, x) => acc + x, 0)
// sum = 6
```

___

### forEach

▸ **forEach**(`mapper`): `void`

Applies the [mapper](../README.md#mapper) to each element of this [FluentIterator](FluentIterator.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapper` | [`Mapper`](../README.md#mapper)\<`A`, `any`\> | the operation to be invoked on each element. |

#### Returns

`void`

**`Remarks`**

The results of invoking the `mapper` are ignored unless it throws.

**`Example`**

```ts
iter.forEach(console.log)
```

___

### groupBy

▸ **groupBy**\<`K`\>(`mapper`): `Map`\<`K`, `A`[]\>

Returns a `Map` where keys are the result of applying the parameter [mapper](../README.md#mapper) to the elements of the
this [FluentIterator](FluentIterator.md) and the values are Arrays of
the elements that are mapped to the same key.

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapper` | [`Mapper`](../README.md#mapper)\<`A`, `K`\> | The [Mapper](../README.md#mapper) used to group items. |

#### Returns

`Map`\<`K`, `A`[]\>

**`Example`**

```ts
iterator([1,2,3]).groupBy(x => x % 2 === 0);
// Map { true => [2], false => [1, 3]}
```

___

### groupBy2

▸ **groupBy2**\<`K`, `V`\>(`mapper`): `Map`\<`K`, `V`[]\>

Returns a `Map` where entries are the result of applying the parameter [mapper](../README.md#mapper) to the elements of the
this [FluentIterator](FluentIterator.md),

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapper` | [`Mapper`](../README.md#mapper)\<`A`, [`K`, `V`]\> | The [Mapper](../README.md#mapper) used to group items. |

#### Returns

`Map`\<`K`, `V`[]\>

**`Example`**

```ts
iterator([1,2,3]).groupBy2(x => [x % 2 === 0, 2 * x];
// Map { true => [4], false => [2, 6]}
```

___

### includes

▸ **includes**(`target`): `boolean`

Returns true if this [FluentIterator](FluentIterator.md) yields an element equals to `target`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `A` | value to look for |

#### Returns

`boolean`

true if this [FluentIterator](FluentIterator.md) yields an element equals to `target`, false otherwise.
@

**`Remarks`**

```ts
iter.includes(target)
```
is equivalent to
```ts
iter.contains(x => x === target)
```

___

### join

▸ **join**(`separator?`, `prefix?`, `suffix?`): `string`

Joins items of this [FluentIterator](FluentIterator.md) into a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `separator?` | `string` | string used to delimite elements |
| `prefix?` | `string` | string used to prefix the resulting string |
| `suffix?` | `string` | - |

#### Returns

`string`

**`Example`**

```ts
iterator([1,2,3]).join(',','[',']');
// "[1,2,3]"
```

**`Remarks`**

The items are converted into a string using string-interpolation.

___

### last

▸ **last**(): `undefined` \| `A`

Returns the last element of this [FluentIterator](FluentIterator.md)

#### Returns

`undefined` \| `A`

**`Example`**

```ts
iterator([1,2]).last();
// 2

FluentIterator.empty().last()
// undefined
```

___

### map

▸ **map**\<`B`\>(`mapper`): [`FluentIterator`](FluentIterator.md)\<`B`\>

Returns a new [FluentIterator](FluentIterator.md) consisting of applying the [Mapper](../README.md#mapper) to all elements of this [FluentIterator](FluentIterator.md).

#### Type parameters

| Name | Description |
| :------ | :------ |
| `B` | The type of the elements of the returned [FluentIterator](FluentIterator.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapper` | [`Mapper`](../README.md#mapper)\<`A`, `B`\> | Transformation applied to elements of this [FluentIterator](FluentIterator.md) |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`B`\>

A new [FluentIterator](FluentIterator.md)

**`Example`**

```ts
const iter = iterator(['foo','bar',foobar'])
iter.map(s => s.length)
// yields 3, 3, 6
```

___

### max

▸ **max**(`comparator?`): `undefined` \| `A`

Returns the maximum element according to the argument [comparator](../README.md#comparator).

#### Parameters

| Name | Type |
| :------ | :------ |
| `comparator?` | [`Comparator`](../README.md#comparator)\<`A`\> |

#### Returns

`undefined` \| `A`

**`Example`**

```ts
iterator([1,2]).max();
// 2

iterator(['foo','foobar']).max(
  (s1,s2) => s1.length - s2.length
);
// 'foobar'

FluentIterator.empty().max(); // undefined
```

___

### min

▸ **min**(`comparator?`): `undefined` \| `A`

Returns the minimum element according to the argument [comparator](../README.md#comparator).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `comparator?` | [`Comparator`](../README.md#comparator)\<`A`\> | The {link Comparator} used to order the elements. |

#### Returns

`undefined` \| `A`

**`Example`**

```ts
iterator([1,2]).min();
// 1

iterator(['foo','foobar']).min(
   (s1,s2) => s1.length - s2.length
);
// 'foo'
(
FluentIterator.empty().min();
// undefined
```

___

### minmax

▸ **minmax**(`comparator?`): `undefined` \| [`MinMax`](../interfaces/MinMax.md)\<`A`\>

Returns the minimum and maximum element according to the argument [comparator](../README.md#comparator).

#### Parameters

| Name | Type |
| :------ | :------ |
| `comparator?` | [`Comparator`](../README.md#comparator)\<`A`\> |

#### Returns

`undefined` \| [`MinMax`](../interfaces/MinMax.md)\<`A`\>

**`Example`**

```ts
iterator([1,2]).minmax();
// { min: 1, max: 2}

iterator(['foo','foobar']).minmax(
   (s1,s2) => s1.length - s2.length
);
// { min: 'foo', max: 'foobar' }

FluentIterator.empty().minmax();
// undefined
```

___

### next

▸ **next**(): `IteratorResult`\<`A`, `any`\>

Used to make this [FluentIterator](FluentIterator.md) being seen as an
`Iterator<A>`.  This allows [FluentIterator](FluentIterator.md) objects to be
used in APIs expecting an `Iterator<A>`

#### Returns

`IteratorResult`\<`A`, `any`\>

#### Implementation of

Iterator.next

___

### partition

▸ **partition**(`size`): [`FluentIterator`](FluentIterator.md)\<`A`[]\>

Returns a new [FluentIterator](FluentIterator.md) consiting of
partitions (arrays) of at most `size` elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | `number` | The size of the partitions. |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`[]\>

**`Example`**

```ts
iterator([1, 2, 3, 4, 5]).partition(2);
// yields [1, 2], [3, 4], [5]
```

**`Remarks`**

The last partition may contain less than `size` elements but is
never empty.

___

### prepend

▸ **prepend**(`items`): [`FluentIterator`](FluentIterator.md)\<`A`\>

Returns a new [FluentIterator](FluentIterator.md) that is the result of prepending its argument to this [FluentIterator](FluentIterator.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | `Iterator`\<`A`, `any`, `undefined`\> \| `Iterable`\<`A`\> | An `Iterator` or `Iterable` whose items are prepended to this [FluentIterator](FluentIterator.md). |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

**`Example`**

```ts
iterator([1,2,3]).prepend([4,5,6])
// yield 4, 5, 6, 1, 2, 3
```

___

### reduce

▸ **reduce**(`reducer`, `initialValue?`): `undefined` \| `A`

Special case of [FluentIterator.fold](FluentIterator.md#fold) where items being iteraded on and the accumulator are of the same type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reducer` | [`Reducer`](../README.md#reducer)\<`A`, `A`\> | The reducer to be applied at each iteration. |
| `initialValue?` | `A` | The value of the accumulator to be used in the first call to `reducer`. If omitted, the first element of this [FluentIterator](FluentIterator.md) is used. |

#### Returns

`undefined` \| `A`

**`Remarks`**

If the [FluentIterator](FluentIterator.md) is empty, `initialValue` is returned.

**`Example`**

```ts
To compute the sum of elements of an array:
const sum = iterator([1,2,3])
   .reduce((acc, x) => acc + x)
// sum = 6
```

___

### removeNull

▸ **removeNull**(): [`FluentIterator`](FluentIterator.md)\<`A`\>

Returns a new [FluentIterator](FluentIterator.md) consisting of elements of this [FluentIterator](FluentIterator.md) that are not `null` nor `undefined`

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

a new [FluentIterator](FluentIterator.md) where all the `null` or `undefined` elements are removed.

___

### skip

▸ **skip**(`n`): [`FluentIterator`](FluentIterator.md)\<`A`\>

Returns a [FluentIterator](FluentIterator.md) skipping the first `n` elements of this [FluentIterator](FluentIterator.md) and then yielding the subsequent ones.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The number of elements to skip |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

a [FluentIterator](FluentIterator.md) skpping the first `n` elements of this [FluentIterator](FluentIterator.md).

**`Remarks`**

If there are less than `n` elements in this [FluentIterator](FluentIterator.md), then an empty [FluentIterator](FluentIterator.md) is returned.

___

### skipWhile

▸ **skipWhile**(`predicate`): [`FluentIterator`](FluentIterator.md)\<`A`\>

Returns a new [FluentIterator](FluentIterator.md) that skips elements of this
[FluentIterator](FluentIterator.md) until the [predicate](../README.md#predicate)
evaluates to `true` and yields the subsequent ones.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | [`Predicate`](../README.md#predicate)\<`A`\> | The predicate being evaluated |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

**`Example`**

```ts
iterator([1, 2, 3]).skipWhile(x => x < 2); // yields 2, 3
iterator([1, 2, 3]).skipWhile(x => x > 2); // yields 1, 2, 3
```

___

### some

▸ **some**(`predicate`): `boolean`

Returns `true` if the [predicate](../README.md#predicate) argument evalatues to true for some items of this [FluentIterator](FluentIterator.md), false otherwsie.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | [`Predicate`](../README.md#predicate)\<`A`\> | The predicate being evaluated |

#### Returns

`boolean`

**`Example`**

```ts
iterator([1, 2]).some(x => x > 1); // true
iterator([1, 2]).some(x => x > 2); // false
FluentIterator.empty().some(_ => true); // false;
```

___

### take

▸ **take**(`n`): [`FluentIterator`](FluentIterator.md)\<`A`\>

Returns a [FluentIterator](FluentIterator.md) yielding the first `n` elements of this [FluentIterator](FluentIterator.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The number of elements to take |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

a [FluentIterator](FluentIterator.md) yielding the first `n` elements of this [FluentIterator](FluentIterator.md).

**`Remarks`**

If there are less than `n` elements in this [FluentIterator](FluentIterator.md), then only the available elements will be yielded.

___

### takeWhile

▸ **takeWhile**(`predicate`): [`FluentIterator`](FluentIterator.md)\<`A`\>

Returns a new [FluentIterator](FluentIterator.md) that yields elements of this [FluentIterator](FluentIterator.md) while the [predicate](../README.md#predicate) evaluates to `true`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | [`Predicate`](../README.md#predicate)\<`A`\> | The predicate being evaluated |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

**`Example`**

```ts
iterator([1, 2, 3]).takeWhile(x => x < 2); // yields 1
iterator([1, 2, 3]).takeWhile(x => x > 2); // empty iterator
```

___

### tally

▸ **tally**(): `Map`\<`A`, `number`\>

Returns a `Map` of the count of the occurences of each items of
this [FluentIterator](FluentIterator.md),

#### Returns

`Map`\<`A`, `number`\>

**`Example`**

```ts
iterator([foo','bar','foo').tally();
// Map { 'foo' => 2, bar => 1 }
```

___

### tap

▸ **tap**(`mapper`): [`FluentIterator`](FluentIterator.md)\<`A`\>

Returns a new [FluentIterator](FluentIterator.md) that
yields the same elements as this [FluentIterator](FluentIterator.md)
and executes the [mapper](../README.md#mapper) on each element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapper` | [`Mapper`](../README.md#mapper)\<`A`, `any`\> | the operation to be invoked on each element. |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

**`Remarks`**

This can be useful to see intermediate steps of complex [FluentIterator](FluentIterator.md).  The results of invoking the `mapper` are ignored unless it throwws.

**`Example`**

```ts
const iter = iterator([1,2,3])
iter.tap(x => console.log(`before filter ${x}`))
     .filter(x => x % 2 === 0)
     .tap(x => console.log(`after filter: ${x}`))
     .collect();
// ouputs:
// before filter 1
// before filter 2
// after filter: 2
// before filter 3
// result : [ 2 ]
```

___

### toAsync

▸ **toAsync**(): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

Converts this [FluentIterator](FluentIterator.md) into an [AsyncFluentIterator](AsyncFluentIterator.md)

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

An [AsyncFluentIterator](AsyncFluentIterator.md)
yielding the same elements as this [FluentIterator](FluentIterator.md)

___

### toPromise

▸ **toPromise**(): [`PromiseIterator`](PromiseIterator.md)\<`A`\>

Converts this [FluentIterator](FluentIterator.md) into a [PromiseIterator](PromiseIterator.md)

#### Returns

[`PromiseIterator`](PromiseIterator.md)\<`A`\>

A [PromiseIterator](PromiseIterator.md) yielding the
same elements as this [FluentIterator](FluentIterator.md)

___

### zip

▸ **zip**\<`B`\>(`other`): [`FluentIterator`](FluentIterator.md)\<[`A`, `B`]\>

Returns a new [FluentIterator](FluentIterator.md) that yields pairs of elements
yielded by each Iterators which are navigated in parallel.
The length of the new [FluentIterator](FluentIterator.md) is equal to the length the shorter iterator.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `B` | The type of elements of the `other` iterator. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | `Iterator`\<`B`, `any`, `undefined`\> \| `Iterable`\<`B`\> | The iterator that is combined with this one. |

#### Returns

[`FluentIterator`](FluentIterator.md)\<[`A`, `B`]\>

**`Example`**

```ts
const iter = iterator([1, 2, 3]);
const zipped = iter.zip(['a', 'b']);
// zipped will yield [1,"a"], [2,"b"]
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
const iter = FluentIterator.from([1,2,3]);
```
