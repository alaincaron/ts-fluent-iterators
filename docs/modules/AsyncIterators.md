[ts-fluent-iterators](../README.md) / AsyncIterators

# Namespace: AsyncIterators

## Table of contents

### Functions

- [all](AsyncIterators.md#all)
- [append](AsyncIterators.md#append)
- [collectTo](AsyncIterators.md#collectto)
- [concat](AsyncIterators.md#concat)
- [contains](AsyncIterators.md#contains)
- [empty](AsyncIterators.md#empty)
- [enumerate](AsyncIterators.md#enumerate)
- [filter](AsyncIterators.md#filter)
- [filterMap](AsyncIterators.md#filtermap)
- [first](AsyncIterators.md#first)
- [fold](AsyncIterators.md#fold)
- [forEach](AsyncIterators.md#foreach)
- [includes](AsyncIterators.md#includes)
- [map](AsyncIterators.md#map)
- [partition](AsyncIterators.md#partition)
- [prepend](AsyncIterators.md#prepend)
- [reduce](AsyncIterators.md#reduce)
- [removeNull](AsyncIterators.md#removenull)
- [skip](AsyncIterators.md#skip)
- [skipWhile](AsyncIterators.md#skipwhile)
- [some](AsyncIterators.md#some)
- [take](AsyncIterators.md#take)
- [takeWhile](AsyncIterators.md#takewhile)
- [tap](AsyncIterators.md#tap)
- [toAsync](AsyncIterators.md#toasync)
- [toAsyncIterator](AsyncIterators.md#toasynciterator)
- [toEventualIterator](AsyncIterators.md#toeventualiterator)
- [zip](AsyncIterators.md#zip)

## Functions

### all

▸ **all**\<`A`\>(`iter`, `predicate`): `Promise`\<`boolean`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `predicate` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

#### Returns

`Promise`\<`boolean`\>

___

### append

▸ **append**\<`A`\>(`iter`, `other`): `AsyncIterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `other` | [`EventualIterator`](../README.md#eventualiterator)\<`A`\> |

#### Returns

`AsyncIterableIterator`\<`A`\>

___

### collectTo

▸ **collectTo**\<`A`, `B`\>(`iter`, `collector`): `Promise`\<`B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `collector` | [`EventualCollector`](Collectors.md#eventualcollector)\<`A`, [`Eventually`](../README.md#eventually)\<`B`\>\> |

#### Returns

`Promise`\<`B`\>

___

### concat

▸ **concat**\<`A`\>(`...iters`): `AsyncIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...iters` | [`EventualIterator`](../README.md#eventualiterator)\<`A`\>[] |

#### Returns

`AsyncIterator`\<`A`\>

___

### contains

▸ **contains**\<`A`\>(`iter`, `predicate`): `Promise`\<`boolean`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `predicate` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

#### Returns

`Promise`\<`boolean`\>

___

### empty

▸ **empty**\<`A`\>(): `AsyncIterableIterator`\<`A`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `never` |

#### Returns

`AsyncIterableIterator`\<`A`\>

___

### enumerate

▸ **enumerate**\<`A`\>(`iter`, `start?`): `AsyncIterableIterator`\<[`A`, `number`]\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> | `undefined` |
| `start` | `number` | `0` |

#### Returns

`AsyncIterableIterator`\<[`A`, `number`]\>

___

### filter

▸ **filter**\<`A`\>(`iter`, `predicate`): `AsyncIterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `predicate` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

#### Returns

`AsyncIterableIterator`\<`A`\>

___

### filterMap

▸ **filterMap**\<`A`, `B`\>(`iter`, `mapper`): `AsyncIterableIterator`\<`B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`A`, `undefined` \| ``null`` \| `B`\> |

#### Returns

`AsyncIterableIterator`\<`B`\>

___

### first

▸ **first**\<`A`\>(`iter`): `Promise`\<`A` \| `undefined`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |

#### Returns

`Promise`\<`A` \| `undefined`\>

___

### fold

▸ **fold**\<`A`, `B`\>(`iter`, `reducer`, `initialValue`): `Promise`\<`B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `reducer` | [`EventualReducer`](../README.md#eventualreducer)\<`A`, `B`\> |
| `initialValue` | `B` |

#### Returns

`Promise`\<`B`\>

___

### forEach

▸ **forEach**\<`A`\>(`iter`, `mapper`): `Promise`\<`void`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`A`, `any`\> |

#### Returns

`Promise`\<`void`\>

___

### includes

▸ **includes**\<`A`\>(`iter`, `target`): `Promise`\<`boolean`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `target` | [`Eventually`](../README.md#eventually)\<`A`\> |

#### Returns

`Promise`\<`boolean`\>

___

### map

▸ **map**\<`A`, `B`\>(`iter`, `mapper`): `AsyncIterableIterator`\<`B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`A`, `B`\> |

#### Returns

`AsyncIterableIterator`\<`B`\>

___

### partition

▸ **partition**\<`A`\>(`iter`, `size`): `AsyncIterableIterator`\<`A`[]\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `size` | `number` |

#### Returns

`AsyncIterableIterator`\<`A`[]\>

___

### prepend

▸ **prepend**\<`A`\>(`iter`, `other`): `AsyncIterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `other` | [`EventualIterator`](../README.md#eventualiterator)\<`A`\> |

#### Returns

`AsyncIterableIterator`\<`A`\>

___

### reduce

▸ **reduce**\<`A`\>(`iter`, `reducer`, `initialValue?`): `Promise`\<`A` \| `undefined`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `reducer` | [`EventualReducer`](../README.md#eventualreducer)\<`A`, `A`\> |
| `initialValue?` | `A` |

#### Returns

`Promise`\<`A` \| `undefined`\>

___

### removeNull

▸ **removeNull**\<`A`\>(`iter`): `AsyncIterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |

#### Returns

`AsyncIterableIterator`\<`A`\>

___

### skip

▸ **skip**\<`A`\>(`iter`, `n`): `AsyncIterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `n` | `number` |

#### Returns

`AsyncIterableIterator`\<`A`\>

___

### skipWhile

▸ **skipWhile**\<`A`\>(`iter`, `predicate`): `AsyncIterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `predicate` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

#### Returns

`AsyncIterableIterator`\<`A`\>

___

### some

▸ **some**\<`A`\>(`iter`, `predicate`): `Promise`\<`boolean`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `predicate` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

#### Returns

`Promise`\<`boolean`\>

___

### take

▸ **take**\<`A`\>(`iter`, `n`): `AsyncIterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `n` | `number` |

#### Returns

`AsyncIterableIterator`\<`A`\>

___

### takeWhile

▸ **takeWhile**\<`A`\>(`iter`, `predicate`): `AsyncIterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `predicate` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

#### Returns

`AsyncIterableIterator`\<`A`\>

___

### tap

▸ **tap**\<`A`\>(`iter`, `mapper`): `AsyncIterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`A`, `any`\> |

#### Returns

`AsyncIterableIterator`\<`A`\>

___

### toAsync

▸ **toAsync**\<`A`\>(`iter`): `AsyncIterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> \| `Iterable`\<`A`\> |

#### Returns

`AsyncIterableIterator`\<`A`\>

___

### toAsyncIterator

▸ **toAsyncIterator**\<`A`\>(`iter`): `AsyncIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | [`EventualIterable`](../README.md#eventualiterable)\<`A`\> \| `AsyncIterator`\<`A`, `any`, `undefined`\> |

#### Returns

`AsyncIterator`\<`A`\>

___

### toEventualIterator

▸ **toEventualIterator**\<`A`\>(`iter`): [`EventualIterator`](../README.md#eventualiterator)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | [`EventualIterator`](../README.md#eventualiterator)\<`A`\> \| [`EventualIterable`](../README.md#eventualiterable)\<`A`\> |

#### Returns

[`EventualIterator`](../README.md#eventualiterator)\<`A`\>

___

### zip

▸ **zip**\<`A`, `B`\>(`iter1`, `iter2`): `AsyncIterableIterator`\<[`A`, `B`]\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter1` | `AsyncIterator`\<`A`, `any`, `undefined`\> |
| `iter2` | `AsyncIterator`\<`B`, `any`, `undefined`\> |

#### Returns

`AsyncIterableIterator`\<[`A`, `B`]\>
