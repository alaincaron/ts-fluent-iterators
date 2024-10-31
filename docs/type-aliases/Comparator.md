[**ts-fluent-iterators**](../README.md) • **Docs**

---

[ts-fluent-iterators](../README.md) / Comparator

# Type Alias: Comparator()\<A\>

> **Comparator**\<`A`\>: (`a1`, `a2`) => `number`

A function used to compare objects for ordering. Its return value should satisfy the following properties:

- strictly negative if first operand is before (<) second operand
- strictly positive if first operand is after (>) second operand
- 0 if both operands have same ordering (===)

## Type Parameters

• **A**

Type of objects to compare.

## Parameters

• **a1**: `A`

The first operand

• **a2**: `A`

The second operand

## Returns

`number`

## Example

To compare string case insensitively:

```ts
const ignoreCaseComparator: Comparator<string> = (s1, s2) => {
  const l1 = s1.toLowerCase();
  const l2 = s2.toLowerCase();
  if (l1 < l2) return -1;
  if (l1 > l2) return 1;
  return 0;
};
```
