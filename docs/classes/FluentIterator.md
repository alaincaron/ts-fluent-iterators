[**ts-fluent-iterators**](../README.md)

---

[ts-fluent-iterators](../README.md) / FluentIterator

# Class: FluentIterator\<A\>

Iterator with a Fluent interface.

## Type Parameters

### A

`A`

The type of elements being iterated.

## Implements

- `Iterator`\<`A`\>
- `Iterable`\<`A`\>

## Constructors

### Constructor

> **new FluentIterator**\<`A`\>(`iter`): `FluentIterator`\<`A`\>

Creates a `FluentIterator` by wrapping an `Iterator`

#### Parameters

##### iter

`Iterator`\<`A`\>

The `Iterator` being wrapped into a `FluentIterator`

#### Returns

`FluentIterator`\<`A`\>

#### Example

```ts
const iterator = new FluentIterator([1, 2, 3][Symbol.iterator]());
```

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Iterator`\<`A`\>

Used to make this FluentIterator being seen as an
`Iterable<A>`. This allows them to be used in APIs expecting an
`Iterable<A>`

#### Returns

`Iterator`\<`A`\>

#### Implementation of

`Iterable.[iterator]`

---

### all()

> **all**(`predicate`): `boolean`

Returns `true` if the [predicate](../type-aliases/Predicate.md) argument evalatues to true for all items of this FluentIterator, false otherwsie.

#### Parameters

##### predicate

[`Predicate`](../type-aliases/Predicate.md)\<`A`\>

The predicate being evaluated

#### Returns

`boolean`

#### Example

```ts
iterator([1, 2]).all(x => x > 0); // true
iterator([1, 2]).all(x => x >= 2); // false
FluentIterator.empty().all(_ => false); // true;
```

---

### append()

> **append**(`items`): `FluentIterator`\<`A`\>

Returns a new FluentIterator that is the result of appending its argument to this FluentIterator

#### Parameters

##### items

An `Iterator` or `Iterable` whose items are appended to this FluentIterator.

`Iterator`\<`A`, `any`, `any`\> | `Iterable`\<`A`, `any`, `any`\>

#### Returns

`FluentIterator`\<`A`\>

#### Example

```ts
iterator([1, 2, 3]).append([4, 5, 6]);
// yield 1, 2, 3, 4, 5, 6
```

---

### apply()

> **apply**\<`B`\>(`mapper`): `B`

Returns the resulf of applying the [Mapper](../type-aliases/Mapper.md) to the wrapped iterator.
This method allows to use an Iterator function in a fluent way.

#### Type Parameters

##### B

`B` = `A`

#### Parameters

##### mapper

[`Mapper`](../type-aliases/Mapper.md)\<`Iterator`\<`A`, `any`, `any`\>, `B`\>

#### Returns

`B`

#### Example

```ts
function sumOfIterator(Iterator<number>: iter) {
   let sum = 0;
   for (;;) {
      const item = iter.next();
      if (item.done) return sum;
      sum += item.value;
   }
}

