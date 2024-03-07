[ts-fluent-iterators](../README.md) / [Collectors](../modules/Collectors.md) / StringJoiner

# Class: StringJoiner\<A\>

[Collectors](../modules/Collectors.md).StringJoiner

A `Collector` that accepts elements of type `A` and returns a `string`

**`Example`**

```ts
const c = new StringJoiner<string>(', ', '[', ']');
c.collect('foo');
c.collect('bar');
c.collect('baz');
// c.result : [foo, bar, baz]
```

## Type parameters

| Name | Description                              |
| :--- | :--------------------------------------- |
| `A`  | The type of the elements being accepted. |

## Implements

- [`Collector`](../interfaces/Collectors.Collector.md)\<`A`, `string`\>

## Table of contents

### Constructors

- [constructor](Collectors.StringJoiner.md#constructor)

## Constructors

### constructor

• **new StringJoiner**\<`A`\>(`separator?`, `prefix?`, `suffix?`): [`StringJoiner`](Collectors.StringJoiner.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type     | Default value | Description                  |
| :---------- | :------- | :------------ | :--------------------------- |
| `separator` | `string` | `','`         | separator between elements.  |
| `prefix`    | `string` | `''`          | prefix of the joined string. |
| `suffix`    | `string` | `''`          | suffix of the joined string. |

#### Returns

[`StringJoiner`](Collectors.StringJoiner.md)\<`A`\>
