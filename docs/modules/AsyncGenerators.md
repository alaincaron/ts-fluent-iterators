[ts-fluent-iterators](../README.md) / AsyncGenerators

# Namespace: AsyncGenerators

## Table of contents

### Functions

- [loop](AsyncGenerators.md#loop)
- [range](AsyncGenerators.md#range)
- [repeat](AsyncGenerators.md#repeat)

## Functions

### loop

▸ **loop**\<`T`\>(`f`, `start?`, `end?`, `step?`): `AsyncIterableIterator`\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | [`EventualMapper`](../README.md#eventualmapper)\<`number`, `T`\> |
| `start?` | `number` |
| `end?` | `number` |
| `step?` | `number` |

#### Returns

`AsyncIterableIterator`\<`T`\>

___

### range

▸ **range**(`start?`, `end?`, `step?`): `AsyncIterableIterator`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `start?` | `number` |
| `end?` | `number` |
| `step?` | `number` |

#### Returns

`AsyncIterableIterator`\<`number`\>

___

### repeat

▸ **repeat**\<`T`\>(`f`, `count?`): `AsyncIterableIterator`\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | [`EventualMapper`](../README.md#eventualmapper)\<`number`, `T`\> |
| `count?` | `number` |

#### Returns

`AsyncIterableIterator`\<`T`\>