iterator([1,2,3]).apply(sumOfiterator);
// returns 6
```

---

### collect()

> **collect**(): `A`[]

Collects items into an array.

#### Returns

`A`[]

an array consisting of the elements of this `FluentIterator`

#### Example

```ts
const iter = iterator([1, 2, 3]);
const data = iter.collect();
// data is [1,2,3]
```

---

### collectTo()

> **collectTo**\<`B`\>(`collector`): `B`

Collects items from the `FluentIterator` into a `Collector`.

#### Type Parameters

##### B

`B`

The result type of the `Collector`.

#### Parameters

##### collector

[`Collector`](../interfaces/Collector.md)\<`A`, `B`\>

The `Collector` into which to collect the items

#### Returns

`B`

The result of the `collector`

#### Example

```ts
const collector = arrayCollector<string>;
const iter = iterator([1, 2, 3]);
const data = iter.collectTo(collector);
// data is [1,2,3]
```

---

### collectToMap()

> **collectToMap**\<`K`\>(`mapper`, `collisionHandler?`): `Map`\<`K`, `A`\>

Collects items into a `Map` by mapping values into keys.

#### Type Parameters

##### K

`K`

The type of the keys of the `Map`

#### Parameters

##### mapper

[`Mapper`](../type-aliases/Mapper.md)\<`A`, `K`\>

Maps the values into keys

##### collisionHandler?

[`CollisionHandler`](../type-aliases/CollisionHandler.md)\<`K`, `A`\>

Specifies how to handle the collision. Default is to ignore collision.

#### Returns

`Map`\<`K`, `A`\>

a Map whose keys are the result of applying the `mapper` to the values of this FluentIterator and the values are iterated items.

#### Example

```ts
const iter = iterator('foo', 'bar', 'foobar');
const data = iter.collectToMap(s => s.length);
// data is Map {3 => "foo", 6 => "foobar"}
```

---

### collectToMap2()

> **collectToMap2**\<`K`, `V`\>(`mapper`, `collisionHandler?`): `Map`\<`K`, `V`\>

Collects items into a `Map` by mapping values into keys and new value

#### Type Parameters

##### K

`K`

The type of the keys of the `Map`

##### V

`V`

The type of the values of the `Map`

#### Parameters

##### mapper

[`Mapper`](../type-aliases/Mapper.md)\<`A`, \[`K`, `V`\]\>

Maps the values into [key, values] pairs

##### collisionHandler?

[`CollisionHandler`](../type-aliases/CollisionHandler.md)\<`K`, `V`\>

Specifies how to handle the collision. Default is to ignore collision.

#### Returns

`Map`\<`K`, `V`\>

a Map whose entries are the result of applying the `mapper` to the values of this FluentIterator.

#### Example

```ts
const iter = iterator('foo', 'bar', 'foobar');
const data = iter.collectToMap2(s => [s, s.length]);
// data is Map { "foo" => 3, "bar" => 3, "foobar" => 6 }
```

---

### collectToObject()

> **collectToObject**(`mapper`, `collisionHander?`): `Record`\<`string`, `A`\>

Collects items into a `Record` by mapping values into keys.

#### Parameters

##### mapper

[`Mapper`](../type-aliases/Mapper.md)\<`A`, `string`\>

Maps the values into keys

##### collisionHander?

[`CollisionHandler`](../type-aliases/CollisionHandler.md)\<`string`, `A`\>

#### Returns

`Record`\<`string`, `A`\>

a `Record` whose keys are the result of applying the `mapper` to the values of this FluentIterator and the values are iterated items.

#### Example

```ts
const iter = iterator('foo', 'bar', 'foobar');
const data = iter.collectToObject(s => s.toUpperCase());
// data is { FOO: "foo", BAR: "bar", FOOBAR: "foobar" }
```

---

### collectToObject2()

> **collectToObject2**\<`V`\>(`mapper`, `collisionHandler?`): `Record`\<`string`, `V`\>

Collects items into a `Record` by mapping values into keys and new value

#### Type Parameters

##### V

`V`

The type of the values of the `Map`

#### Parameters

##### mapper

[`Mapper`](../type-aliases/Mapper.md)\<`A`, \[`string`, `V`\]\>

Maps the values into [key, values] pairs

##### collisionHandler?

[`CollisionHandler`](../type-aliases/CollisionHandler.md)\<`string`, `V`\>

Specifies how to handle the collision. Default is to ignore collision.

#### Returns

`Record`\<`string`, `V`\>

a `Record` whose entries are the result of applying the `mapper` to the values of this FluentIterator.

#### Example

```ts
const iter = iterator('foo', 'bar', 'foobar');
const data = iter.collectToObject2(s => [s, s.length]);
// data is { foo: 3, bar: 3, foobar: 6 }
```

---

### collectToSet()

> **collectToSet**(): `Set`\<`A`\>

Collects items into a `Set`.

#### Returns

`Set`\<`A`\>

a Set consisting of the elements of this FluentIterator

#### Example

```ts
const iter = iterator([1, 2, 3, 1, 2, 3]);
const data = iter.collectToSet();
// data is Set { 1,2,3 }
```

---

### concat()

> **concat**(...`iterables`): `FluentIterator`\<`A`\>

Returns a new FluentIterator that is the result of apepending all its argument to this FluentIterator

#### Parameters

##### iterables

...(`Iterator`\<`A`, `any`, `any`\> \| `Iterable`\<`A`, `any`, `any`\>)[]

An `Array of `Iterator`or`Iterable` whose items are appended to this FluentIterator.

