[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / Generators

# Namespace: Generators

## Table of contents

### Functions

- [loop](Generators.md#loop)
- [range](Generators.md#range)
- [repeat](Generators.md#repeat)

## Functions

### loop

▸ **loop**\<`T`\>(`f`, `start?`, `end?`, `step?`): `IterableIterator`\<`T`\>

Returns an iterator resulting from applying f on all elements of the range
from `start` (inclusively) to `end` (exclusively) by increment of `step`.

This is equivalent to
```ts
  for (const v of range(start, end, step)) yield f(v)
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | [`Mapper`](../modules.md#mapper)\<`number`, `T`\> | The function to apply on each element of the range. |
| `start?` | `number` | the start of the range. Defaults to 0. |
| `end?` | `number` | the end of the range. Defaults to infinity. |
| `step?` | `number` | increment in the range. Defaults to 1 if `end` > `start`, -1 otherwise. |

#### Returns

`IterableIterator`\<`T`\>

A new iterator resulting from apply f on all elements in the [`start`,`end`[ range by increment of `step`.

___

### range

▸ **range**(`start?`, `end?`, `step?`): `IterableIterator`\<`number`\>

Returns an iterator from `start` (inclusively) to `end` (exclusively) by increment of `step`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | `number` | the start of the range. Defaults to 0. |
| `end?` | `number` | the end of the range. Defaults to infinity. |
| `step?` | `number` | increment in the range. Defaults to 1 if `end` > `start`, -1 otherwise. |

#### Returns

`IterableIterator`\<`number`\>

A new iterator for the range [`start`,`end`[ by increment of `step`.

___

### repeat

▸ **repeat**\<`T`\>(`f`, `count?`): `IterableIterator`\<`T`\>

Returns an iterator resulting from applying f on all elements of the range [0,`count`]
from `start` (inclusively) to `end` (exclusively) by increment of `step`.

This is equivalent to
```ts
  loop(f,0,count,1)
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | [`Mapper`](../modules.md#mapper)\<`number`, `T`\> | The function to apply on each element of the range. |
| `count?` | `number` | the numbe of times f should be invoked. |

#### Returns

`IterableIterator`\<`T`\>

A new iterator resulting from apply f on all elements in the [`start`,`end`[ range by increment of `step`.
