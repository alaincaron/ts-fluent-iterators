[**ts-fluent-iterators**](../../../README.md)

---

[ts-fluent-iterators](../../../README.md) / [Comparators](../README.md) / fromPredicate

# Function: fromPredicate()

> **fromPredicate**\<`A`\>(`isLessThan`): [`Comparator`](../../../type-aliases/Comparator.md)\<`A`\>

Returns a comparator base on a `Binarypredicate`

## Type Parameters

• **A**

The type of elements to be compare

## Parameters

### isLessThan

[`BinaryPredicate`](../../../type-aliases/BinaryPredicate.md)\<`A`, `A`\>

A `BinaryPredicate` used to order the elements. The predicate must follow ordering rules, i.e isLessThan(a,b) = true implies isLessThan(b,a) is false.

## Returns

[`Comparator`](../../../type-aliases/Comparator.md)\<`A`\>

## Example

```ts
const orderByLen = fromPredicate<string>((s1, s2) => s1.length < s2.length);
```
