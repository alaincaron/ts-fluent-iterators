ts-fluent-iterators

# ts-fluent-iterators

## Table of contents

### Namespaces

- [AsyncGenerators](modules/AsyncGenerators.md)
- [Collectors](modules/Collectors.md)
- [Comparators](modules/Comparators.md)
- [Generators](modules/Generators.md)

### Classes

- [AsyncFluentIterator](classes/AsyncFluentIterator.md)
- [FluentIterator](classes/FluentIterator.md)
- [PromiseIterator](classes/PromiseIterator.md)

### Interfaces

- [ArrayGenerator](interfaces/ArrayGenerator.md)
- [AsyncArrayGenerator](interfaces/AsyncArrayGenerator.md)
- [MinMax](interfaces/MinMax.md)

### Type Aliases

- [AsyncIteratorGenerator](README.md#asynciteratorgenerator)
- [AsyncIteratorLike](README.md#asynciteratorlike)
- [CollisionHandler](README.md#collisionhandler)
- [Comparator](README.md#comparator)
- [EventualIterable](README.md#eventualiterable)
- [EventualIterableIterator](README.md#eventualiterableiterator)
- [EventualIterator](README.md#eventualiterator)
- [EventualIteratorGenerator](README.md#eventualiteratorgenerator)
- [EventualMapper](README.md#eventualmapper)
- [EventualPredicate](README.md#eventualpredicate)
- [EventualReducer](README.md#eventualreducer)
- [Eventually](README.md#eventually)
- [IteratorGenerator](README.md#iteratorgenerator)
- [IteratorLike](README.md#iteratorlike)
- [Mapper](README.md#mapper)
- [Predicate](README.md#predicate)
- [Reducer](README.md#reducer)

### Variables

- [CollisionHandlers](README.md#collisionhandlers)

### Functions

- [asyncIterator](README.md#asynciterator)
- [emptyIterator](README.md#emptyiterator)
- [iterator](README.md#iterator)
- [promiseIterator](README.md#promiseiterator)
- [toPromiseIterator](README.md#topromiseiterator)

## Type Aliases

### AsyncIteratorGenerator

Ƭ **AsyncIteratorGenerator**\<`E`\>: [`AsyncArrayGenerator`](interfaces/AsyncArrayGenerator.md)\<`E`\> \| [`AsyncIteratorLike`](README.md#asynciteratorlike)\<`E`\>

An object that can generate an asynchronous iterator.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `E` | the type of the objects that can be iterated on |

___

### AsyncIteratorLike

Ƭ **AsyncIteratorLike**\<`E`\>: (`i`: `number`) => `Promise`\<`E`\> \| `AsyncIterator`\<`E`\> \| `AsyncIterable`\<`E`\> \| `Iterable`\<`E`\>

An object that behaves like an `AsyncIterator`.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `E` | the type of the objects that can be iterated on |

___

### CollisionHandler

Ƭ **CollisionHandler**\<`K`, `V`\>: (`k`: `K`, `oldValue`: `V`, `newValue`: `V`) => `V`

A collision handler for collectors. Used by `Collectors` `MapCollector` and `ObjectCollector` to handle collisions.
The value returned will be the new mapping for the key. It can also throw to abort the collecting of elements.

**`Throws`**

It can throw to reject the collision and abort the collecting

#### Type parameters

| Name | Description |
| :------ | :------ |
| `K` | the keys on which collisions are detected. |
| `V` | the type of the values |

#### Type declaration

▸ (`k`, `oldValue`, `newValue`): `V`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `k` | `K` | The key for which the collision is detected. |
| `oldValue` | `V` | The current value mapped to the key `k` |
| `newValue` | `V` | The new value to be mapped to the key `k` |

##### Returns

`V`

___

### Comparator

Ƭ **Comparator**\<`A`\>: (`a1`: `A`, `a2`: `A`) => `number`

A function used to compare objects for ordering. Its return value should satisfy the following properties:

- strictly negative if first operand is before (<) second operand
- strictly positive if first operand is after (>) second operand
- 0 if both operands have same ordering (===)

**`Example`**

To compare string case insensitively:
```ts
const ignoreCaseComparator: Comparator<string> = (s1, s2) => {
   const l1 = s1.toLowerCase();
   const l2 = s2.toLowerCase();
   if (l1 < l2) return -1;
   if (l1 > l2) return 1;
   return 0;
};
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | Type of objects to compare. |

#### Type declaration

▸ (`a1`, `a2`): `number`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a1` | `A` | The first operand |
| `a2` | `A` | The second operand |

##### Returns

`number`

___

### EventualIterable

Ƭ **EventualIterable**\<`A`\>: `Iterable`\<`A`\> \| `AsyncIterable`\<`A`\>

An `Iterable` that maybe asynchronous.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | the type of objects being iterated on. |

___

### EventualIterableIterator

Ƭ **EventualIterableIterator**\<`A`\>: `IterableIterator`\<`A`\> \| `AsyncIterableIterator`\<`A`\>

An `IterableIterator` that maybe asynchronous.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | the type of objects being iterated on. |

___

### EventualIterator

Ƭ **EventualIterator**\<`A`\>: `Iterator`\<`A`\> \| `AsyncIterator`\<`A`\>

An `Iterator` that maybe asynchronous.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | the type of objects being iterated on. |

___

### EventualIteratorGenerator

Ƭ **EventualIteratorGenerator**\<`E`\>: [`IteratorGenerator`](README.md#iteratorgenerator)\<`E`\> \| `AsyncGenerator`\<`E`\>

An object that can generate a synchronous or asynchronous iterator.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `E` | the type of the objects that can be iterated on |

___

### EventualMapper

Ƭ **EventualMapper**\<`A`, `B`\>: [`Mapper`](README.md#mapper)\<`A`, [`Eventually`](README.md#eventually)\<`B`\>\>

A function mapping a value of type `A` to type `Eventually<B>`

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | the source type on which the `EventualMapper` is applied. |
| `B` | the target type |

___

### EventualPredicate

Ƭ **EventualPredicate**\<`A`\>: [`Mapper`](README.md#mapper)\<`A`, [`Eventually`](README.md#eventually)\<`boolean`\>\>

A predicate that can be synchronous or asynchronous.

#### Type parameters

| Name |
| :------ |
| `A` |

___

### EventualReducer

Ƭ **EventualReducer**\<`A`, `B`\>: (`acc`: `B`, `a`: `A`) => [`Eventually`](README.md#eventually)\<`B`\>

An eventual `Reducer`. Used for asynchronous `fold` and `reduce` operations.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | Type of elements being reduced |
| `B` | Type into which the elements are being reduced to. |

#### Type declaration

▸ (`acc`, `a`): [`Eventually`](README.md#eventually)\<`B`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `acc` | `B` | The current value of the accumulator |
| `a` | `A` | The current value to reduce |

##### Returns

[`Eventually`](README.md#eventually)\<`B`\>

___

### Eventually

Ƭ **Eventually**\<`A`\>: `A` \| `Promise`\<`A`\>

Represents a value of type `A` or `Promise<A>`.

#### Type parameters

| Name |
| :------ |
| `A` |

___

### IteratorGenerator

Ƭ **IteratorGenerator**\<`E`\>: [`ArrayGenerator`](interfaces/ArrayGenerator.md)\<`E`\> \| [`IteratorLike`](README.md#iteratorlike)\<`E`\>

An object that can generate an iterator.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `E` | the type of the objects that can be iterated on |

___

### IteratorLike

Ƭ **IteratorLike**\<`E`\>: (`i`: `number`) => `E` \| `Iterator`\<`E`\> \| `Iterable`\<`E`\>

An object that behaves like an iterator.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `E` | the type of the objects that can be iterated on |

___

### Mapper

Ƭ **Mapper**\<`A`, `B`\>: (`a`: `A`) => `B`

A function mapping a value of type `A` to type `B`

**`Example`**

```ts
const strlen: Mapper<string,number> = s => s.length;
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | the source type on which the `Mapper` is applied. |
| `B` | the target type |

#### Type declaration

▸ (`a`): `B`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

##### Returns

`B`

___

### Predicate

Ƭ **Predicate**\<`A`\>: [`Mapper`](README.md#mapper)\<`A`, `boolean`\>

A predicate on a value.

**`Example`**

```ts
const lengthGreaterThanFive: Predicate<string> = s => s.length > 5;
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | the type of values on which the predicate is to be evaluated. |

___

### Reducer

Ƭ **Reducer**\<`A`, `B`\>: (`acc`: `B`, `a`: `A`) => `B`

Function used in `reduce` and `fold` operations.

**`Example`**

To compute the sum of the length of strings:
```ts
const sumLenReducer: Reducer<string, number> = (sum, s) => { sum += s.length; return sum; };
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | Type of elements being reduced |
| `B` | Type into which the elements are being reduced to. |

#### Type declaration

▸ (`acc`, `a`): `B`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `acc` | `B` | The current value of the accumulator |
| `a` | `A` | The current value to reduce |

##### Returns

`B`

## Variables

### CollisionHandlers

• `Const` **CollisionHandlers**: `Object`

Default collision handlers for `MapCollector`
```
- overwrite: new value overwrite existing value
- ignore: new value is ignored
- reject: an Error is thrown
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ignore` | \<K, V\>(`_k`: `K`, `oldValue`: `V`, `_newValue`: `V`) => `V` |
| `overwrite` | \<K, V\>(`_k`: `K`, `_oldValue`: `V`, `newValue`: `V`) => `V` |
| `reject` | \<K, V\>(`k`: `K`, `oldValue`: `V`, `newValue`: `V`) => `never` |

## Functions

### asyncIterator

▸ **asyncIterator**\<`A`\>(`generator`): [`AsyncFluentIterator`](classes/AsyncFluentIterator.md)\<`A`\>

Alias for [AsyncFluentIterator.from](classes/AsyncFluentIterator.md#from)

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `generator` | [`AsyncIteratorGenerator`](README.md#asynciteratorgenerator)\<`A`\> |

#### Returns

[`AsyncFluentIterator`](classes/AsyncFluentIterator.md)\<`A`\>

___

### emptyIterator

▸ **emptyIterator**\<`A`\>(): [`FluentIterator`](classes/FluentIterator.md)\<`A`\>

Alias for [FluentIterator.empty](classes/FluentIterator.md#empty)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `never` |

#### Returns

[`FluentIterator`](classes/FluentIterator.md)\<`A`\>

___

### iterator

▸ **iterator**\<`A`\>(`iter`): [`FluentIterator`](classes/FluentIterator.md)\<`A`\>

Alias for [FluentIterator.from](classes/FluentIterator.md#from)

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | [`IteratorGenerator`](README.md#iteratorgenerator)\<`A`\> |

#### Returns

[`FluentIterator`](classes/FluentIterator.md)\<`A`\>

___

### promiseIterator

▸ **promiseIterator**\<`A`\>(`generator`): [`PromiseIterator`](classes/PromiseIterator.md)\<`A`\>

Alias for [PromiseIterator.from](classes/PromiseIterator.md#from)

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `generator` | [`IteratorGenerator`](README.md#iteratorgenerator)\<`Promise`\<`A`\>\> |

#### Returns

[`PromiseIterator`](classes/PromiseIterator.md)\<`A`\>

___

### toPromiseIterator

▸ **toPromiseIterator**\<`A`\>(`generator`): [`PromiseIterator`](classes/PromiseIterator.md)\<`A`\>

Helper function to create a [PromiseIterator](classes/PromiseIterator.md) from synchronous [IteratorGenerator](README.md#iteratorgenerator).

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `generator` | [`IteratorGenerator`](README.md#iteratorgenerator)\<`A`\> |

#### Returns

[`PromiseIterator`](classes/PromiseIterator.md)\<`A`\>
