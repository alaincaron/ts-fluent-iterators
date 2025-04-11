[**ts-fluent-iterators**](../../../../README.md)

---

[ts-fluent-iterators](../../../../README.md) / [Generators](../README.md) / repeat

# Function: repeat()

> **repeat**\<`T`\>(`f`, `count?`): `IterableIterator`\<`T`\>

Returns an iterator resulting from applying f on all elements of the range [0,`count`]

## Type Parameters

### T

`T`

## Parameters

### f

[`Mapper`](../../../../type-aliases/Mapper.md)\<`number`, `T`\>

The function to apply on each element of the range.

### count?

`number`

the numbe of times f should be invoked.

## Returns

`IterableIterator`\<`T`\>

A new iterator resulting from applying f on all elements in the [`start`,`end`[ range by increment of `step`.

## Example

```ts
repeat(x => x * 2, 10);
// yields 0, 2, 4, ..., 18
```

## Remarks

```ts
for (const v of repeat(f, count)) yield v;
```

is equivalent to

```ts
for (const v of range(0, count, 1)) yield f(v);
```