#### Returns

`FluentIterator`\<`A`\>

#### Example

```ts
iterator([1, 2, 3]).concat([4, 5, 6], [7, 8, 9]);
// yield 1, 2 ,3, 4, 5, 6, 7, 8, 9
```

---

### contains()

> **contains**(`predicate`): `boolean`

Returns true if this FluentIterator yields an element for which the [Predicate](../type-aliases/Predicate.md) evaluates to true.

#### Parameters

##### predicate

[`Predicate`](../type-aliases/Predicate.md)\<`A`\>

The predicate to evaluate.

#### Returns

`boolean`

true if this FluentIterator yields an element for which the [Predicate](../type-aliases/Predicate.md) evaluates to true, false otherwise.

---

### count()

> **count**(): `number`

Returns the number of items in this FluentIterator.

#### Returns

`number`

#### Example

```ts
iterator([1, 2]).count(); // 2
FluentIterator.empty().count();
0;
```

---

### distinct()

> **distinct**\<`K`\>(`mapper?`): `FluentIterator`\<`A`\>

Returns a new FluentIterator consisting of distinct elements from this iterator.

#### Type Parameters

##### K

`K` = `A`

#### Parameters

##### mapper?

[`Mapper`](../type-aliases/Mapper.md)\<`A`, `K`\>

Used to determine distinctness of elements. Default to <code>identity</code>

#### Returns

`FluentIterator`\<`A`\>

#### Example

```ts
iterator([1,2,2,3,1,4]).distinct();
yields 1,2,3,4

iterator ([1,2,2,3,1,4], x => x %2).distinct();
yields 1,2
```

---

### enumerate()

> **enumerate**(`start`): `FluentIterator`\<\[`A`, `number`\]\>

Returns a new FluentIterator that yields pairs of elements
consisting of the elements yielded by this
@{link FluentIterator} and their index in the iteration.

#### Parameters

##### start

`number` = `0`

The starting index

#### Returns

`FluentIterator`\<\[`A`, `number`\]\>

#### Example

```ts
const iter = iterator(['a', 'b', 'c']);
const enumerated = iter.enumerate(10);
// enumerated will yield ["a", 10], ["b", 11], ["c", 12]
```

---

### filter()

> **filter**(`predicate`): `FluentIterator`\<`A`\>

Returns a new FluentIterator consisting of elements for which the `predicate` evaluates to true.

#### Parameters

##### predicate

[`Predicate`](../type-aliases/Predicate.md)\<`A`\>

the predicate on which the evaluate the items.

#### Returns

`FluentIterator`\<`A`\>

a new FluentIterator consisting of elements of this FluentIterator for which the `predicate` evaluates to true.

#### Example

```ts
iterator([1, 8, 2, 3, 4, 6]).filter(x => x % 2 === 1);
// yields 1, 2
```

---

### filterMap()

> **filterMap**\<`B`\>(`mapper`): `FluentIterator`\<`B`\>

Returns a new FluentIterator consisting of applying the
[Mapper](../type-aliases/Mapper.md) to all elements of this FluentIterator and
filtering those for which the [Mapper](../type-aliases/Mapper.md) returned null or
undefined

#### Type Parameters

##### B

`B`

The type of the elements of the returned FluentIterator

#### Parameters

##### mapper

[`Mapper`](../type-aliases/Mapper.md)\<`A`, `undefined` \| `null` \| `B`\>

Transformation applied to elements of this FluentIterator

#### Returns

`FluentIterator`\<`B`\>

A new FluentIterator

#### Remarks

```ts
iter.filterMap(mapper);
```

is equivalent to

```ts
iter.map(mapper).removeNull();
```

---

### first()

> **first**(): `undefined` \| `A`

Returns the first element of this FluentIterator or `undefined` if this FluentIterator is empty.

#### Returns

`undefined` \| `A`

The first element of this FluentIterator or `undefined`.

---

### fold()

