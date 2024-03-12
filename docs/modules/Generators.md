[ts-fluent-iterators](../README.md) / Generators

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

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name     | Type                                             | Description                                                             |
| :------- | :----------------------------------------------- | :---------------------------------------------------------------------- |
| `f`      | [`Mapper`](../README.md#mapper)\<`number`, `T`\> | The function to apply on each element of the range.                     |
| `start?` | `number`                                         | the start of the range. Defaults to 0.                                  |
| `end?`   | `number`                                         | the end of the range. Defaults to infinity.                             |
| `step?`  | `number`                                         | increment in the range. Defaults to 1 if `end` > `start`, -1 otherwise. |

#### Returns

`IterableIterator`\<`T`\>

A new iterator resulting from apply f on all elements in the [`start`,`end`[ range by increment of `step`.

**`Example`**

```ts
loop(x => 2 * x, 1, 100, 2);
// yields 2, 6, 10, ..., 198
```

**`Remarks`**

```ts
for (const v of loop(f, start, end, step)) yield v;
```

is equivalent to

```ts
for (const v of range(start, end, step)) yield f(v);
```

---

### range

▸ **range**(`start?`, `end?`, `step?`): `IterableIterator`\<`number`\>

Returns an `IterableIterator` from `start` (inclusively) to `end` (exclusively) by increment of `step`.

#### Parameters

| Name     | Type     | Description                                                             |
| :------- | :------- | :---------------------------------------------------------------------- |
| `start?` | `number` | the start of the range. Defaults to 0.                                  |
| `end?`   | `number` | the end of the range. Defaults to infinity.                             |
| `step?`  | `number` | increment in the range. Defaults to 1 if `end` > `start`, -1 otherwise. |

#### Returns

`IterableIterator`\<`number`\>

A new iterator for the range [`start`,`end`[ by increment of `step`.

**`Example`**

```ts
range(1, 100, 2);
// yields 1, 3, 5, 7, ..., 99
```

---

### repeat

▸ **repeat**\<`T`\>(`f`, `count?`): `IterableIterator`\<`T`\>

Returns an iterator resulting from applying f on all elements of the range [0,`count`]

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name     | Type                                             | Description                                         |
| :------- | :----------------------------------------------- | :-------------------------------------------------- |
| `f`      | [`Mapper`](../README.md#mapper)\<`number`, `T`\> | The function to apply on each element of the range. |
| `count?` | `number`                                         | the numbe of times f should be invoked.             |

#### Returns

`IterableIterator`\<`T`\>

A new iterator resulting from applying f on all elements in the [`start`,`end`[ range by increment of `step`.

**`Example`**

```ts
repeat(x => x * 2, 10);
// yields 0, 2, 4, ..., 18
```

**`Remarks`**

```ts
for (const v of repeat(f, count)) yield v;
```

is equivalent to

```ts
for (const v of range(0, count, 1)) yield f(v);
```
