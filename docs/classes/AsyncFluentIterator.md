[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / AsyncFluentIterator

# Class: AsyncFluentIterator\<A\>

## Type parameters

| Name |
| :------ |
| `A` |

## Implements

- `AsyncIterator`\<`A`\>
- `AsyncIterable`\<`A`\>

## Table of contents

### Constructors

- [constructor](AsyncFluentIterator.md#constructor)

### Methods

- [[asyncIterator]](AsyncFluentIterator.md#[asynciterator])
- [all](AsyncFluentIterator.md#all)
- [append](AsyncFluentIterator.md#append)
- [collect](AsyncFluentIterator.md#collect)
- [collectTo](AsyncFluentIterator.md#collectto)
- [collectToMap](AsyncFluentIterator.md#collecttomap)
- [collectToMap2](AsyncFluentIterator.md#collecttomap2)
- [collectToObject](AsyncFluentIterator.md#collecttoobject)
- [collectToSet](AsyncFluentIterator.md#collecttoset)
- [concat](AsyncFluentIterator.md#concat)
- [contains](AsyncFluentIterator.md#contains)
- [count](AsyncFluentIterator.md#count)
- [enumerate](AsyncFluentIterator.md#enumerate)
- [filter](AsyncFluentIterator.md#filter)
- [filterMap](AsyncFluentIterator.md#filtermap)
- [first](AsyncFluentIterator.md#first)
- [fold](AsyncFluentIterator.md#fold)
- [forEach](AsyncFluentIterator.md#foreach)
- [groupBy](AsyncFluentIterator.md#groupby)
- [groupBy2](AsyncFluentIterator.md#groupby2)
- [includes](AsyncFluentIterator.md#includes)
- [join](AsyncFluentIterator.md#join)
- [last](AsyncFluentIterator.md#last)
- [map](AsyncFluentIterator.md#map)
- [max](AsyncFluentIterator.md#max)
- [min](AsyncFluentIterator.md#min)
- [minmax](AsyncFluentIterator.md#minmax)
- [next](AsyncFluentIterator.md#next)
- [partition](AsyncFluentIterator.md#partition)
- [prepend](AsyncFluentIterator.md#prepend)
- [reduce](AsyncFluentIterator.md#reduce)
- [removeNull](AsyncFluentIterator.md#removenull)
- [skip](AsyncFluentIterator.md#skip)
- [skipWhile](AsyncFluentIterator.md#skipwhile)
- [some](AsyncFluentIterator.md#some)
- [take](AsyncFluentIterator.md#take)
- [takeWhile](AsyncFluentIterator.md#takewhile)
- [tally](AsyncFluentIterator.md#tally)
- [tap](AsyncFluentIterator.md#tap)
- [zip](AsyncFluentIterator.md#zip)
- [empty](AsyncFluentIterator.md#empty)
- [from](AsyncFluentIterator.md#from)

## Constructors

### constructor

• **new AsyncFluentIterator**\<`A`\>(`iter`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): `AsyncIterator`\<`A`, `any`, `undefined`\>

#### Returns

`AsyncIterator`\<`A`, `any`, `undefined`\>

#### Implementation of

AsyncIterable.[asyncIterator]

___

### all

▸ **all**(`predicate`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`EventualPredicate`](../modules.md#eventualpredicate)\<`A`\> |

#### Returns

`Promise`\<`boolean`\>

___

### append

▸ **append**(`items`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | [`EventualIterator`](../modules.md#eventualiterator)\<`A`\> \| [`EventualIterable`](../modules.md#eventualiterable)\<`A`\> |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

___

### collect

▸ **collect**(): `Promise`\<`A`[]\>

#### Returns

`Promise`\<`A`[]\>

___

### collectTo

▸ **collectTo**\<`B`\>(`collector`): `Promise`\<`B`\>

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `collector` | [`EventualCollector`](../modules/Collectors.md#eventualcollector)\<`A`, `B`\> |

#### Returns

`Promise`\<`B`\>

___

### collectToMap

▸ **collectToMap**\<`K`\>(`mapper`, `collisionHandler?`): `Promise`\<`Map`\<`K`, `A`\>\>

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`EventualMapper`](../modules.md#eventualmapper)\<`A`, `K`\> |
| `collisionHandler?` | [`CollisionHandler`](../modules.md#collisionhandler)\<`K`, `A`\> |

#### Returns

`Promise`\<`Map`\<`K`, `A`\>\>

___

### collectToMap2

▸ **collectToMap2**\<`K`, `V`\>(`mapper`, `collisionHandler?`): `Promise`\<`Map`\<`K`, `V`\>\>

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`EventualMapper`](../modules.md#eventualmapper)\<`A`, [`K`, `V`]\> |
| `collisionHandler?` | [`CollisionHandler`](../modules.md#collisionhandler)\<`K`, `V`\> |

#### Returns

`Promise`\<`Map`\<`K`, `V`\>\>

___

### collectToObject

▸ **collectToObject**\<`V`\>(`mapper`, `collisionHandler?`): `Promise`\<`Record`\<`string`, `V`\>\>

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`EventualMapper`](../modules.md#eventualmapper)\<`A`, [`string`, `V`]\> |
| `collisionHandler?` | [`CollisionHandler`](../modules.md#collisionhandler)\<`string`, `V`\> |

#### Returns

`Promise`\<`Record`\<`string`, `V`\>\>

___

### collectToSet

▸ **collectToSet**(): `Promise`\<`Set`\<`A`\>\>

#### Returns

`Promise`\<`Set`\<`A`\>\>

___

### concat

▸ **concat**(`...iterables`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...iterables` | ([`EventualIterator`](../modules.md#eventualiterator)\<`A`\> \| [`EventualIterable`](../modules.md#eventualiterable)\<`A`\>)[] |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

___

### contains

▸ **contains**(`predicate`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`EventualPredicate`](../modules.md#eventualpredicate)\<`A`\> |

#### Returns

`Promise`\<`boolean`\>

___

### count

▸ **count**(`predicate?`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate?` | [`EventualPredicate`](../modules.md#eventualpredicate)\<`A`\> |

#### Returns

`Promise`\<`number`\>

___

### enumerate

▸ **enumerate**(`start?`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<[`A`, `number`]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `start` | `number` | `0` |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<[`A`, `number`]\>

___

### filter

▸ **filter**(`predicate`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`EventualPredicate`](../modules.md#eventualpredicate)\<`A`\> |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

___

### filterMap

▸ **filterMap**\<`B`\>(`mapper`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`B`\>

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`EventualMapper`](../modules.md#eventualmapper)\<`A`, `undefined` \| ``null`` \| `B`\> |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`B`\>

___

### first

▸ **first**(): `Promise`\<`undefined` \| `A`\>

#### Returns

`Promise`\<`undefined` \| `A`\>

___

### fold

▸ **fold**\<`B`\>(`reducer`, `initialValue`): `Promise`\<`B`\>

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducer` | [`EventualReducer`](../modules.md#eventualreducer)\<`A`, `B`\> |
| `initialValue` | `B` |

#### Returns

`Promise`\<`B`\>

___

### forEach

▸ **forEach**(`mapper`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`EventualMapper`](../modules.md#eventualmapper)\<`A`, `any`\> |

#### Returns

`Promise`\<`void`\>

___

### groupBy

▸ **groupBy**\<`K`\>(`mapper`): `Promise`\<`Map`\<`K`, `A`[]\>\>

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`EventualMapper`](../modules.md#eventualmapper)\<`A`, `K`\> |

#### Returns

`Promise`\<`Map`\<`K`, `A`[]\>\>

___

### groupBy2

▸ **groupBy2**\<`K`, `V`\>(`mapper`): `Promise`\<`Map`\<`K`, `V`[]\>\>

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`EventualMapper`](../modules.md#eventualmapper)\<`A`, [`K`, `V`]\> |

#### Returns

`Promise`\<`Map`\<`K`, `V`[]\>\>

___

### includes

▸ **includes**(`target`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`Eventually`](../modules.md#eventually)\<`A`\> |

#### Returns

`Promise`\<`boolean`\>

___

### join

▸ **join**(`separator?`, `prefix?`, `suffix?`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `separator?` | `string` |
| `prefix?` | `string` |
| `suffix?` | `string` |

#### Returns

`Promise`\<`string`\>

___

### last

▸ **last**(): `Promise`\<`undefined` \| `A`\>

#### Returns

`Promise`\<`undefined` \| `A`\>

___

### map

▸ **map**\<`B`\>(`mapper`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`B`\>

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`EventualMapper`](../modules.md#eventualmapper)\<`A`, `B`\> |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`B`\>

___

### max

▸ **max**(`comparator?`): `Promise`\<`undefined` \| `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `comparator?` | [`Comparator`](../modules.md#comparator)\<`A`\> |

#### Returns

`Promise`\<`undefined` \| `A`\>

___

### min

▸ **min**(`comparator?`): `Promise`\<`undefined` \| `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `comparator?` | [`Comparator`](../modules.md#comparator)\<`A`\> |

#### Returns

`Promise`\<`undefined` \| `A`\>

___

### minmax

▸ **minmax**(`comparator?`): `Promise`\<`undefined` \| [`MinMax`](../interfaces/MinMax.md)\<`A`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `comparator?` | [`Comparator`](../modules.md#comparator)\<`A`\> |

#### Returns

`Promise`\<`undefined` \| [`MinMax`](../interfaces/MinMax.md)\<`A`\>\>

___

### next

▸ **next**(): `Promise`\<`IteratorResult`\<`A`, `any`\>\>

#### Returns

`Promise`\<`IteratorResult`\<`A`, `any`\>\>

#### Implementation of

AsyncIterator.next

___

### partition

▸ **partition**(`size`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`[]\>

___

### prepend

▸ **prepend**(`items`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | [`EventualIterator`](../modules.md#eventualiterator)\<`A`\> \| [`EventualIterable`](../modules.md#eventualiterable)\<`A`\> |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

___

### reduce

▸ **reduce**(`reducer`, `initialValue?`): `Promise`\<`undefined` \| `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducer` | [`EventualReducer`](../modules.md#eventualreducer)\<`A`, `A`\> |
| `initialValue?` | `A` |

#### Returns

`Promise`\<`undefined` \| `A`\>

___

### removeNull

▸ **removeNull**(): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

___

### skip

▸ **skip**(`n`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

___

### skipWhile

▸ **skipWhile**(`predicate`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`EventualPredicate`](../modules.md#eventualpredicate)\<`A`\> |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

___

### some

▸ **some**(`predicate`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`EventualPredicate`](../modules.md#eventualpredicate)\<`A`\> |

#### Returns

`Promise`\<`boolean`\>

___

### take

▸ **take**(`n`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

___

### takeWhile

▸ **takeWhile**(`predicate`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`EventualPredicate`](../modules.md#eventualpredicate)\<`A`\> |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

___

### tally

▸ **tally**(): `Promise`\<`Map`\<`A`, `number`\>\>

#### Returns

`Promise`\<`Map`\<`A`, `number`\>\>

___

### tap

▸ **tap**(`mapper`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`EventualMapper`](../modules.md#eventualmapper)\<`A`, `any`\> |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

___

### zip

▸ **zip**\<`B`\>(`other`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<[`A`, `B`]\>

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `AsyncIterator`\<`B`, `any`, `undefined`\> \| `AsyncIterable`\<`B`\> |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<[`A`, `B`]\>

___

### empty

▸ **empty**\<`A`\>(): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `never` |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

___

### from

▸ **from**\<`A`\>(`iter`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `AsyncIterator`\<`A`, `any`, `undefined`\> \| [`EventualIterable`](../modules.md#eventualiterable)\<`A`\> |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>