> **fold**\<`B`\>(`reducer`, `initialValue`): `B`

Executes the [reducer](../type-aliases/Reducer.md) function on each element
of this FluentIterator, in order, passing in
the return value from the calculation on the preceding element. The
final result of running the reducer across all elements of the array
is a single value.

#### Type Parameters

##### B

`B`

the type into which the elements are being folded to

#### Parameters

##### reducer

[`Reducer`](../type-aliases/Reducer.md)\<`A`, `B`\>

The reducer to be applied at each iteration.

##### initialValue

`B`

The value of the accumulator to be used in the first call to `reducer`

#### Returns

`B`

#### Remarks

If the FluentIterator is empty, `initialValue` is returned.

#### Example

```ts
To compute the sum of elements of an array:
const sum = iterator([1,2,3])
   .fold((acc, x) => acc + x, 0)
// sum = 6
```

---

### forEach()

> **forEach**(`f`): `void`

Applies the [mapper](../type-aliases/Consumer.md) to each element of this FluentIterator

#### Parameters

##### f

[`Consumer`](../type-aliases/Consumer.md)\<`A`\>

the operation to be invoked on each element.

#### Returns

`void`

#### Remarks

The results of invoking the `mapper` are ignored unless it throws.

#### Example

```ts
iter.forEach(console.log);
```

---

### groupBy()

> **groupBy**\<`K`\>(`mapper`): `Map`\<`K`, `A`[]\>

Returns a `Map` where keys are the result of applying the parameter [mapper](../type-aliases/Mapper.md) to the elements of the
this FluentIterator and the values are Arrays of
the elements that are mapped to the same key.

#### Type Parameters

##### K

`K`

#### Parameters

##### mapper

[`Mapper`](../type-aliases/Mapper.md)\<`A`, `K`\>

The [Mapper](../type-aliases/Mapper.md) used to group items.

#### Returns

`Map`\<`K`, `A`[]\>

#### Example

```ts
iterator([1, 2, 3]).groupBy(x => x % 2 === 0);
// Map { true => [2], false => [1, 3]}
```

---

### groupBy2()

> **groupBy2**\<`K`, `V`\>(`mapper`): `Map`\<`K`, `V`[]\>

Returns a `Map` where entries are the result of applying the parameter [mapper](../type-aliases/Mapper.md) to the elements of the
this FluentIterator,

#### Type Parameters

##### K

`K`

##### V

`V`

#### Parameters

##### mapper

[`Mapper`](../type-aliases/Mapper.md)\<`A`, \[`K`, `V`\]\>

The [Mapper](../type-aliases/Mapper.md) used to group items.

#### Returns

`Map`\<`K`, `V`[]\>

#### Example

```ts
iterator([1,2,3]).groupBy2(x => [x % 2 === 0, 2 * x];
// Map { true => [4], false => [2, 6]}
```

---

### includes()

> **includes**(`target`): `boolean`

Returns true if this FluentIterator yields an element equals to `target`

#### Parameters

##### target

`A`

value to look for

#### Returns

`boolean`

true if this FluentIterator yields an element equals to `target`, false otherwise.
@

#### Remarks

```ts
iter.includes(target);
```

is equivalent to

```ts
iter.contains(x => x === target);
```

---

### join()

> **join**(`separator?`, `prefix?`, `suffix?`): `string`

Joins items of this FluentIterator into a string.

#### Parameters

##### separator?

`string`

string used to delimite elements

##### prefix?

`string`

string used to prefix the resulting string

##### suffix?

`string`

#### Returns

`string`

#### Example

```ts
iterator([1, 2, 3]).join(',', '[', ']');
// "[1,2,3]"
```

#### Remarks

The items are converted into a string using string-interpolation.

---

### last()

> **last**(): `undefined` \| `A`

Returns the last element of this FluentIterator

#### Returns

`undefined` \| `A`

#### Example

```ts
iterator([1, 2]).last();
// 2

FluentIterator.empty().last();
// undefined
```

---

### map()

> **map**\<`B`\>(`mapper`): `FluentIterator`\<`B`\>

Returns a new FluentIterator consisting of applying the [Mapper](../type-aliases/Mapper.md) to all elements of this FluentIterator.

