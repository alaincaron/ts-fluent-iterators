[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / PromiseGenerators

# Namespace: PromiseGenerators

## Table of contents

### Functions

- [loop](PromiseGenerators.md#loop)
- [range](PromiseGenerators.md#range)
- [repeat](PromiseGenerators.md#repeat)

## Functions

### loop

▸ **loop**\<`T`\>(`f`, `start?`, `end?`, `step?`): `IterableIterator`\<`Promise`\<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | [`EventualMapper`](../modules.md#eventualmapper)\<`number`, `T`\> |
| `start?` | `number` |
| `end?` | `number` |
| `step?` | `number` |

#### Returns

`IterableIterator`\<`Promise`\<`T`\>\>

___

### range

▸ **range**(`start?`, `end?`, `step?`): `IterableIterator`\<`Promise`\<`number`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `start?` | `number` |
| `end?` | `number` |
| `step?` | `number` |

#### Returns

`IterableIterator`\<`Promise`\<`number`\>\>

___

### repeat

▸ **repeat**\<`T`\>(`f`, `count?`): `IterableIterator`\<`Promise`\<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | [`EventualMapper`](../modules.md#eventualmapper)\<`number`, `T`\> |
| `count?` | `number` |

#### Returns

`IterableIterator`\<`Promise`\<`T`\>\>
