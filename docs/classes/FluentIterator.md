[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / FluentIterator

# Class: FluentIterator\<A\>

## Type parameters

| Name |
| :------ |
| `A` |

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

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | `Iterator`\<`A`, `any`, `undefined`\> |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`\<`A`, `any`, `undefined`\>

#### Returns

`Iterator`\<`A`, `any`, `undefined`\>

#### Implementation of

Iterable.[iterator]

___

### all

▸ **all**(`predicate`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../modules.md#predicate)\<`A`\> |

#### Returns

`boolean`

___

### append

▸ **append**(`items`): [`FluentIterator`](FluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `Iterator`\<`A`, `any`, `undefined`\> \| `Iterable`\<`A`\> |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

___

### collect

▸ **collect**(): `A`[]

#### Returns

`A`[]

___

### collectTo

▸ **collectTo**\<`B`\>(`collector`): `B`

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `collector` | [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `B`\> |

#### Returns

`B`

___

### collectToMap

▸ **collectToMap**\<`K`\>(`mapper`, `collisionHandler?`): `Map`\<`K`, `A`\>

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`Mapper`](../modules.md#mapper)\<`A`, `K`\> |
| `collisionHandler?` | [`CollisionHandler`](../modules.md#collisionhandler)\<`K`, `A`\> |

#### Returns

`Map`\<`K`, `A`\>

___

### collectToMap2

▸ **collectToMap2**\<`K`, `V`\>(`mapper`, `collisionHandler?`): `Map`\<`K`, `V`\>

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`Mapper`](../modules.md#mapper)\<`A`, [`K`, `V`]\> |
| `collisionHandler?` | [`CollisionHandler`](../modules.md#collisionhandler)\<`K`, `V`\> |

#### Returns

`Map`\<`K`, `V`\>

___

### collectToObject

▸ **collectToObject**\<`V`\>(`mapper`, `collisionHandler?`): `Record`\<`string`, `V`\>

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`Mapper`](../modules.md#mapper)\<`A`, [`string`, `V`]\> |
| `collisionHandler?` | [`CollisionHandler`](../modules.md#collisionhandler)\<`string`, `V`\> |

#### Returns

`Record`\<`string`, `V`\>

___

### collectToSet

▸ **collectToSet**(): `Set`\<`A`\>

#### Returns

`Set`\<`A`\>

___

### concat

▸ **concat**(`...iterables`): [`FluentIterator`](FluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...iterables` | (`Iterator`\<`A`, `any`, `undefined`\> \| `Iterable`\<`A`\>)[] |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

___

### contains

▸ **contains**(`predicate`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../modules.md#predicate)\<`A`\> |

#### Returns

`boolean`

___

### count

▸ **count**(`predicate?`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate?` | [`Predicate`](../modules.md#predicate)\<`A`\> |

#### Returns

`number`

___

### enumerate

▸ **enumerate**(`start?`): [`FluentIterator`](FluentIterator.md)\<[`A`, `number`]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `start` | `number` | `0` |

#### Returns

[`FluentIterator`](FluentIterator.md)\<[`A`, `number`]\>

___

### filter

▸ **filter**(`predicate`): [`FluentIterator`](FluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../modules.md#predicate)\<`A`\> |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

___

### filterMap

▸ **filterMap**\<`B`\>(`mapper`): [`FluentIterator`](FluentIterator.md)\<`B`\>

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`Mapper`](../modules.md#mapper)\<`A`, `undefined` \| ``null`` \| `B`\> |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`B`\>

___

### first

▸ **first**(): `undefined` \| `A`

#### Returns

`undefined` \| `A`

___

### fold

▸ **fold**\<`B`\>(`reducer`, `initialValue`): `B`

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducer` | [`Reducer`](../modules.md#reducer)\<`A`, `B`\> |
| `initialValue` | `B` |

#### Returns

`B`

___

### forEach

▸ **forEach**(`mapper`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`Mapper`](../modules.md#mapper)\<`A`, `any`\> |

#### Returns

`void`

___

### groupBy

▸ **groupBy**\<`K`\>(`mapper`): `Map`\<`K`, `A`[]\>

#### Type parameters

| Name |
| :------ |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`Mapper`](../modules.md#mapper)\<`A`, `K`\> |

#### Returns

`Map`\<`K`, `A`[]\>

___

### groupBy2

▸ **groupBy2**\<`K`, `V`\>(`mapper`): `Map`\<`K`, `V`[]\>

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`Mapper`](../modules.md#mapper)\<`A`, [`K`, `V`]\> |

#### Returns

`Map`\<`K`, `V`[]\>

___

### includes

▸ **includes**(`target`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `A` |

#### Returns

`boolean`

___

### join

▸ **join**(`separator?`, `prefix?`, `suffix?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `separator?` | `string` |
| `prefix?` | `string` |
| `suffix?` | `string` |

#### Returns

`string`

___

### last

▸ **last**(): `undefined` \| `A`

#### Returns

`undefined` \| `A`

___

### map

▸ **map**\<`B`\>(`mapper`): [`FluentIterator`](FluentIterator.md)\<`B`\>

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`Mapper`](../modules.md#mapper)\<`A`, `B`\> |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`B`\>

___

### max

▸ **max**(`comparator?`): `undefined` \| `A`

#### Parameters

| Name | Type |
| :------ | :------ |
| `comparator?` | [`Comparator`](../modules.md#comparator)\<`A`\> |

#### Returns

`undefined` \| `A`

___

### min

▸ **min**(`comparator?`): `undefined` \| `A`

#### Parameters

| Name | Type |
| :------ | :------ |
| `comparator?` | [`Comparator`](../modules.md#comparator)\<`A`\> |

#### Returns

`undefined` \| `A`

___

### minmax

▸ **minmax**(`comparator?`): `undefined` \| [`MinMax`](../interfaces/MinMax.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `comparator?` | [`Comparator`](../modules.md#comparator)\<`A`\> |

#### Returns

`undefined` \| [`MinMax`](../interfaces/MinMax.md)\<`A`\>

___

### next

▸ **next**(): `IteratorResult`\<`A`, `any`\>

#### Returns

`IteratorResult`\<`A`, `any`\>

#### Implementation of

Iterator.next

___

### partition

▸ **partition**(`size`): [`FluentIterator`](FluentIterator.md)\<`A`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`[]\>

___

### prepend

▸ **prepend**(`items`): [`FluentIterator`](FluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `Iterator`\<`A`, `any`, `undefined`\> \| `Iterable`\<`A`\> |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

___

### reduce

▸ **reduce**(`reducer`, `initialValue?`): `undefined` \| `A`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducer` | [`Reducer`](../modules.md#reducer)\<`A`, `A`\> |
| `initialValue?` | `A` |

#### Returns

`undefined` \| `A`

___

### removeNull

▸ **removeNull**(): [`FluentIterator`](FluentIterator.md)\<`A`\>

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

___

### skip

▸ **skip**(`n`): [`FluentIterator`](FluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

___

### skipWhile

▸ **skipWhile**(`predicate`): [`FluentIterator`](FluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../modules.md#predicate)\<`A`\> |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

___

### some

▸ **some**(`predicate`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../modules.md#predicate)\<`A`\> |

#### Returns

`boolean`

___

### take

▸ **take**(`n`): [`FluentIterator`](FluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

___

### takeWhile

▸ **takeWhile**(`predicate`): [`FluentIterator`](FluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../modules.md#predicate)\<`A`\> |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

___

### tally

▸ **tally**(): `Map`\<`A`, `number`\>

#### Returns

`Map`\<`A`, `number`\>

___

### tap

▸ **tap**(`mapper`): [`FluentIterator`](FluentIterator.md)\<`A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapper` | [`Mapper`](../modules.md#mapper)\<`A`, `any`\> |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

___

### toAsync

▸ **toAsync**(): [`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

#### Returns

[`AsyncFluentIterator`](AsyncFluentIterator.md)\<`A`\>

___

### toPromise

▸ **toPromise**(): [`PromiseIterator`](PromiseIterator.md)\<`A`\>

#### Returns

[`PromiseIterator`](PromiseIterator.md)\<`A`\>

___

### zip

▸ **zip**\<`B`\>(`other`): [`FluentIterator`](FluentIterator.md)\<[`A`, `B`]\>

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `Iterator`\<`B`, `any`, `undefined`\> \| `Iterable`\<`B`\> |

#### Returns

[`FluentIterator`](FluentIterator.md)\<[`A`, `B`]\>

___

### empty

▸ **empty**\<`A`\>(): [`FluentIterator`](FluentIterator.md)\<`A`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `never` |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>

___

### from

▸ **from**\<`A`\>(`iter`): [`FluentIterator`](FluentIterator.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iter` | [`IteratorGenerator`](../modules.md#iteratorgenerator)\<`A`\> |

#### Returns

[`FluentIterator`](FluentIterator.md)\<`A`\>