#### Type Parameters

##### B

`B`

The type of the elements of the returned FluentIterator

#### Parameters

##### mapper

[`Mapper`](../type-aliases/Mapper.md)\<`A`, `B`\>

Transformation applied to elements of this FluentIterator

#### Returns

`FluentIterator`\<`B`\>

A new FluentIterator

#### Example

```ts
const iter = iterator(['foo','bar',foobar'])
iter.map(s => s.length)
// yields 3, 3, 6
```

---

### max()

> **max**(`comparator?`): `undefined` \| `A`

Returns the maximum element according to the argument [comparator](../type-aliases/Comparator.md).

#### Parameters

##### comparator?

[`Comparator`](../type-aliases/Comparator.md)\<`A`\>

#### Returns

`undefined` \| `A`

#### Example

```ts
iterator([1, 2]).max();
// 2

iterator(['foo', 'foobar']).max((s1, s2) => s1.length - s2.length);
// 'foobar'

FluentIterator.empty().max(); // undefined
```

---

### min()

> **min**(`comparator?`): `undefined` \| `A`

Returns the minimum element according to the argument [comparator](../type-aliases/Comparator.md).

#### Parameters

##### comparator?

[`Comparator`](../type-aliases/Comparator.md)\<`A`\>

The {link Comparator} used to order the elements.

#### Returns

`undefined` \| `A`

#### Example

```ts
iterator([1,2]).min();
// 1

iterator(['foo','foobar']).min(
   (s1,s2) => s1.length - s2.length
);
// 'foo'
(
FluentIterator.empty().min();
// undefined
```

---

### next()

> **next**(): `IteratorResult`\<`A`\>

Used to make this FluentIterator being seen as an
`Iterator<A>`. This allows FluentIterator objects to be
used in APIs expecting an `Iterator<A>`

#### Returns

`IteratorResult`\<`A`\>

#### Implementation of

`Iterator.next`

---

### partition()

> **partition**(`size`): `FluentIterator`\<`A`[]\>

Returns a new FluentIterator consisting of
partitions (arrays) of at most `size` elements.

#### Parameters

##### size

`number`

The size of the partitions.

#### Returns

`FluentIterator`\<`A`[]\>

#### Example

```ts
iterator([1, 2, 3, 4, 5]).partition(2);
// yields [1, 2], [3, 4], [5]
```

#### Remarks

The last partition may contain less than `size` elements but is
never empty.

---

### peek()

> **peek**(`mapper`): `FluentIterator`\<`A`\>

Returns a new FluentIterator that
yields the same elements as this FluentIterator
and executes the [mapper](../type-aliases/Consumer.md) on each element.

#### Parameters

##### mapper

[`Consumer`](../type-aliases/Consumer.md)\<`A`\>

the operation to be invoked on each element.

#### Returns

`FluentIterator`\<`A`\>

#### Remarks

This can be useful to see intermediate steps of complex FluentIterator. The results of invoking the `mapper` are ignored unless it throwws.

#### Example

```ts
const iter = iterator([1, 2, 3]);
iter
  .peek(x => console.log(`before filter ${x}`))
  .filter(x => x % 2 === 0)
  .peek(x => console.log(`after filter: ${x}`))
  .collect();
// ouputs:
// before filter 1
// before filter 2
// after filter: 2
// before filter 3
// result : [ 2 ]
```

---

### prepend()

> **prepend**(`items`): `FluentIterator`\<`A`\>

Returns a new FluentIterator that is the result of prepending its argument to this FluentIterator

#### Parameters

##### items

An `Iterator` or `Iterable` whose items are prepended to this FluentIterator.

`Iterator`\<`A`, `any`, `any`\> | `Iterable`\<`A`, `any`, `any`\>

#### Returns

`FluentIterator`\<`A`\>

#### Example

```ts
iterator([1, 2, 3]).prepend([4, 5, 6]);
// yield 4, 5, 6, 1, 2, 3
```

---

### reduce()

> **reduce**(`reducer`, `initialValue?`): `undefined` \| `A`

