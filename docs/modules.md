[ts-fluent-iterators](README.md) / Exports

# ts-fluent-iterators

## Table of contents

### Namespaces

- [AsyncGenerators](modules/AsyncGenerators.md)
- [AsyncIterators](modules/AsyncIterators.md)
- [Collectors](modules/Collectors.md)
- [Functions](modules/Functions.md)
- [Generators](modules/Generators.md)
- [Iterators](modules/Iterators.md)
- [PromiseGenerators](modules/PromiseGenerators.md)
- [PromiseIterators](modules/PromiseIterators.md)

### Classes

- [AsyncFluentIterator](classes/AsyncFluentIterator.md)
- [FluentIterator](classes/FluentIterator.md)
- [PromiseIterator](classes/PromiseIterator.md)

### Interfaces

- [ArrayGenerator](interfaces/ArrayGenerator.md)
- [AsyncArrayGenerator](interfaces/AsyncArrayGenerator.md)
- [MinMax](interfaces/MinMax.md)

### Type Aliases

- [AsyncIteratorGenerator](modules.md#asynciteratorgenerator)
- [AsyncIteratorLike](modules.md#asynciteratorlike)
- [CollisionHandler](modules.md#collisionhandler)
- [Comparator](modules.md#comparator)
- [EventualIterable](modules.md#eventualiterable)
- [EventualIterableIterator](modules.md#eventualiterableiterator)
- [EventualIterator](modules.md#eventualiterator)
- [EventualIteratorGenerator](modules.md#eventualiteratorgenerator)
- [EventualMapper](modules.md#eventualmapper)
- [EventualPredicate](modules.md#eventualpredicate)
- [EventualReducer](modules.md#eventualreducer)
- [Eventually](modules.md#eventually)
- [IteratorGenerator](modules.md#iteratorgenerator)
- [IteratorLike](modules.md#iteratorlike)
- [Mapper](modules.md#mapper)
- [Predicate](modules.md#predicate)
- [Reducer](modules.md#reducer)

### Functions

- [asyncIterator](modules.md#asynciterator)
- [iterator](modules.md#iterator)
- [promiseIterator](modules.md#promiseiterator)

## Type Aliases

### AsyncIteratorGenerator

Ƭ **AsyncIteratorGenerator**\<`E`\>: [`AsyncArrayGenerator`](interfaces/AsyncArrayGenerator.md)\<`E`\> \| [`AsyncIteratorLike`](modules.md#asynciteratorlike)\<`E`\>

#### Type parameters

| Name |
| :------ |
| `E` |

___

### AsyncIteratorLike

Ƭ **AsyncIteratorLike**\<`E`\>: (`i`: `number`) => `Promise`\<`E`\> \| `AsyncIterator`\<`E`\> \| `AsyncIterable`\<`E`\>

#### Type parameters

| Name |
| :------ |
| `E` |

___

### CollisionHandler

Ƭ **CollisionHandler**\<`K`, `V`\>: (`k`: `K`, `oldValue`: `V`, `newValue`: `V`) => `V`

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Type declaration

▸ (`k`, `oldValue`, `newValue`): `V`

##### Parameters

| Name | Type |
| :------ | :------ |
| `k` | `K` |
| `oldValue` | `V` |
| `newValue` | `V` |

##### Returns

`V`

___

### Comparator

Ƭ **Comparator**\<`A`\>: (`a1`: `A`, `a2`: `A`) => `number`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Type declaration

▸ (`a1`, `a2`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a1` | `A` |
| `a2` | `A` |

##### Returns

`number`

___

### EventualIterable

Ƭ **EventualIterable**\<`A`\>: `Iterable`\<`A`\> \| `AsyncIterable`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

___

### EventualIterableIterator

Ƭ **EventualIterableIterator**\<`A`\>: `IterableIterator`\<`A`\> \| `AsyncIterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

___

### EventualIterator

Ƭ **EventualIterator**\<`A`\>: `Iterator`\<`A`\> \| `AsyncIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

___

### EventualIteratorGenerator

Ƭ **EventualIteratorGenerator**\<`E`\>: [`IteratorGenerator`](modules.md#iteratorgenerator)\<`E`\> \| `AsyncGenerator`\<`E`\>

#### Type parameters

| Name |
| :------ |
| `E` |

___

### EventualMapper

Ƭ **EventualMapper**\<`A`, `B`\>: [`Mapper`](modules.md#mapper)\<`A`, [`Eventually`](modules.md#eventually)\<`B`\>\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

___

### EventualPredicate

Ƭ **EventualPredicate**\<`A`\>: [`Mapper`](modules.md#mapper)\<`A`, [`Eventually`](modules.md#eventually)\<`boolean`\>\>

#### Type parameters

| Name |
| :------ |
| `A` |

___

### EventualReducer

Ƭ **EventualReducer**\<`A`, `B`\>: (`acc`: `B`, `a`: `A`) => [`Eventually`](modules.md#eventually)\<`B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Type declaration

▸ (`acc`, `a`): [`Eventually`](modules.md#eventually)\<`B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `acc` | `B` |
| `a` | `A` |

##### Returns

[`Eventually`](modules.md#eventually)\<`B`\>

___

### Eventually

Ƭ **Eventually**\<`A`\>: `A` \| `Promise`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

___

### IteratorGenerator

Ƭ **IteratorGenerator**\<`E`\>: [`ArrayGenerator`](interfaces/ArrayGenerator.md)\<`E`\> \| [`IteratorLike`](modules.md#iteratorlike)\<`E`\>

#### Type parameters

| Name |
| :------ |
| `E` |

___

### IteratorLike

Ƭ **IteratorLike**\<`E`\>: (`i`: `number`) => `E` \| `Iterator`\<`E`\> \| `Iterable`\<`E`\>

#### Type parameters

| Name |
| :------ |
| `E` |

___

### Mapper

Ƭ **Mapper**\<`A`, `B`\>: (`a`: `A`) => `B`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

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

Ƭ **Predicate**\<`A`\>: [`Mapper`](modules.md#mapper)\<`A`, `boolean`\>

#### Type parameters

| Name |
| :------ |
| `A` |

___

### Reducer

Ƭ **Reducer**\<`A`, `B`\>: (`acc`: `B`, `a`: `A`) => `B`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Type declaration

▸ (`acc`, `a`): `B`

##### Parameters

| Name | Type |
| :------ | :------ |
| `acc` | `B` |
| `a` | `A` |

##### Returns

`B`

## Functions

### asyncIterator

▸ **asyncIterator**\<`A`\>(`iter`): [`AsyncFluentIterator`](classes/AsyncFluentIterator.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> \| [`EventualIterable`](modules.md#eventualiterable)\<`A`\> |

#### Returns

[`AsyncFluentIterator`](classes/AsyncFluentIterator.md)\<`A`\>

___

### iterator

▸ **iterator**\<`A`\>(`iter`): [`FluentIterator`](classes/FluentIterator.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | [`IteratorGenerator`](modules.md#iteratorgenerator)\<`A`\> |

#### Returns

[`FluentIterator`](classes/FluentIterator.md)\<`A`\>

___

### promiseIterator

▸ **promiseIterator**\<`A`\>(`iter`): [`PromiseIterator`](classes/PromiseIterator.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> \| `Iterable`\<`Promise`\<`A`\>\> |

#### Returns

[`PromiseIterator`](classes/PromiseIterator.md)\<`A`\>
