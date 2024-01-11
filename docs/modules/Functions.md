[ts-fluent-iterators](../README.md) / [Exports](../modules.md) / Functions

# Namespace: Functions

## Table of contents

### Variables

- [CollisionHandlers](Functions.md#collisionhandlers)

### Functions

- [alwaysFalse](Functions.md#alwaysfalse)
- [alwaysTrue](Functions.md#alwaystrue)
- [asyncAlwaysFalse](Functions.md#asyncalwaysfalse)
- [asyncAlwaysTrue](Functions.md#asyncalwaystrue)
- [asyncIdentity](Functions.md#asyncidentity)
- [defaultComparator](Functions.md#defaultcomparator)
- [identity](Functions.md#identity)
- [lengthComparator](Functions.md#lengthcomparator)
- [reverseComparator](Functions.md#reversecomparator)

## Variables

### CollisionHandlers

• `Const` **CollisionHandlers**: `Readonly`\<\{ `ignore`: \<K, V\>(`_k`: `K`, `oldValue`: `V`, `_newValue`: `V`) => `V` = handleCollisionIgnore; `overwrite`: \<K, V\>(`_k`: `K`, `_oldValue`: `V`, `newValue`: `V`) => `V` = handleCollisionOverwrite; `reject`: \<K, V\>(`k`: `K`, `oldValue`: `V`, `newValue`: `V`) => `never` = handleCollisionThrow }\>

## Functions

### alwaysFalse

▸ **alwaysFalse**\<`A`\>(`_`): `boolean`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | `A` |

#### Returns

`boolean`

___

### alwaysTrue

▸ **alwaysTrue**\<`A`\>(`_`): `boolean`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | `A` |

#### Returns

`boolean`

___

### asyncAlwaysFalse

▸ **asyncAlwaysFalse**\<`A`\>(`_`): `Promise`\<`boolean`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | `A` |

#### Returns

`Promise`\<`boolean`\>

___

### asyncAlwaysTrue

▸ **asyncAlwaysTrue**\<`A`\>(`_`): `Promise`\<`boolean`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | `A` |

#### Returns

`Promise`\<`boolean`\>

___

### asyncIdentity

▸ **asyncIdentity**\<`A`\>(`a`): `Promise`\<`Awaited`\<`A`\>\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

#### Returns

`Promise`\<`Awaited`\<`A`\>\>

___

### defaultComparator

▸ **defaultComparator**\<`A`\>(`a1`, `a2`): ``1`` \| ``-1`` \| ``0``

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a1` | `A` |
| `a2` | `A` |

#### Returns

``1`` \| ``-1`` \| ``0``

___

### identity

▸ **identity**\<`A`\>(`a`): `A`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

#### Returns

`A`

___

### lengthComparator

▸ **lengthComparator**(`a`, `b`): ``1`` \| ``-1`` \| ``0``

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `Object` |
| `a.length` | `number` |
| `b` | `Object` |
| `b.length` | `number` |

#### Returns

``1`` \| ``-1`` \| ``0``

___

### reverseComparator

▸ **reverseComparator**\<`A`\>(`a1`, `a2`): ``1`` \| ``-1`` \| ``0``

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a1` | `A` |
| `a2` | `A` |

#### Returns

``1`` \| ``-1`` \| ``0``
