[ts-fluent-iterators - v1,0,0](../../README.md) › [API](../index.md) ›
[Fluent Iterators](../index.md#Fluent Iterators) › [Class FluentIterator](fluent_iterator.md)

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
element is found.  If no [predicate](../types/predicate.md) is
specfied, then the first element of the iterator is returned or
`undefined` if the iterator is empty.  
The iterator's cursor is left after the last element tested.

## last
```typescript
last(predicate?: Predicate<A>): A | undefined;
```
Return the last element matching the
[predicate](../types/predicate.md) or `undefined` if no matching
element is found.  If no [predicate](../types/predicate.md) is
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

##  includes
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

* The parameter `initialValue` is used in the first invocation of the
[`reducer`](../types/reducer.md).
* If the [`FluentIterator`](fluent_iterator.md) is empty, `initialValue` is returned.

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

* The parameter `initialValue` is used in the first invocation of the
[`reducer`](../types/reducer.md).
* If `initialValue` is not specified, the first element of the
[`FluentIterator`](fluent_iterator.md), if available,  is used in the first invocation of
the [`reducer`](../types/reducer.md).
* If the [`FluentIterator`](fluent_iterator.md) is empty, `initialValue` is returned.

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
Creates a new [`FluentIterator<[A,B]>`](fluent_iterator.md) that yields pairs of elements
yielded by each Iterators which are navigated in parallel.
The length of the new [`FluentIterator`](fluent_iterator.md) is equal to the length the shortest
iterator.

##### Example
```typescript
const iterator = iterator([1,2,3]);
const zipped = iterator.zip(["a","b"]);
// zipped will yield [1,"a"], [2,"b"]
```

## enumerate
```typescript
enumerate(start = 0): FluentIterator<[A, number]>;
```
Creates a new [`FluentIterator<[A,B]>`](fluent_iterator.md) that yields pairs of elements
consisting of the elements yielded by the
[`FluentIterator`](fluent_iterator.md) and their index in the
[`FluentIterator`](fluent_iterator.md).
The starting index is given by the parameter `start` which defaults to 0.

##### Example
```typescript
const iterator = iterator(["a", "b", "c"]);
const enumerated = iterator.enumerate(10);
// enumerated will yield ["a", 10], ["b", 11], ["c", 12]
```

## tap
```typescript
tap(mapper: Mapper<A, any>): FluentIterator<A>;
```
Creates a new [`FluentIterator<[A]>`](fluent_iterator.md) that
yields the same elements as this [`FluentIterator<[A]>`](fluent_iterator.md)
and executes the [`mapper`](../types/mapper.md) on each element.  

This can be useful to see intermediate steps of complex
[`FluentIterator`](fluent_iterator.md).  

The results of invoking the [`mapper`](../types/mapper.md) are ignored.

##### Example
```typescript
iterator([1,2,3]).
tap(x => console.log(`before filter: ${x}`).
filter(x => x % 2 ===0).
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
iterator("foo", "bar").append(["baz", "foobar"]).collect();
// returns [ "foo", "bar", "baz", "foobar"]
```

## prepend
```typescript
prepend(items: Iterator<A> | Iterable<A>): FluentIterator<A>;
```
Returns a new [`FluentIterator<A>`](fluent_iterator.md) that consists
of elements of the `other` iterable object followed by elemants of
this <`FluentIterable<A>`.

##### Example
```typescript
iterator("foo", "bar").prepend(["baz", "foobar"]).collect();
// returns [ "baz", "foobar", "foo", "bar"]

```
## concat
```typescript
concat(...iterables: Array<Iterator<A> | Iterable<A>>):
FluentIterator<A>;
```
Returns a new [`FluentIterator<A>`](fluent_iterator.md) that consists
of elements of this <`FluentIterable<A>`followed by elements of all of
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
## skipWhile
```typescript
skipWhile(predicate: Predicate<A>): FluentIterator<A>;
```
## distinct
```typescript
distinct(): FluentIterator<A>;
```
## all
```typescript
all(predicate: Predicate<A>): boolean;
```
## some
```typescript
some(predicate: Predicate<A>): boolean;
```
## sum
```typescript
sum(mapper?: Mapper<A, number>): number;
```
## avg
```typescript
avg(mapper?: Mapper<A, number>): number;
```
## count
```typescript
count(predicate?: Predicate<A>): number;
```
## min
```typescript
min(comparator?: Comparator<A>): A | undefined;
```
## max
```typescript
max(comparator?: Comparator<A>): A | undefined;
```
## join
```typescript
join(separator?: string): string;
```
## collectSorted
```typescript
collectSorted(comparator?: Comparator<A>): A;
```
## sort
```typescript
sort(comparator?: Comparator<A>): FluentIterator<A>;
```
## collectToMap
```typescript
collectToMap<K>(mapper: Mapper<A, K>): Map<K, A>;
```
## partition
```typescript
partition<K>(mapper: Mapper<A, K>): FluentIterator<[K, A]>;
```
## [Symbol.iterator]
```typescript
[Symbol.iterator](): Iterator<A>;
```
## next
```typescript
next(): IteratorResult<A>;
```


