[**ts-fluent-iterators**](../../../../README.md)

---

[ts-fluent-iterators](../../../../README.md) / [Comparators](../README.md) / byAttr

# Function: byAttr()

> **byAttr**\<`A`\>(`attr`): [`Comparator`](../../../../type-aliases/Comparator.md)\<`A`\>

A comparator that sorts the elements based on the natural order of an attribute.

## Type Parameters

### A

`A` _extends_ `object`

## Parameters

### attr

keyof `A`

## Returns

[`Comparator`](../../../../type-aliases/Comparator.md)\<`A`\>

## Example

```ts
interface X {
  a: number;
  b: number;
}
const orderByA = byAttr<X>('a');
// comparator to object of type X based on their 'a' attribute
```
