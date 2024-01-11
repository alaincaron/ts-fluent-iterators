[ts-fluent-iterators](../README.md) / PromiseIterators

# Namespace: PromiseIterators

## Table of contents

### Functions

- [all](PromiseIterators.md#all)
- [allSettled](PromiseIterators.md#allsettled)
- [any](PromiseIterators.md#any)
- [collectTo](PromiseIterators.md#collectto)
- [contains](PromiseIterators.md#contains)
- [enumerate](PromiseIterators.md#enumerate)
- [filter](PromiseIterators.md#filter)
- [filterMap](PromiseIterators.md#filtermap)
- [first](PromiseIterators.md#first)
- [flatmap](PromiseIterators.md#flatmap)
- [fold](PromiseIterators.md#fold)
- [forEach](PromiseIterators.md#foreach)
- [includes](PromiseIterators.md#includes)
- [map](PromiseIterators.md#map)
- [race](PromiseIterators.md#race)
- [reduce](PromiseIterators.md#reduce)
- [removeNull](PromiseIterators.md#removenull)
- [skipWhile](PromiseIterators.md#skipwhile)
- [some](PromiseIterators.md#some)
- [takeWhile](PromiseIterators.md#takewhile)
- [tap](PromiseIterators.md#tap)
- [toPromise](PromiseIterators.md#topromise)
- [zip](PromiseIterators.md#zip)

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
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |
| `predicate` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

#### Returns

`Promise`\<`boolean`\>

___

### allSettled

▸ **allSettled**\<`A`\>(`iter`): `Promise`\<`PromiseSettledResult`\<`A`\>[]\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |

#### Returns

`Promise`\<`PromiseSettledResult`\<`A`\>[]\>

___

### any

▸ **any**\<`A`\>(`iter`): `Promise`\<`A` \| `undefined`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |

#### Returns

`Promise`\<`A` \| `undefined`\>

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
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |
| `collector` | [`EventualCollector`](../interfaces/Collectors.EventualCollector.md)\<`A`, [`Eventually`](../README.md#eventually)\<`B`\>\> |

#### Returns

`Promise`\<`B`\>

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
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |
| `predicate` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

#### Returns

`Promise`\<`boolean`\>

___

### enumerate

▸ **enumerate**\<`A`\>(`iter`, `start?`): `IterableIterator`\<`Promise`\<[`A`, `number`]\>\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> | `undefined` |
| `start` | `number` | `0` |

#### Returns

`IterableIterator`\<`Promise`\<[`A`, `number`]\>\>

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
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |
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
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |
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
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |

#### Returns

`Promise`\<`A` \| `undefined`\>

___

### flatmap

▸ **flatmap**\<`A`, `B`\>(`iter`, `mapper`): `IterableIterator`\<`Promise`\<`B`\>\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`Promise`\<`A`\>, `B`\> |

#### Returns

`IterableIterator`\<`Promise`\<`B`\>\>

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
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |
| `reducer` | [`EventualReducer`](../README.md#eventualreducer)\<`A`, `B`\> |
| `initialValue` | [`Eventually`](../README.md#eventually)\<`B`\> |

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
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |
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
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |
| `target` | [`Eventually`](../README.md#eventually)\<`A`\> |

#### Returns

`Promise`\<`boolean`\>

___

### map

▸ **map**\<`A`, `B`\>(`iter`, `mapper`): `IterableIterator`\<`Promise`\<`B`\>\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`A`, `B`\> |

#### Returns

`IterableIterator`\<`Promise`\<`B`\>\>

___

### race

▸ **race**\<`A`\>(`iter`): `Promise`\<`A` \| `undefined`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |

#### Returns

`Promise`\<`A` \| `undefined`\>

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
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |
| `reducer` | [`EventualReducer`](../README.md#eventualreducer)\<`A`, `A`\> |
| `initialValue?` | [`Eventually`](../README.md#eventually)\<`A`\> |

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
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |

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
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |
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
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |
| `predicate` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

#### Returns

`Promise`\<`boolean`\>

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
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |
| `predicate` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

#### Returns

`AsyncIterableIterator`\<`A`\>

___

### tap

▸ **tap**\<`A`\>(`iter`, `mapper`): `IterableIterator`\<`Promise`\<`A`\>\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`A`, `any`\> |

#### Returns

`IterableIterator`\<`Promise`\<`A`\>\>

___

### toPromise

▸ **toPromise**\<`A`\>(`iterable`): `IterableIterator`\<`Promise`\<`Awaited`\<`A`\>\>\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iterable` | `Iterator`\<`A`, `any`, `undefined`\> \| `Iterable`\<`A`\> |

#### Returns

`IterableIterator`\<`Promise`\<`Awaited`\<`A`\>\>\>

___

### zip

▸ **zip**\<`A`, `B`\>(`iter1`, `iter2`): `IterableIterator`\<`Promise`\<[`A`, `B`]\>\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter1` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |
| `iter2` | `Iterator`\<`Promise`\<`B`\>, `any`, `undefined`\> |

#### Returns

`IterableIterator`\<`Promise`\<[`A`, `B`]\>\>
