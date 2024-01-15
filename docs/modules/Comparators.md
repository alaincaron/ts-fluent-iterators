[ts-fluent-iterators](../README.md) / Comparators

# Namespace: Comparators

## Table of contents

### Functions

- [defaultComparator](Comparators.md#defaultcomparator)
- [reverseComparator](Comparators.md#reversecomparator)

## Functions

### defaultComparator

▸ **defaultComparator**\<`A`\>(`a1`, `a2`): ``1`` \| ``-1`` \| ``0``

Default comparator.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | The type of elements to be compared |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a1` | `A` | The left-hand size argument |
| `a2` | `A` | The right-hand size argument |

#### Returns

``1`` \| ``-1`` \| ``0``

- -1 if `a1 < a2`,
- 1 if `a1 > a2`,
- 0 otherwise.

___

### reverseComparator

▸ **reverseComparator**\<`A`\>(`a1`, `a2`): ``1`` \| ``-1`` \| ``0``

Reverse comparator.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | The type of elements to be compared |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a1` | `A` | The left-hand size argument |
| `a2` | `A` | The right-hand size argument |

#### Returns

``1`` \| ``-1`` \| ``0``

- 1 if `a1 < a2`,
- -1 if `a1 > a2`,
- 0 otherwise.
