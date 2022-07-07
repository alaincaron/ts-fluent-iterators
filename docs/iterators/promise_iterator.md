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
## reduce
```typescript
reduce(reducer: Reducer<A, A>, initialValue?: A): A | undefined;
```
## zip
```typescript
zip<B>(other: Iterator<B>): FluentIterator<[A, B]>;
```
## enumerate
```typescript
enumerate(): FluentIterator<[A, number;
```
## tap
```typescript
tap(mapper: Mapper<A, any>): FluentIterator<A>;
```
## forEach
```typescript
forEach(mapper: Mapper<A, any>): void;
```
## append
```typescript
append(items: Iterator<A> | Iterable<A>): FluentIterator<A>;
```
## prepend
```typescript
prepend(items: Iterator<A> | Iterable<A>): FluentIterator<A>;
```
## concat
```typescript
concat(...iterables: Array<Iterator<A> | Iterable<A>>):
FluentIterator<A>;
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


