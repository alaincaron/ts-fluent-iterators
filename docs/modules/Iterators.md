[ts-fluent-iterators](../README.md) / Iterators

# Namespace: Iterators

## Table of contents

### Functions

- [all](Iterators.md#all)
- [append](Iterators.md#append)
- [collectTo](Iterators.md#collectto)
- [concat](Iterators.md#concat)
- [contains](Iterators.md#contains)
- [empty](Iterators.md#empty)
- [enumerate](Iterators.md#enumerate)
- [filter](Iterators.md#filter)
- [filterMap](Iterators.md#filtermap)
- [first](Iterators.md#first)
- [fold](Iterators.md#fold)
- [forEach](Iterators.md#foreach)
- [includes](Iterators.md#includes)
- [map](Iterators.md#map)
- [partition](Iterators.md#partition)
- [prepend](Iterators.md#prepend)
- [reduce](Iterators.md#reduce)
- [removeNull](Iterators.md#removenull)
- [skip](Iterators.md#skip)
- [skipWhile](Iterators.md#skipwhile)
- [some](Iterators.md#some)
- [take](Iterators.md#take)
- [takeWhile](Iterators.md#takewhile)
- [tap](Iterators.md#tap)
- [toIterator](Iterators.md#toiterator)
- [toIteratorMaybe](Iterators.md#toiteratormaybe)
- [zip](Iterators.md#zip)

## Functions

### all

▸ **all**\<`A`\>(`iter`, `predicate`): `boolean`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `predicate` | [`Predicate`](../README.md#predicate)\<`A`\> |

#### Returns

`boolean`

___

### append

▸ **append**\<`A`\>(`iter`, `other`): `IterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `other` | `Iterator`\<`A`, `any`, `undefined`\> |

#### Returns

`IterableIterator`\<`A`\>

___

### collectTo

▸ **collectTo**\<`A`, `B`\>(`iter`, `collector`): `B`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `collector` | [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `B`\> |

#### Returns

`B`

___

### concat

▸ **concat**\<`A`\>(`...iters`): `IterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...iters` | `Iterator`\<`A`, `any`, `undefined`\>[] |

#### Returns

`IterableIterator`\<`A`\>

___

### contains

▸ **contains**\<`A`\>(`iter`, `predicate`): `boolean`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `predicate` | [`Predicate`](../README.md#predicate)\<`A`\> |

#### Returns

`boolean`

___

### empty

▸ **empty**\<`A`\>(): `IterableIterator`\<`A`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `never` |

#### Returns

`IterableIterator`\<`A`\>

___

### enumerate

▸ **enumerate**\<`A`\>(`iter`, `start?`): `IterableIterator`\<[`A`, `number`]\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> | `undefined` |
| `start` | `number` | `0` |

#### Returns

`IterableIterator`\<[`A`, `number`]\>

___

### filter

▸ **filter**\<`A`\>(`iter`, `predicate`): `IterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `predicate` | [`Predicate`](../README.md#predicate)\<`A`\> |

#### Returns

`IterableIterator`\<`A`\>

___

### filterMap

▸ **filterMap**\<`A`, `B`\>(`iter`, `mapper`): `IterableIterator`\<`B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `mapper` | [`Mapper`](../README.md#mapper)\<`A`, `undefined` \| ``null`` \| `B`\> |

#### Returns

`IterableIterator`\<`B`\>

___

### first

▸ **first**\<`A`\>(`iter`): `A` \| `undefined`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |

#### Returns

`A` \| `undefined`

___

### fold

▸ **fold**\<`A`, `B`\>(`iter`, `reducer`, `initialValue`): `B`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `reducer` | [`Reducer`](../README.md#reducer)\<`A`, `B`\> |
| `initialValue` | `B` |

#### Returns

`B`

___

### forEach

▸ **forEach**\<`A`\>(`iter`, `mapper`): `void`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `mapper` | [`Mapper`](../README.md#mapper)\<`A`, `any`\> |

#### Returns

`void`

___

### includes

▸ **includes**\<`A`\>(`iter`, `target`): `boolean`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `target` | `A` |

#### Returns

`boolean`

___

### map

▸ **map**\<`A`, `B`\>(`iter`, `mapper`): `IterableIterator`\<`B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `mapper` | [`Mapper`](../README.md#mapper)\<`A`, `B`\> |

#### Returns

`IterableIterator`\<`B`\>

___

### partition

▸ **partition**\<`A`\>(`iter`, `size`): `IterableIterator`\<`A`[]\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `size` | `number` |

#### Returns

`IterableIterator`\<`A`[]\>

___

### prepend

▸ **prepend**\<`A`\>(`iter`, `other`): `IterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `other` | `Iterator`\<`A`, `any`, `undefined`\> |

#### Returns

`IterableIterator`\<`A`\>

___

### reduce

▸ **reduce**\<`A`\>(`iter`, `reducer`, `initialValue?`): `A` \| `undefined`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `reducer` | [`Reducer`](../README.md#reducer)\<`A`, `A`\> |
| `initialValue?` | `A` |

#### Returns

`A` \| `undefined`

___

### removeNull

▸ **removeNull**\<`A`\>(`iter`): `IterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |

#### Returns

`IterableIterator`\<`A`\>

___

### skip

▸ **skip**\<`A`\>(`iter`, `n`): `IterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `n` | `number` |

#### Returns

`IterableIterator`\<`A`\>

___

### skipWhile

▸ **skipWhile**\<`A`\>(`iter`, `predicate`): `IterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `predicate` | [`Predicate`](../README.md#predicate)\<`A`\> |

#### Returns

`IterableIterator`\<`A`\>

___

### some

▸ **some**\<`A`\>(`iter`, `predicate`): `boolean`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `predicate` | [`Predicate`](../README.md#predicate)\<`A`\> |

#### Returns

`boolean`

___

### take

▸ **take**\<`A`\>(`iter`, `n`): `IterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `n` | `number` |

#### Returns

`IterableIterator`\<`A`\>

___

### takeWhile

▸ **takeWhile**\<`A`\>(`iter`, `predicate`): `IterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `predicate` | [`Predicate`](../README.md#predicate)\<`A`\> |

#### Returns

`IterableIterator`\<`A`\>

___

### tap

▸ **tap**\<`A`\>(`iter`, `mapper`): `IterableIterator`\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |
| `mapper` | [`Mapper`](../README.md#mapper)\<`A`, `any`\> |

#### Returns

`IterableIterator`\<`A`\>

___

### toIterator

▸ **toIterator**\<`E`\>(`x`): `Iterator`\<`E`\>

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | [`IteratorGenerator`](../README.md#iteratorgenerator)\<`E`\> |

#### Returns

`Iterator`\<`E`\>

___

### toIteratorMaybe

▸ **toIteratorMaybe**\<`E`\>(`x`): `Iterator`\<`E`\> \| ``null``

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | [`IteratorGenerator`](../README.md#iteratorgenerator)\<`E`\> |

#### Returns

`Iterator`\<`E`\> \| ``null``

___

### zip

▸ **zip**\<`A`, `B`\>(`iter1`, `iter2`): `IterableIterator`\<[`A`, `B`]\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter1` | `Iterator`\<`A`, `any`, `undefined`\> |
| `iter2` | `Iterator`\<`B`, `any`, `undefined`\> |

#### Returns

`IterableIterator`\<[`A`, `B`]\>
