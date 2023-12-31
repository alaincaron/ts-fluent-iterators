[ts-fluent-iterators](../../README.md) › [API](../index.md) ›
[Fluent Iterators](../index.md#fluent iterators) › [Class FluentIterator](fluent_iterator.md)

# Class: FluentIterator <**A**>

Represents a fluent iterator yielding values of type `A`

Definition:

```typescript
class FluentIterator<A> implements Iterator<A>, Iterable<A>
```

## constructor

```typescript
constructor(iter: Iterator<A>);
```

Constructs a new [`FluentIterator<A>`](fluent_iterator.md) wrapping an
`Iterator<A>`.

## collect

```typescript
collect(): A[];
```

Collects all yielded values into an Array.  
This is a terminal operation.

## filter

```typescript
filter(predicate: Predicate<A>): FluentIterator<A>;
```

Returns a new [`FluentIterator<A>`](fluent_iterator.md) yielding
elements matching the [predicate](../types/predicate.md).

## map

```typescript
map<B>(mapper: Mapper<A, B>): FluentIterator<B>;
```

Returns a new [`FluentIterator<B>`](fluent_iterator.md) yielding
elements transformed by the [mapper](../types/mapper.md).

## first

```typescript
first(predicate?: Predicate<A>): A | undefined;
```

Return the first element matching the
[predicate](../types/predicate.md) or `undefined` if no matching
element is found. If no [predicate](../types/predicate.md) is
specfied, then the first element of the iterator is returned or
`undefined` if the iterator is empty.  
The iterator's cursor is left after the last element tested.

## last

```typescript
last(predicate?: Predicate<A>): A | undefined;
```

Return the last element matching the
[predicate](../types/predicate.md) or `undefined` if no matching
element is found. If no [predicate](../types/predicate.md) is
specfied, then the last element of the iterator is returned or
`undefined` if the iterator is empty.  
The iterator's cursor is left after the last element tested.

## take

```typescript
take(n: number): FluentIterator<A>;
```

Returns a new [`FluentIterator<A>`](fluent_iterator.md) yielding the
first `n` elements of this [`FluentIterator<A>`](fluent_iterator.md).  
If there are less than `n` elements, then only the avaiable elements
will be yielded.

## skip

```typescript
skip(n: number): FluentIterator<A>;
```

Returns a new [`FluentIterator<A>`](fluent_iterator.md) skipping the
first `n` elements of this [`FluentIterator<A>`](fluent_iterator.md).  
If there are less than `n` elements, they are skipped and an empty
[`FluentIterator<A>`](fluent_iterator.md) is returned.

## contains

```typescript
contains(predicate: Predicate<A>): boolean;
```

Returns `true` if this [`FluentIterator`](fluent_iterator.md)
contains an element matching the [predicate](../types/predicate.md),
false otherwise.

## includes

```typescript
includes(target: A): boolean;
```

Returns `true` if this [`FluentIterator`](fluent_iterator.md)
contains an element equal (`===`) to the `target`, false otherwise.

## fold

```typescript
fold<B>(reducer: Reducer<A, B>, initialValue: B): B;
```

Executes the [`reducer`](../types/reducer.md) function on each element
of the [`FluentIterator`](fluent_iterator.md), in order, passing in
the return value from the calculation on the preceding element. The
final result of running the reducer across all elements of the array
is a single value.

- The parameter `initialValue` is used in the first invocation of the
  [`reducer`](../types/reducer.md).
- If the [`FluentIterator`](fluent_iterator.md) is empty, `initialValue` is returned.

This is a terminal operation.

##### Example

Computing the sum of the lengths of the strings in the iterator:

```typescript
const iterator: FluentIterator<string> = ...
const sum: number = iterator.fold(
   (acc: number, x: string) => acc + x.length,
   0
);
```

## reduce

```typescript
reduce(reducer: Reducer<A, A>, initialValue?: A): A | undefined;
```

Executes the [`reducer`](../types/reducer.md) function on each element
of the [`FluentIterator`](fluent_iterator.md), in order, passing in
the return value from the calculation on the preceding element. The
final result of running the [`reducer`](../types/reducer.md) across all elements of the [`FluentIterator`](fluent_iterator.md)
is a single value.

- The parameter `initialValue` is used in the first invocation of the
  [`reducer`](../types/reducer.md).
- If `initialValue` is not specified, the first element of the
  [`FluentIterator`](fluent_iterator.md), if available, is used in the first invocation of
  the [`reducer`](../types/reducer.md).
- If the [`FluentIterator`](fluent_iterator.md) is empty, `initialValue` is returned.

This is a terminal operation.

##### Example

Computing the sum of elements of an iterator:

```typescript
const iterator: FluentIterator<number> = ...
const sum: number = iterator.reduce(
   (acc, x) => acc + x
);
```

## zip

```typescript
zip<B>(other: Iterator<B> | Iterable<B>): FluentIterator<[A, B]>;
```

Creates a new [`FluentIterator`](fluent_iterator.md) that yields pairs of elements
yielded by each Iterators which are navigated in parallel.
The length of the new [`FluentIterator`](fluent_iterator.md) is equal to the length the shortest
iterator.

##### Example

```typescript
const iter = iterator([1, 2, 3]);
const zipped = iter.zip(['a', 'b']);
// zipped will yield [1,"a"], [2,"b"]
```

## enumerate

```typescript
enumerate(start = 0): FluentIterator<[A, number]>;
```

Creates a new [`FluentIterator`](fluent_iterator.md) that yields pairs of elements
consisting of the elements yielded by the
[`FluentIterator`](fluent_iterator.md) and their index in the
[`FluentIterator`](fluent_iterator.md).
The starting index is given by the parameter `start` which defaults to 0.

##### Example

```typescript
const iter = iterator(['a', 'b', 'c']);
const enumerated = iter.enumerate(10);
// enumerated will yield ["a", 10], ["b", 11], ["c", 12]
```

## tap

```typescript
tap(mapper: Mapper<A, any>): FluentIterator<A>;
```

Creates a new [`FluentIterator<A>`](fluent_iterator.md) that
yields the same elements as this [`FluentIterator<A>`](fluent_iterator.md)
and executes the [`mapper`](../types/mapper.md) on each element.

This can be useful to see intermediate steps of complex
[`FluentIterator`](fluent_iterator.md).

The results of invoking the [`mapper`](../types/mapper.md) are ignored.

##### Example

```typescript
iterator([1,2,3]).
tap(x => console.log(`before filter: ${x}`).
filter(x => x % 2 === 0).
tap(x => console.log(`after filter: ${x}`).
collect(); // returns [2]

// output:
before filter: 1
before filter: 2
before filter: 3
after filter: 2
```

## forEach

```typescript
forEach(mapper: Mapper<A, any>): void;
```

Executes the [`mapper`](../types/mapper.md) on each element of this
[`FluentIterator`](fluent_iterator.md).

The results of invoking the [`mapper`](../types/mapper.md) are ignored.

## append

```typescript
append(other: Iterator<A> | Iterable<A>): FluentIterator<A>;
```

Returns a new [`FluentIterator<A>`](fluent_iterator.md) that consists
of elements of this <`FluentIterable<A>`followed by elements of the
`other` iterable object.

##### Example

```typescript
iterator('foo', 'bar').append(['baz', 'foobar']).collect();
// returns [ "foo", "bar", "baz", "foobar"]
```

## prepend

```typescript
prepend(items: Iterator<A> | Iterable<A>): FluentIterator<A>;
```

Returns a new [`FluentIterator<A>`](fluent_iterator.md) that consists
of elements of the `other` iterable object followed by elemants of
this [`FluentIterable<A>`](fluent_iterable.md).

##### Example

```typescript
iterator('foo', 'bar').prepend(['baz', 'foobar']).collect();
// returns [ "baz", "foobar", "foo", "bar"]
```

## concat

```typescript
concat(...iterables: Array<Iterator<A> | Iterable<A>>):
FluentIterator<A>;
```

Returns a new [`FluentIterator<A>`](fluent_iterator.md) that consists
of elements of this [`FluentIterable<A>`](fluent_iterator.md) followed by elements of all of
the `iterables` object.

##### Example

```typescript
iterator("foo", "bar").(["baz", "foobar"], ["xyz"], []).collect();
// returns [ "foo", "bar", "baz", "foobar", "xyz' ]
```

## takeWhile

```typescript
takeWhile(predicate: Predicate<A>): FluentIterator<A>;
```

Returns a new [`FluentIterator<A>`](fluent_iterator.md) that will
yield all elements of this [`FluentIterator<A>`](fluent_iterator.md)
until the [`predicate`](../types/predicate.md) returns `false`.

##### Example

```typescript
iterator([1, 1, 2, 3, 5]).takeWhile(x => x % 2 === 1);
// yields 1,1
```

## skipWhile

```typescript
skipWhile(predicate: Predicate<A>): FluentIterator<A>;
```

Returns a new [`FluentIterator<A>`](fluent_iterator.md) that will
ignore all elements of this [`FluentIterator<A>`](fluent_iterator.md)
until the [`predicate`](../types/predicate.md) returns `false`. It
will then yield the subsequent elements.

##### Example

```typescript
iterator([1,1,2,3,5]).skipWhile(x => x % 2 === 1)
yields 2, 3, 5
```

## distinct

```typescript
distinct<B>(mapper?: Mapper<A,B>): FluentIterator<A>;
```

Returns a new [`FluentIterator`](fluent_iterator.md) that returns only
elements of this [`FluentIterator`] (fluent_iterator.md) mapping to distinct values.

##### Example

```typescript
iterator([1, 1, 2, 3, 4, 2, 3]).distinct(); // will yield 1,2,3,4
iterator([1, 1, 2, 3, 4, 2, 3]).distinct(x => x % 2); // will yield 1,2
```

## all

```typescript
all(predicate: Predicate<A>): boolean;
```

Returns `true` if the [`predicate`](../types/predicate.md) returns
`true` for all elements yielded by this
[`FluentIterator`](fluent_iterator.md), false otherwise.  
This is a terminal operation

##### Example

```typescript
iterator([]).all((_: unkown) => false); // returns true
iterator([1, 2]).all(x => x < 3); // returns true
iterator([1, 2]).all(x => x % 2 === 0); // returns false
```

## some

```typescript
some(predicate: Predicate<A>): boolean;
```

Returns `true` if the [`predicate`](../types/predicate.md) returns
`true` for at least one element yielded by this
[`FluentIterator`](fluent_iterator.md), false otherwise.  
This is a terminal operation.

##### Example

```typescript
iterator([]).some((_: unkown) => true); // returns false
iterator([1, 2]).some(x => x > 1); // returns true
iterator([1, 2]).some(x => x > 3); // returns false
```

## sum

```typescript
sum(mapper?: Mapper<A, number>): number;
```

Returns the sum of the elements of the [`FluentIterator`](fluent_iterator.md)
after applying the [`mapper`](../types/mapper.md).
If no [`mapper`](../types/mapper.md) is specified, the elements must
be `number`. If the elements are not `number`, then the
[`mapper`](../types/mapper.md) is applied to transform then into
`number`.

This is a terminal operation.

##### Example

```typescript
iterator(['foo', 'bar', 'foobar']).sum(x => x.length); // returns 12
iterator([1, 2, 3]).sum(); // returns 6
```

## avg

```typescript
avg(mapper?: Mapper<A, number>): number;
```

Returns the average of the elements of the [`FluentIterator`](fluent_iterator.md)
after applying the [`mapper`](../types/mapper.md).
If no [`mapper`](../types/mapper.md) is specified, the elements must
be `number`. If the elements are not `number`, then the
[`mapper`](../types/mapper.md) is applied to transform then into
`number`.

This is a terminal operation.

##### Example

```typescript
iterator(['foo', 'bar', 'foobar']).avg(x => x.length); // returns 4
iterator([1, 2, 3]).avg(); // returns 2
```

## count

```typescript
count(predicate?: Predicate<A>): number;
```

Counts the elements of the [`FluentIterator`](fluent_iterator.md)
for which the [`predicate`](../types/predicate.md) returns `true`.
If no [`predicate`](../types/predicate.md) is specified, it counts the
total number of elements.

This is a terminal operation.

##### Example

```typescript
iterator(['foo', 'bar', 'foobar']).count(x => x.length > 3); // returns 1
iterator(['foo', 'bar', 'foobar']).count(); // returns 3
```

## min

```typescript
min(comparator?: Comparator<A>): A | undefined;
```

Returns the smallest element of the
[`FluentIterator`](fluent_iterator.md) according to the specified
[`Comparator`](../types/comparator.md).
If no [`Comparator`](../types/comparator.md) is specified, the natural
ordering is used and the type `A` must support the operators "`<`" and
"`>`".

This is a terminal operation.

##### Example

```typescript
iterator(["b", 'c", "a"]).min(); // returns "a";
iterator(["apple", "banana", "kiwi"]).
   min((a,b) => a.length - b.length); // returns "kiwi"
```

## max

```typescript
max(comparator?: Comparator<A>): A | undefined;
```

Returns the largest element of the
[`FluentIterator`](fluent_iterator.md) according to the specified
[`Comparator`](../types/comparator.md).
If no [`Comparator`](../types/comparator.md) is specified, the natural
ordering is used and the type `A` must support the operators "`<`" and
"`>`".

This is a terminal operation.

##### Example

```typescript
iterator(["b", 'c", "a"]).max(); // returns "c";
iterator(["apple", "banana", "kiwi"]).
   min((a,b) => a.length - b.length); // returns "banana"
```

## join

```typescript
join(separator?: string): string;
```

Joins the elements of the [`FluentIterator`](fluent_iterator.md) into
a string using the `separator` as delimieter between the elements. The
default value for the seperator is `','`.  
The elements are converted into a `string` using the `toString`
method.

This is a terminal operation.

##### Example

```typescript
iterator([1,2,3]).join(); returns "1,2,3"
iterator([1,2,3]).join(', '); returns "1, 2, 3"
```

## groupBy

```typescript
groupBy<K>(mapper: Mapper<A, K>): Map<K, A[]>;
```

Returns a `Map` where keys are the result of applying the
[`mapper`](../types/mapper.md) to the elements of the
[`FluentIterator`](fluent_iterator.md) and the values is an `Array` of
the elements that are mapped to the same key.

This is a terminal operation.

### Example

partition even and odd numbers from a
[`FluentIterator`](fluent_iterator.md).

```typescript
iterator([1, 2, 3, 4, 5]).groupBy(x => x % 2);
```

## collectToSet

```typescript
collectToSet(): Set<A>
```

Returns a `Set` consisting of entries in the
[`FluentIterator`](fluent_iterator.md)

This is a terminal operation.

### Example

```typescript
iterator([1,2,1]]).collectToSet(); // new Set().add(1).add(2)
```

## collectTo

```typescript
collectTo(collector: Collector<A,B>): B
```

Returns an object of type `B` by applying the `collect` method of the [`collector`](../types/collector.md)
on all objects in the [`FluentIterator`](fluent_iterator.md) and then
returning the result of the `value` method of the [`collector`](../types/collector.md)

This is an terminal operation.

### Example

```typescript
iterator([1, 2]).collectTo(new ArrayCollector()); // returns [1,2];
```

## collectToMap

```typescript
collectToMap<A,K>(
  mapper: Mapper<A, K>,
  collisionHandler?: CollisionHandler<K,A>
): Map<K, >
```

Returns a `Map` whose keys are consisting of applying the `mapper` to
the elemenst of the
[`FluentIterator`](fluent_iterator.md)
The `collisionHandler` determines how to resolve collisions when two or
more elements resolve to the same key. When a collision is detected,
it is invoked with the key and the current mapping, it should return
new mapping for the key. The default behaviour is to
overwrite current value.

This is a terminal operation.

### Example

```typescript
// returns the last even and odd numbers
iterator([2, 5, 4, 3, 1]).collectToMap(x => x % 2, CollisionHandlers.overwrite);
// new Map().set(0, 4).set(1, 1);

// returns the first even and odd numbers
iterator([2, 5, 4, 3, 1]).collectToMap(x => x % 2, CollisionHandlers.gnore);
// new Map().set(0, 2).set(1, 5);
```

## collectToObject

```typescript
collectToObject<K,V>(
  mapper: Mapper<A, [string,V]>,
  collisionHandler>: CollisionHandler<string,V>
): Record<string, V>
```

Returns a hash whose keys are consisting of applying the `mapper` to
the elemenst of the
[`FluentIterator`](fluent_iterator.md)
The `collisionHandler` determines how to resolve collisions when two or
more elements resolve to the same key. When a collision is detected,
it is invoked with the key and the current mapping, it should return
new mapping for the key. The default behaviour is to
overwrite current value.

This is a terminal operation.

### Example

```typescript
interface Data {
  key: string;
  value: number;
}

function mapper(data: Data): [string, number] {
  return [data.key, data.value];
}

iterator([
  { key: 'a', value: 1 },
  { key: 'a', value: 2 },
  { key: 'b', value: 3 },
  { key: 'b', value: 4 },
]).collectToObject(mapper, CollisionHandlers.overwrite);
// { a: 2, b: 4}

iterator([
  { key: 'a', value: 1 },
  { key: 'a', value: 2 },
  { key: 'b', value: 3 },
  { key: 'b', value: 4 },
]).collectToObject(mapper, CollisionHandlers.ignore);
// { a: 1, b: 3}
```

## partition

```typescript
partition(size: number): FluentIterator<A[]>
```

Returns a new [`FluentIterator`](fluent_iterator.md) consiting of
partitions (arrays) of at most `size` elements.
The last partition may contain less than `size` elements but is
never empty.

#### Example

```typescript
iterator([1, 2, 3, 4, 5]).partition(2);
// yields [ [1, 2], [3, 4], [5] ]
```

## [Symbol.iterator]

```typescript
[Symbol.iterator](): Iterator<A>;
```

Used to make the [`FluentIterator`](fluent_iterator.md) being seen as
an `Iterable<A>`. This allows them to be used in APIs expecting an
`Iterable<A>`

## next

```typescript
next(): IteratorResult<A>;
```

Used to make the [`FluentIterator`](fluent_iterator.md) being seen as
an `Iterator<A>`. This allows them to be used in APIs expecting an
`Iterator<A>`
