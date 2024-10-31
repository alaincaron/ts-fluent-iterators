[**ts-fluent-iterators**](../README.md) • **Docs**

---

[ts-fluent-iterators](../README.md) / CollisionHandlers

# Variable: CollisionHandlers

> `const` **CollisionHandlers**: `object`

Default collision handlers for `MapCollector`

```
- overwrite: new value overwrite existing value
- ignore: new value is ignored
- reject: an Error is thrown
```

## Type declaration

### ignore()

> `readonly` **ignore**: \<`K`, `V`\>(`_k`, `oldValue`, `_newValue`) => `V` = `handleCollisionIgnore`

#### Type Parameters

• **K**

• **V**

#### Parameters

• **\_k**: `K`

• **oldValue**: `V`

• **\_newValue**: `V`

#### Returns

`V`

### overwrite()

> `readonly` **overwrite**: \<`K`, `V`\>(`_k`, `_oldValue`, `newValue`) => `V` = `handleCollisionOverwrite`

#### Type Parameters

• **K**

• **V**

#### Parameters

• **\_k**: `K`

• **\_oldValue**: `V`

• **newValue**: `V`

#### Returns

`V`

### reject()

> `readonly` **reject**: \<`K`, `V`\>(`k`, `oldValue`, `newValue`) => `never` = `handleCollisionThrow`

#### Type Parameters

• **K**

• **V**

#### Parameters

• **k**: `K`

• **oldValue**: `V`

• **newValue**: `V`

#### Returns

`never`