Special case of [FluentIterator.fold](#fold) where items being iteraded on and the accumulator are of the same type.

#### Parameters

##### reducer

[`Reducer`](../type-aliases/Reducer.md)\<`A`, `A`\>

The reducer to be applied at each iteration.

##### initialValue?

`A`

The value of the accumulator to be used in the first call to `reducer`. If omitted, the first element of this FluentIterator is used.

#### Returns

`undefined` \| `A`

#### Remarks

If the FluentIterator is empty, `initialValue` is returned.

#### Example

```ts
To compute the sum of elements of an array:
const sum = iterator([1,2,3])
   .reduce((acc, x) => acc + x)
// sum = 6
```

---

### removeNull()

> **removeNull**(): `FluentIterator`\<`A`\>

Returns a new FluentIterator consisting of elements of this FluentIterator that are not `null` nor `undefined`

#### Returns

`FluentIterator`\<`A`\>

a new FluentIterator where all the `null` or `undefined` elements are removed.

---

### scan()

> **scan**\<`B`\>(`reducer`, `initialValue`, `emitInitial`): `FluentIterator`\<`B`\>

Applies a reducer function over this FluentIterator, returning a FluentIterator yielding each intermediate reduce result.

Similar to `fold`, but instead of returning only the final result,
`scan()` emits the accumulated value at each step. This is useful for calculating running
totals, prefix sums, rolling aggregates, and more.

If this FluentIterator is empty, no values are emitted unless `emitInitial` is `true`.

#### Type Parameters

##### B

`B`

The type of the accumulated result.

#### Parameters

##### reducer

[`Reducer`](../type-aliases/Reducer.md)\<`A`, `B`\>

The reducer function to be applied at each iteration

##### initialValue

`B`

The initial value of the accumulator.

##### emitInitial

`boolean` = `false`

#### Returns

`FluentIterator`\<`B`\>

A new FluentIterator that emits the accumulator at each step.

#### Example

```ts
FluentIterator.from([1, 2, 3, 4]).scan((acc, x) => acc + x, 0); // yields 1, 3, 6, 10
```

---

### skip()

> **skip**(`n`): `FluentIterator`\<`A`\>

Returns a FluentIterator skipping the first `n` elements of this FluentIterator and then yielding the subsequent ones.

#### Parameters

##### n

`number`

The number of elements to skip

#### Returns

`FluentIterator`\<`A`\>

a FluentIterator skpping the first `n` elements of this FluentIterator.

#### Remarks

If there are less than `n` elements in this FluentIterator, then an empty FluentIterator is returned.

---

### skipWhile()

> **skipWhile**(`predicate`): `FluentIterator`\<`A`\>

Returns a new FluentIterator that skips elements of this
FluentIterator until the [predicate](../type-aliases/Predicate.md)
evaluates to `true` and yields the subsequent ones.

#### Parameters

##### predicate

[`Predicate`](../type-aliases/Predicate.md)\<`A`\>

The predicate being evaluated

#### Returns

`FluentIterator`\<`A`\>

#### Example

```ts
iterator([1, 2, 3]).skipWhile(x => x < 2); // yields 2, 3
iterator([1, 2, 3]).skipWhile(x => x > 2); // yields 1, 2, 3
```

---

### some()

> **some**(`predicate`): `boolean`

Returns `true` if the [predicate](../type-aliases/Predicate.md) argument evalatues to true for some items of this FluentIterator, false otherwsie.

#### Parameters

##### predicate

[`Predicate`](../type-aliases/Predicate.md)\<`A`\>

The predicate being evaluated

#### Returns

`boolean`

#### Example

```ts
iterator([1, 2]).some(x => x > 1); // true
iterator([1, 2]).some(x => x > 2); // false
FluentIterator.empty().some(_ => true); // false;
```

---

### take()

> **take**(`n`): `FluentIterator`\<`A`\>

Returns a FluentIterator yielding the first `n` elements of this FluentIterator.

#### Parameters

##### n

`number`

The number of elements to take

#### Returns

`FluentIterator`\<`A`\>

a FluentIterator yielding the first `n` elements of this FluentIterator.

#### Remarks

If there are less than `n` elements in this FluentIterator, then only the available elements will be yielded.

---

### takeWhile()

> **takeWhile**(`predicate`): `FluentIterator`\<`A`\>

Returns a new FluentIterator that yields elements of this FluentIterator while the [predicate](../type-aliases/Predicate.md) evaluates to `true`.

#### Parameters

##### predicate

[`Predicate`](../type-aliases/Predicate.md)\<`A`\>

The predicate being evaluated

#### Returns

`FluentIterator`\<`A`\>

#### Example

```ts
iterator([1, 2, 3]).takeWhile(x => x < 2); // yields 1
iterator([1, 2, 3]).takeWhile(x => x > 2); // empty iterator
```

---

### tally()

> **tally**(): `Map`\<`A`, `number`\>

Returns a `Map` of the count of the occurences of each items of
this FluentIterator,

#### Returns

`Map`\<`A`, `number`\>

#### Example

```ts
iterator([foo','bar','foo').tally();
// Map { 'foo' => 2, bar => 1 }
```

---

### transform()

> **transform**\<`B`\>(`mapper`): `FluentIterator`\<`B`\>

Returns a new FluentIterator that is the result of transforming this FluentIterator.
This method allows to use a an Iterartor transformation in a fluent way.

#### Type Parameters

##### B

`B`

#### Parameters

##### mapper

[`Mapper`](../type-aliases/Mapper.md)\<`Iterator`\<`A`, `any`, `any`\>, `Iterator`\<`B`, `any`, `any`\>\>

The mapper to transform the iterator.

#### Returns

`FluentIterator`\<`B`\>

#### Example

```ts
function *doubleIterator(Iterator<number>: iter) {
   for (;;) {
      const item = iter.next();
      if (item.done) break;
      yield item.value * 2;
   }
}
iterator([1,2,3]).transform(doubleIterator).collect()
// [2, 4, 6]
```

---

### zip()

> **zip**\<`B`\>(`other`): `FluentIterator`\<\[`A`, `B`\]\>

Returns a new FluentIterator that yields pairs of elements
yielded by each Iterators which are navigated in parallel.
The length of the new FluentIterator is equal to the length the shorter iterator.

#### Type Parameters

##### B

`B`

The type of elements of the `other` iterator.

#### Parameters

##### other

The iterator that is combined with this one.

`Iterator`\<`B`, `any`, `any`\> | `Iterable`\<`B`, `any`, `any`\>

#### Returns

`FluentIterator`\<\[`A`, `B`\]\>

#### Example

```ts
const iter = iterator([1, 2, 3]);
const zipped = iter.zip(['a', 'b']);
// zipped will yield [1,"a"], [2,"b"]
```

---

### empty()

> `static` **empty**\<`A`\>(): `FluentIterator`\<`A`\>

Creates an empty `FluentIterator`. The returned iterator will not yield any element.

#### Type Parameters

##### A

`A` = `never`

the type of elements of the `FluentIterator`

#### Returns

`FluentIterator`\<`A`\>

An empty `FluentIterator`

---

### from()

> `static` **from**\<`A`\>(`generator`): `FluentIterator`\<`A`\>

Creates a `FluentIterator` from an `IteratorGenerator`.

#### Type Parameters

##### A

`A`

the type of elements of the `FluentIterator`

#### Parameters

##### generator

[`IteratorGenerator`](../type-aliases/IteratorGenerator.md)\<`A`\>

Used to generate an `Iterator` that will be wrapped into a `FluentIterator`

#### Returns

`FluentIterator`\<`A`\>

A new `FluentIterator`

#### Example

```ts
const iter = FluentIterator.from([1, 2, 3]);
```

---

### singleton()

> `static` **singleton**\<`A`\>(`a`): `FluentIterator`\<`A`\>

Creates a singleton operator. The returned iterator will yield a single or no element.

-

#### Type Parameters

##### A

`A`

the type of elements of the `FluentIterator`.

- This is useful to use a fluent interface on class that are not fluent.

#### Parameters

##### a

`A`

#### Returns

`FluentIterator`\<`A`\>

A `FluentIterator` yielding at most one element.

#### Example

```ts
const str = FluentIterator.singleton('foobar').map(f).map(g).first();
*
*
```
