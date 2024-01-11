[ts-fluent-iterators](../README.md) / PromiseIterator

# Class: PromiseIterator\<A\>

## Type parameters

| Name |
| :------ |
| `A` |

## Implements

- `Iterator`\<`Promise`\<`A`\>\>
- `Iterable`\<`Promise`\<`A`\>\>

## Table of contents

### Constructors

- [constructor](PromiseIterator.md#constructor)

### Methods

- [[iterator]](PromiseIterator.md#[iterator])
- [all](PromiseIterator.md#all)
- [allSettled](PromiseIterator.md#allsettled)
- [any](PromiseIterator.md#any)
- [append](PromiseIterator.md#append)
- [collect](PromiseIterator.md#collect)
- [collectTo](PromiseIterator.md#collectto)
- [collectToMap](PromiseIterator.md#collecttomap)
- [collectToMap2](PromiseIterator.md#collecttomap2)
- [collectToObject](PromiseIterator.md#collecttoobject)
- [collectToSet](PromiseIterator.md#collecttoset)
- [concat](PromiseIterator.md#concat)
- [contains](PromiseIterator.md#contains)
- [count](PromiseIterator.md#count)
- [enumerate](PromiseIterator.md#enumerate)
- [filter](PromiseIterator.md#filter)
- [filterMap](PromiseIterator.md#filtermap)
- [first](PromiseIterator.md#first)
- [flatmap](PromiseIterator.md#flatmap)
- [fold](PromiseIterator.md#fold)
- [forEach](PromiseIterator.md#foreach)
- [groupBy](PromiseIterator.md#groupby)
- [groupBy2](PromiseIterator.md#groupby2)
- [includes](PromiseIterator.md#includes)
- [join](PromiseIterator.md#join)
- [last](PromiseIterator.md#last)
- [map](PromiseIterator.md#map)
- [max](PromiseIterator.md#max)
- [min](PromiseIterator.md#min)
- [minmax](PromiseIterator.md#minmax)
- [next](PromiseIterator.md#next)
- [partition](PromiseIterator.md#partition)
- [prepend](PromiseIterator.md#prepend)
- [race](PromiseIterator.md#race)
- [reduce](PromiseIterator.md#reduce)
- [removeNull](PromiseIterator.md#removenull)
- [skip](PromiseIterator.md#skip)
- [skipWhile](PromiseIterator.md#skipwhile)
- [some](PromiseIterator.md#some)
- [take](PromiseIterator.md#take)
- [takeWhile](PromiseIterator.md#takewhile)
- [tally](PromiseIterator.md#tally)
- [tap](PromiseIterator.md#tap)
- [zip](PromiseIterator.md#zip)
- [empty](PromiseIterator.md#empty)
- [from](PromiseIterator.md#from)

## Constructors

### constructor

• **new PromiseIterator**\<`A`\>(`iter`): [`PromiseIterator`](PromiseIterator.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |

#### Returns

[`PromiseIterator`](PromiseIterator.md)\<`A`\>

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\>

#### Returns

`Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\>

#### Implementation of

Iterable.[iterator]

___

### all

▸ **all**(`predicate`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

#### Returns

`Promise`\<`boolean`\>

___

### allSettled

▸ **allSettled**(): `Promise`\<`PromiseSettledResult`\<`A`\>[]\>

#### Returns

`Promise`\<`PromiseSettledResult`\<`A`\>[]\>

___

### any

▸ **any**(): `Promise`\<`undefined` \| `A`\>

#### Returns

`Promise`\<`undefined` \| `A`\>

___

### append

▸ **append**(`promises`): [`PromiseIterator`](PromiseIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `promises` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> \| `Iterable`\<`Promise`\<`A`\>\> |

#### Returns

[`PromiseIterator`](PromiseIterator.md)\<`A`\>

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
| `collector` | [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `B`\> |

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
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`A`, `K`\> |
| `collisionHandler?` | [`CollisionHandler`](../README.md#collisionhandler)\<`K`, `A`\> |

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
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`A`, [`K`, `V`]\> |
| `collisionHandler?` | [`CollisionHandler`](../README.md#collisionhandler)\<`K`, `V`\> |

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
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`A`, [`string`, `V`]\> |
| `collisionHandler?` | [`CollisionHandler`](../README.md#collisionhandler)\<`string`, `V`\> |

#### Returns

`Promise`\<`Record`\<`string`, `V`\>\>

___

### collectToSet

▸ **collectToSet**(): `Promise`\<`Set`\<`A`\>\>

#### Returns

`Promise`\<`Set`\<`A`\>\>

___

### concat

▸ **concat**(`...iterables`): [`PromiseIterator`](PromiseIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...iterables` | (`Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> \| `Iterable`\<`Promise`\<`A`\>\>)[] |

#### Returns

[`PromiseIterator`](PromiseIterator.md)\<`A`\>

___

### contains

▸ **contains**(`predicate`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

#### Returns

`Promise`\<`boolean`\>

___

### count

▸ **count**(`predicate?`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate?` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

#### Returns

`Promise`\<`number`\>

___

### enumerate

▸ **enumerate**(`start?`): [`PromiseIterator`](PromiseIterator.md)\<[`A`, `number`]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `start` | `number` | `0` |

#### Returns

[`PromiseIterator`](PromiseIterator.md)\<[`A`, `number`]\>

___

### filter

▸ **filter**(`predicate`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

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
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`A`, `undefined` \| ``null`` \| `B`\> |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`B`\>

___

### first

▸ **first**(): `Promise`\<`undefined` \| `A`\>

#### Returns

`Promise`\<`undefined` \| `A`\>

___

### flatmap

▸ **flatmap**\<`B`\>(`mapper`): [`PromiseIterator`](PromiseIterator.md)\<`B`\>

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`Promise`\<`A`\>, `B`\> |

#### Returns

[`PromiseIterator`](PromiseIterator.md)\<`B`\>

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
| `reducer` | [`EventualReducer`](../README.md#eventualreducer)\<`A`, `B`\> |
| `initialValue` | `B` |

#### Returns

`Promise`\<`B`\>

___

### forEach

▸ **forEach**(`mapper`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`A`, `any`\> |

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
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`A`, `K`\> |

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
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`A`, [`K`, `V`]\> |

#### Returns

`Promise`\<`Map`\<`K`, `V`[]\>\>

___

### includes

▸ **includes**(`target`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`Eventually`](../README.md#eventually)\<`A`\> |

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

▸ **map**\<`B`\>(`mapper`): [`PromiseIterator`](PromiseIterator.md)\<`B`\>

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`A`, `B`\> |

#### Returns

[`PromiseIterator`](PromiseIterator.md)\<`B`\>

___

### max

▸ **max**(`comparator?`): `Promise`\<`undefined` \| `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `comparator?` | [`Comparator`](../README.md#comparator)\<`A`\> |

#### Returns

`Promise`\<`undefined` \| `A`\>

___

### min

▸ **min**(`comparator?`): `Promise`\<`undefined` \| `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `comparator?` | [`Comparator`](../README.md#comparator)\<`A`\> |

#### Returns

`Promise`\<`undefined` \| `A`\>

___

### minmax

▸ **minmax**(`comparator?`): `Promise`\<`undefined` \| [`MinMax`](../interfaces/MinMax.md)\<`A`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `comparator?` | [`Comparator`](../README.md#comparator)\<`A`\> |

#### Returns

`Promise`\<`undefined` \| [`MinMax`](../interfaces/MinMax.md)\<`A`\>\>

___

### next

▸ **next**(): `IteratorResult`\<`Promise`\<`A`\>, `any`\>

#### Returns

`IteratorResult`\<`Promise`\<`A`\>, `any`\>

#### Implementation of

Iterator.next

___

### partition

▸ **partition**(`size`): [`FluentIterator`](FluentIterator.md)\<`Promise`\<`A`\>[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`Promise`\<`A`\>[]\>

___

### prepend

▸ **prepend**(`promises`): [`PromiseIterator`](PromiseIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `promises` | `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> \| `Iterable`\<`Promise`\<`A`\>\> |

#### Returns

[`PromiseIterator`](PromiseIterator.md)\<`A`\>

___

### race

▸ **race**(): `Promise`\<`undefined` \| `A`\>

#### Returns

`Promise`\<`undefined` \| `A`\>

___

### reduce

▸ **reduce**(`reducer`, `initialValue?`): `Promise`\<`undefined` \| `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducer` | [`EventualReducer`](../README.md#eventualreducer)\<`A`, `A`\> |
| `initialValue?` | [`Eventually`](../README.md#eventually)\<`A`\> |

#### Returns

`Promise`\<`undefined` \| `A`\>

___

### removeNull

▸ **removeNull**(): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

___

### skip

▸ **skip**(`n`): [`PromiseIterator`](PromiseIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`PromiseIterator`](PromiseIterator.md)\<`A`\>

___

### skipWhile

▸ **skipWhile**(`predicate`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

___

### some

▸ **some**(`predicate`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

#### Returns

`Promise`\<`boolean`\>

___

### take

▸ **take**(`n`): [`PromiseIterator`](PromiseIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`PromiseIterator`](PromiseIterator.md)\<`A`\>

___

### takeWhile

▸ **takeWhile**(`predicate`): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`EventualPredicate`](../README.md#eventualpredicate)\<`A`\> |

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

___

### tally

▸ **tally**(): `Promise`\<`Map`\<`A`, `number`\>\>

#### Returns

`Promise`\<`Map`\<`A`, `number`\>\>

___

### tap

▸ **tap**(`mapper`): [`PromiseIterator`](PromiseIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`EventualMapper`](../README.md#eventualmapper)\<`A`, `any`\> |

#### Returns

[`PromiseIterator`](PromiseIterator.md)\<`A`\>

___

### zip

▸ **zip**\<`B`\>(`other`): [`PromiseIterator`](PromiseIterator.md)\<[`A`, `B`]\>

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `Iterator`\<`Promise`\<`B`\>, `any`, `undefined`\> \| `Iterable`\<`Promise`\<`B`\>\> |

#### Returns

[`PromiseIterator`](PromiseIterator.md)\<[`A`, `B`]\>

___

### empty

▸ **empty**\<`A`\>(): [`PromiseIterator`](PromiseIterator.md)\<`A`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `never` |

#### Returns

[`PromiseIterator`](PromiseIterator.md)\<`A`\>

___

### from

▸ **from**\<`A`\>(`iter`): [`PromiseIterator`](PromiseIterator.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterable`\<`Promise`\<`A`\>\> \| `Iterator`\<`Promise`\<`A`\>, `any`, `undefined`\> |

#### Returns

[`PromiseIterator`](PromiseIterator.md)\<`A`\>
