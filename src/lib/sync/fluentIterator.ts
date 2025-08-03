import * as Iterators from './iterators';
import {
  arrayCollector,
  Collector,
  countCollector,
  groupByCollector,
  lastCollector,
  mapCollector,
  maxCollector,
  minCollector,
  objectCollector,
  setCollector,
  joinCollector,
  tallyCollector,
} from '../collectors';
import { CollisionHandler, Comparator, IteratorGenerator, Mapper, Predicate, Reducer, Consumer } from '../utils';

/**
 * Iterator with a Fluent interface.
 * @typeParam A The type of elements being iterated.
 */
export class FluentIterator<A> implements Iterator<A>, Iterable<A> {
  protected readonly iter: Iterator<A>;

  /**
   * Creates a `FluentIterator` by wrapping an `Iterator`
   * @param iter The `Iterator` being wrapped into a `FluentIterator`
   * @example
   * const iterator = new FluentIterator([1,2,3][Symbol.iterator]());
   */
  constructor(iter: Iterator<A>) {
    this.iter = iter;
  }

  /**
   * Creates an empty `FluentIterator`.  The returned iterator will not yield any element.
   * @typeParam A the type of elements of the `FluentIterator`
   * @returns An empty `FluentIterator`
   */
  static empty<A = never>(): FluentIterator<A> {
    return new FluentIterator(Iterators.empty());
  }

  /**
     Creates a singleton operator.  The returned iterator will yield a single or no element.
     * @typeParam A the type of elements of the `FluentIterator`.
     * This is useful to use a fluent interface on class that are not fluent.
     @example
     const str = FluentIterator.singleton('foobar').map(f).map(g).first();
     *
     * @returns A `FluentIterator` yielding at most one element.
     */
  static singleton<A>(a: A): FluentIterator<A> {
    return new FluentIterator(Iterators.singleton(a));
  }

  /**
   * Creates a `FluentIterator` from an `IteratorGenerator`.
   * @typeParam A the type of elements of the `FluentIterator`
   * @param generator Used to generate an `Iterator` that will be wrapped into a `FluentIterator`
   * @returns A new `FluentIterator`
   * @example
   * const iter = FluentIterator.from([1,2,3]);
   */
  static from<A>(generator: IteratorGenerator<A>): FluentIterator<A> {
    if (generator instanceof FluentIterator) return generator;
    return new FluentIterator(Iterators.toIterator(generator));
  }

  /**
   * Collects items from the `FluentIterator` into a `Collector`.
   * @typeParam B The result type of the `Collector`.
   * @param collector The `Collector` into which to collect the items
   * @returns The result of the `collector`
   * @example
   * const collector = arrayCollector<string>;
   * const iter = iterator([1,2,3]);
   * const data = iter.collectTo(collector);
   * // data is [1,2,3]
   */
  collectTo<B>(collector: Collector<A, B>): B {
    return Iterators.collectTo(this.iter, collector);
  }

  /**
   * Collects items into an array.
   * @returns an array consisting of the elements of this `FluentIterator`
   * @example
   * const iter = iterator([1,2,3]);
   * const data = iter.collect();
   * // data is [1,2,3]
   */
  collect(): A[] {
    return this.collectTo(arrayCollector());
  }

  /**
   * Collects items into a `Set`.
   * @returns a Set consisting of the elements of this {@link FluentIterator}
   * @example
   * const iter = iterator([1,2,3,1,2,3]);
   * const data = iter.collectToSet();
   * // data is Set { 1,2,3 }
   */
  collectToSet(): Set<A> {
    return this.collectTo(setCollector());
  }

  /**
   * Collects items into a `Map` by mapping values into keys.
   * @typeParam K The type of the keys of the `Map`
   *
   * @param mapper Maps the values into keys
   * @param collisionHandler  Specifies how to handle the collision. Default is to ignore collision.
   * @returns a Map whose keys are the result of applying the `mapper` to the values of this {@link FluentIterator} and the values are iterated items.

   * @example
   * const iter = iterator("foo","bar","foobar")
   * const data = iter.collectToMap(s => s.length);
   * // data is Map {3 => "foo", 6 => "foobar"}
   */
  collectToMap<K>(mapper: Mapper<A, K>, collisionHandler?: CollisionHandler<K, A>): Map<K, A> {
    return this.collectToMap2(a => [mapper(a), a], collisionHandler);
  }

  /**
   * Collects items into a `Map` by mapping values into keys and new value
   * @typeParam K The type of the keys of the `Map`
   * @typeParam V The type of the values of the `Map`
   *
   * @param mapper Maps the values into [key, values] pairs
   * @param collisionHandler  Specifies how to handle the collision. Default is to ignore collision.
   * @returns a Map whose entries are the result of applying the `mapper` to the values of this {@link FluentIterator}.

   * @example
   * const iter = iterator("foo","bar","foobar")
   * const data = iter.collectToMap2(s => [s, s.length]);
   * // data is Map { "foo" => 3, "bar" => 3, "foobar" => 6 }
   */
  collectToMap2<K, V>(mapper: Mapper<A, [K, V]>, collisionHandler?: CollisionHandler<K, V>): Map<K, V> {
    return this.map(mapper).collectTo(mapCollector(collisionHandler));
  }

  /**
   * Collects items into a `Record` by mapping values into keys.
   *
   * @param mapper Maps the values into keys
   * @param collisionHandler  Specifies how to handle the collision. Default is to ignore collision.
   * @returns a `Record` whose keys are the result of applying the `mapper` to the values of this {@link FluentIterator} and the values are iterated items.

   * @example
   * const iter = iterator("foo","bar","foobar")
   * const data = iter.collectToObject(s => s.toUpperCase());
   * // data is { FOO: "foo", BAR: "bar", FOOBAR: "foobar" }
   */
  collectToObject(mapper: Mapper<A, string>, collisionHander?: CollisionHandler<string, A>): Record<string, A> {
    return this.collectToObject2(a => [mapper(a), a], collisionHander);
  }

  /**
   * Collects items into a `Record` by mapping values into keys and new value
   * @typeParam V The type of the values of the `Map`
   *
   * @param mapper Maps the values into [key, values] pairs
   * @param collisionHandler  Specifies how to handle the collision. Default is to ignore collision.
   * @returns a `Record` whose entries are the result of applying the `mapper` to the values of this {@link FluentIterator}.

   * @example
   * const iter = iterator("foo","bar","foobar")
   * const data = iter.collectToObject2(s => [s, s.length]);
   * // data is { foo: 3, bar: 3, foobar: 6 }
   */
  collectToObject2<V>(
    mapper: Mapper<A, [string, V]>,
    collisionHandler?: CollisionHandler<string, V>
  ): Record<string, V> {
    return this.map(mapper).collectTo(objectCollector(collisionHandler));
  }

  /**
   * Returns a new {@link FluentIterator} consisting of elements for which the `predicate` evaluates to true.
   *
   * @param predicate the predicate on which the evaluate the items.
   * @returns a new {@link FluentIterator} consisting of elements of this {@link FluentIterator} for which the `predicate` evaluates to true.
   * @example
   * iterator([1,8,2,3,4,6]).filter(x => x % 2 === 1);
   * // yields 1, 2
   */
  filter(predicate: Predicate<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.filter(this.iter, predicate));
  }

  /**
   * Returns a new {@link FluentIterator} consisting of elements of this {@link FluentIterator} that are not `null` nor `undefined`
   *
   * @returns a new {@link FluentIterator} where all the `null` or `undefined` elements are removed.
   */
  removeNull(): FluentIterator<A> {
    return new FluentIterator(Iterators.removeNull(this.iter));
  }

  /**
   * Returns a new {@link FluentIterator} consisting of applying the {@link Mapper} to all elements of this {@link FluentIterator}.
   * @typeParam B The type of the elements of the returned {@link FluentIterator}
   * @param mapper Transformation applied to elements of this {@link FluentIterator}
   * @returns A new {@link FluentIterator}
   * @example
   * const iter = iterator(['foo','bar',foobar'])
   * iter.map(s => s.length)
   * // yields 3, 3, 6
   */
  map<B>(mapper: Mapper<A, B>): FluentIterator<B> {
    return new FluentIterator(Iterators.map(this.iter, mapper));
  }

  /**
   * Returns a new {@link FluentIterator} consisting of applying the
   * {@link Mapper} to all elements of this {@link FluentIterator} and
   * filtering those for which the {@link Mapper} returned null or
   * undefined
   *
   * @typeParam B The type of the elements of the returned {@link FluentIterator}
   * @param mapper Transformation applied to elements of this {@link FluentIterator}
   * @returns A new {@link FluentIterator}
   * @remarks
   * ```ts
   * iter.filterMap(mapper)
   * ```
   * is equivalent to
   * ```ts
   * iter.map(mapper).removeNull()
   * ```
   */
  filterMap<B>(mapper: Mapper<A, B | null | undefined>): FluentIterator<B> {
    return new FluentIterator(Iterators.filterMap(this.iter, mapper));
  }

  flatMap<B>(mapper: Mapper<A, Iterator<B> | Iterable<B>>): FluentIterator<B> {
    return new FluentIterator(Iterators.flatMap(this.iter, mapper));
  }

  /**
   * Returns the first element of this {@link FluentIterator} or `undefined` if this {@link FluentIterator} is empty.
   *
   * @returns The first element of this {@link FluentIterator} or `undefined`.
   */
  first(): A | undefined {
    return Iterators.first(this.iter);
  }

  /**
   * Returns a new {@link FluentIterator} that is the result of transforming this {@link FluentIterator}.
   * This method allows to use a an Iterartor transformation in a fluent way.
   *
   * @param mapper The mapper to transform the iterator.
   * @example
   * function *doubleIterator(Iterator<number>: iter) {
   *    for (;;) {
   *       const item = iter.next();
   *       if (item.done) break;
   *       yield item.value * 2;
   *    }
   * }
   * iterator([1,2,3]).transform(doubleIterator).collect()
   * // [2, 4, 6]
   */
  transform<B>(mapper: Mapper<Iterator<A>, Iterator<B>>): FluentIterator<B> {
    return new FluentIterator(mapper(this.iter));
  }

  /** Returns the resulf of applying the {@link Mapper} to the wrapped iterator.
   * This method allows to use an Iterator function in a fluent way.
   * @example
   * function sumOfIterator(Iterator<number>: iter) {
   *    let sum = 0;
   *    for (;;) {
   *       const item = iter.next();
   *       if (item.done) return sum;
   *       sum += item.value;
   *    }
   * }
   *
   * iterator([1,2,3]).apply(sumOfiterator);
   * // returns 6
   */
  apply<B = A>(mapper: Mapper<Iterator<A>, B>): B {
    return mapper(this.iter);
  }

  /**
   * Returns a {@link FluentIterator} yielding the first `n` elements of this {@link FluentIterator}.
   *
   * @param n The number of elements to take
   * @returns a {@link FluentIterator} yielding the first `n` elements of this {@link FluentIterator}.
   * @remarks If there are less than `n` elements in this {@link FluentIterator}, then only the available elements will be yielded.
   */
  take(n: number): FluentIterator<A> {
    return new FluentIterator(Iterators.take(this.iter, n));
  }

  /**
   * Returns a {@link FluentIterator} skipping the first `n` elements of this {@link FluentIterator} and then yielding the subsequent ones.
   *
   * @param n The number of elements to skip
   * @returns a {@link FluentIterator} skpping the first `n` elements of this {@link FluentIterator}.
   * @remarks If there are less than `n` elements in this {@link FluentIterator}, then an empty {@link FluentIterator} is returned.
   */
  skip(n: number): FluentIterator<A> {
    return new FluentIterator(Iterators.skip(this.iter, n));
  }

  /**
   * Returns true if this {@link FluentIterator} yields an element for which the {@link Predicate} evaluates to true.
   *
   * @param predicate The predicate to evaluate.
   * @returns true if this {@link FluentIterator} yields an element for which the {@link Predicate} evaluates to true, false otherwise.
   */
  contains(predicate: Predicate<A>): boolean {
    return Iterators.contains(this.iter, predicate);
  }

  /**
   * Returns true if this {@link FluentIterator} yields an element equals to `target`
   *
   * @param target value to look for
   * @returns true if this {@link FluentIterator} yields an element equals to `target`, false otherwise.
   * @ @remarks
   * ```ts
   * iter.includes(target)
   * ```
   * is equivalent to
   * ```ts
   * iter.contains(x => x === target)
   * ```
   */
  includes(target: A): boolean {
    return Iterators.includes(this.iter, target);
  }

  /**
   * Executes the {@link Reducer | reducer} function on each element
   * of this {@link FluentIterator}, in order, passing in
   * the return value from the calculation on the preceding element. The
   * final result of running the reducer across all elements of the array
   * is a single value.

   * @typeParam B the type into which the elements are being folded to
   * @param reducer The reducer to be applied at each iteration.
   * @param initialValue The value of the accumulator to be used in the first call to `reducer`

   * @remarks
   * If the {@link FluentIterator} is empty, `initialValue` is returned.
   *
   * @example
   * To compute the sum of elements of an array:
   * const sum = iterator([1,2,3])
   *    .fold((acc, x) => acc + x, 0)
   * // sum = 6
   */
  fold<B>(reducer: Reducer<A, B>, initialValue: B): B {
    return Iterators.fold(this.iter, reducer, initialValue);
  }

  /**
   * Special case of {@link FluentIterator.fold} where items being iteraded on and the accumulator are of the same type.

   * @param reducer The reducer to be applied at each iteration.
   * @param initialValue The value of the accumulator to be used in the first call to `reducer`. If omitted, the first element of this {@link FluentIterator} is used.

   * @remarks
   * If the {@link FluentIterator} is empty, `initialValue` is returned.
   *
   * @example
   * To compute the sum of elements of an array:
   * const sum = iterator([1,2,3])
   *    .reduce((acc, x) => acc + x)
   * // sum = 6
   */
  reduce(reducer: Reducer<A, A>, initialValue?: A): A | undefined {
    return Iterators.reduce(this.iter, reducer, initialValue);
  }

  /**
   * Applies a reducer function over this {@link FluentIterator}, returning a {@link FluentIterator} yielding each intermediate reduce result.
   *
   * Similar to `fold`, but instead of returning only the final result,
   * `scan()` emits the accumulated value at each step. This is useful for calculating running
   * totals, prefix sums, rolling aggregates, and more.
   *
   * If this {@link FluentIterator} is empty, no values are emitted unless `emitInitial` is `true`.

   * @template B  The type of the accumulated result.
   *
   * @param reducer The reducer function to be applied at each iteration
   *
   *
   * @param initialValue The initial value of the accumulator.
   *
   * @param emitInitial

   * @returns {FluentIterator<B>}
   *   A new {@link FluentIterator} that emits the accumulator at each step.
   *
   * @example
   * FluentIterator.from([1, 2, 3, 4]).scan((acc, x) => acc + x, 0) // yields 1, 3, 6, 10
   *
   */
  scan<B>(reducer: Reducer<A, B>, initialValue: B, emitInitial = false): FluentIterator<B> {
    return new FluentIterator(Iterators.scan(this.iter, reducer, initialValue, emitInitial));
  }

  /**
   * Returns a new {@link FluentIterator} that yields pairs of elements
   * yielded by each Iterators which are navigated in parallel.
   * The length of the new {@link FluentIterator} is equal to the length the shorter iterator.
   *
   * @typeParam B The type of elements of the `other` iterator.
   * @param other The iterator that is combined with this one.
   *
   * @example
   * const iter = iterator([1, 2, 3]);
   * const zipped = iter.zip(['a', 'b']);
   * // zipped will yield [1,"a"], [2,"b"]
   */
  zip<B>(other: Iterator<B> | Iterable<B>): FluentIterator<[A, B]> {
    return new FluentIterator(Iterators.zip(this.iter, Iterators.toIterator(other)));
  }

  /**
   * Returns a new {@link FluentIterator} that yields pairs of elements
   * consisting of the elements yielded by this
   * @{link FluentIterator} and their index in the iteration.
   *
   * @param start The starting index
   *
   * @example
   * const iter = iterator(['a', 'b', 'c']);
   * const enumerated = iter.enumerate(10);
   * // enumerated will yield ["a", 10], ["b", 11], ["c", 12]
   *
   */
  enumerate(start = 0): FluentIterator<[A, number]> {
    return new FluentIterator(Iterators.enumerate(this.iter, start));
  }

  /**
   * Returns a new {@link FluentIterator} that
   * yields the same elements as this {@link FluentIterator}
   * and executes the {@link Consumer | mapper} on each element.
   *
   *
   * @param mapper the operation to be invoked on each element.
   *
   * @remarks This can be useful to see intermediate steps of complex {@link FluentIterator}.  The results of invoking the `mapper` are ignored unless it throwws.
   * @example
   * const iter = iterator([1,2,3])
   * iter.peek(x => console.log(`before filter ${x}`))
   *      .filter(x => x % 2 === 0)
   *      .peek(x => console.log(`after filter: ${x}`))
   *      .collect();
   * // ouputs:
   * // before filter 1
   * // before filter 2
   * // after filter: 2
   * // before filter 3
   * // result : [ 2 ]
   */
  peek(mapper: Consumer<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.peek(this.iter, mapper));
  }

  /**
   * Applies the {@link Consumer | mapper} to each element of this {@link FluentIterator}
   *
   * @param f the operation to be invoked on each element.
   * @remarks The results of invoking the `mapper` are ignored unless it throws.
   * @example
   * iter.forEach(console.log)
   */
  forEach(f: Consumer<A>): void {
    Iterators.forEach(this.iter, f);
  }

  /**
   * Returns a new {@link FluentIterator} that is the result of appending its argument to this {@link FluentIterator}
   *
   * @param items An `Iterator` or `Iterable` whose items are appended to this {@link FluentIterator}.
   *
   * @example
   * iterator([1,2,3]).append([4,5,6])
   * // yield 1, 2, 3, 4, 5, 6
   */
  append(items: Iterator<A> | Iterable<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.append(this.iter, Iterators.toIterator(items)));
  }

  /**
   * Returns a new {@link FluentIterator} that is the result of prepending its argument to this {@link FluentIterator}
   *
   * @param items An `Iterator` or `Iterable` whose items are prepended to this {@link FluentIterator}.
   *
   * @example
   * iterator([1,2,3]).prepend([4,5,6])
   * // yield 4, 5, 6, 1, 2, 3
   */
  prepend(items: Iterator<A> | Iterable<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.prepend(this.iter, Iterators.toIterator(items)));
  }

  /**
   * Returns a new {@link FluentIterator} that is the result of apepending all its argument to this {@link FluentIterator}
   *
   * @param iterables An `Array of `Iterator` or `Iterable` whose items are appended to this {@link FluentIterator}.
   *
   * @example
   * iterator([1,2,3]).concat([4,5,6], [7,8,9])
   * // yield 1, 2 ,3, 4, 5, 6, 7, 8, 9
   */
  concat(...iterables: Array<Iterator<A> | Iterable<A>>): FluentIterator<A> {
    return new FluentIterator(Iterators.concat(this.iter, ...iterables.map(Iterators.toIterator)));
  }

  /**
   * Returns a new {@link FluentIterator} that yields elements of this {@link FluentIterator} while the {@link Predicate | predicate} evaluates to `true`.
   *
   * @param predicate The predicate being evaluated
   * @example
   * iterator([1, 2, 3]).takeWhile(x => x < 2); // yields 1
   * iterator([1, 2, 3]).takeWhile(x => x > 2); // empty iterator
   */
  takeWhile(predicate: Predicate<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.takeWhile(this.iter, predicate));
  }

  /**
   * Returns a new {@link FluentIterator} that skips elements of this
   * {@link FluentIterator} until the {@link Predicate | predicate}
   * evaluates to `true` and yields the subsequent ones.
   *
   * @param predicate The predicate being evaluated
   * @example
   * iterator([1, 2, 3]).skipWhile(x => x < 2); // yields 2, 3
   * iterator([1, 2, 3]).skipWhile(x => x > 2); // yields 1, 2, 3
   */
  skipWhile(predicate: Predicate<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.skipWhile(this.iter, predicate));
  }

  /**
   * Returns `true` if the {@link Predicate | predicate} argument evalatues to true for all items of this {@link FluentIterator}, false otherwsie.
   *
   * @param predicate The predicate being evaluated
   * @example
   * iterator([1, 2]).all(x => x > 0); // true
   * iterator([1, 2]).all(x => x >= 2); // false
   * FluentIterator.empty().all(_ => false); // true;
   */
  all(predicate: Predicate<A>): boolean {
    return Iterators.all(this.iter, predicate);
  }

  /**
   * Returns `true` if the {@link Predicate | predicate} argument evalatues to true for some items of this {@link FluentIterator}, false otherwsie.
   *
   * @param predicate The predicate being evaluated
   * @example
   * iterator([1, 2]).some(x => x > 1); // true
   * iterator([1, 2]).some(x => x > 2); // false
   * FluentIterator.empty().some(_ => true); // false;
   */
  some(predicate: Predicate<A>): boolean {
    return Iterators.some(this.iter, predicate);
  }

  /**
   * Returns the number of items in this {@link FluentIterator}.
   * @example
   * iterator([1,2]).count(); // 2
   * FluentIterator.empty().count(); 0
   */
  count(): number {
    return this.collectTo(countCollector());
  }

  /**
   * Returns the minimum element according to the argument {@link Comparator | comparator}.
   *
   * @param comparator The {link Comparator} used to order the elements.
   * @example
   * iterator([1,2]).min();
   * // 1
   *
   * iterator(['foo','foobar']).min(
   *    (s1,s2) => s1.length - s2.length
   * );
   * // 'foo'
   (
   * FluentIterator.empty().min();
   * // undefined
   */
  min(comparator?: Comparator<A>): A | undefined {
    return this.collectTo(minCollector(comparator));
  }

  /**
   * Returns the maximum element according to the argument {@link Comparator | comparator}.
   *
   * @example
   * iterator([1,2]).max();
   * // 2
   *
   * iterator(['foo','foobar']).max(
   *   (s1,s2) => s1.length - s2.length
   * );
   * // 'foobar'

   * FluentIterator.empty().max(); // undefined
   */
  max(comparator?: Comparator<A>): A | undefined {
    return this.collectTo(maxCollector(comparator));
  }

  /**
   * Returns the last element of this {@link FluentIterator}
   *
   * @example
   * iterator([1,2]).last();
   * // 2
   *
   * FluentIterator.empty().last()
   * // undefined
   */
  last(): A | undefined {
    return this.collectTo(lastCollector());
  }

  /**
   * Joins items of this {@link FluentIterator} into a string.
   *
   * @param separator string used to delimite elements
   * @param prefix string used to prefix the resulting string
   * @param prefix string used to suffix the resulting string
   *
   * @example
   *
   * iterator([1,2,3]).join(',','[',']');
   * // "[1,2,3]"
   *
   * @remarks
   * The items are converted into a string using string-interpolation.
   */
  join(separator?: string, prefix?: string, suffix?: string): string {
    return this.collectTo(joinCollector(separator, prefix, suffix));
  }

  /**
   * Returns a `Map` where keys are the result of applying the parameter {@link Mapper | mapper} to the elements of the
   * this {@link FluentIterator} and the values are Arrays of
   * the elements that are mapped to the same key.

   * @param mapper The {@link Mapper} used to group items.
   * @example
   * iterator([1,2,3]).groupBy(x => x % 2 === 0);
   // Map { true => [2], false => [1, 3]}
   */
  groupBy<K>(mapper: Mapper<A, K>): Map<K, A[]> {
    return this.groupBy2(a => [mapper(a), a]);
  }

  /**
   * Returns a `Map` where entries are the result of applying the parameter {@link Mapper | mapper} to the elements of the
   * this {@link FluentIterator},

   * @param mapper The {@link Mapper} used to group items.
   * @example
   * iterator([1,2,3]).groupBy2(x => [x % 2 === 0, 2 * x];
   // Map { true => [4], false => [2, 6]}
   */
  groupBy2<K, V>(mapper: Mapper<A, [K, V]>): Map<K, V[]> {
    return this.map(mapper).collectTo(groupByCollector());
  }

  /**
   * Returns a `Map` of the count of the occurences of each items of
   * this {@link FluentIterator},

   * @example
   * iterator([foo','bar','foo').tally();
   // Map { 'foo' => 2, bar => 1 }
   */
  tally(): Map<A, number> {
    return this.collectTo(tallyCollector());
  }

  /**
   * Returns a new {@link FluentIterator} consisting of
   * partitions (arrays) of at most `size` elements.
   *
   * @param size The size of the partitions.
   *
   * @example
   * iterator([1, 2, 3, 4, 5]).partition(2);
   * // yields [1, 2], [3, 4], [5]
   *
   * @remarks The last partition may contain less than `size` elements but is
   * never empty.
   */
  partition(size: number): FluentIterator<A[]> {
    return new FluentIterator(Iterators.partition(this.iter, size));
  }

  /**
   * Returns a new {@link FluentIterator} consisting of distinct elements from this iterator.
   *
   * @param mapper Used to determine distinctness of elements. Default to <code>identity</code>
   *
   * @example
   * iterator([1,2,2,3,1,4]).distinct();
   * yields 1,2,3,4
   *
   * iterator ([1,2,2,3,1,4], x => x %2).distinct();
   * yields 1,2
   */
  distinct<K = A>(mapper?: Mapper<A, K>): FluentIterator<A> {
    return new FluentIterator(Iterators.distinct(this.iter, mapper));
  }

  /**
   * Used to make this {@link FluentIterator} being seen as an
   * `Iterable<A>`. This allows them to be used in APIs expecting an
   * `Iterable<A>`
   */
  [Symbol.iterator](): Iterator<A> {
    return this.iter;
  }

  /**
   * Used to make this {@link FluentIterator} being seen as an
   * `Iterator<A>`.  This allows {@link FluentIterator} objects to be
   * used in APIs expecting an `Iterator<A>`
   */
  next(): IteratorResult<A> {
    return this.iter.next();
  }
}

/**
 * Alias for {@link FluentIterator.from}
 */
export function iterator<A>(iter: IteratorGenerator<A>): FluentIterator<A> {
  return FluentIterator.from(iter);
}

/**
 * Alias for {@link FluentIterator.empty}
 */
export function emptyIterator<A = never>() {
  return FluentIterator.empty<A>();
}

/**
 * Alias for {@link Fluentiterator.singleton}
 */
export function singletonIterator<A>(a: A) {
  return FluentIterator.singleton(a);
}

/**
 * Global definitions.
 */
declare global {
  interface Array<T> {
    /**
     * Returns a {@link FluentIterator} on this array.
     */
    iterator(): FluentIterator<T>;
  }

  interface String {
    /**
     * Returns a {@link FluentIterator} on this string yielding each character of the string.
     */
    iterator(): FluentIterator<string>;
  }

  interface Set<T> {
    /**
     * Returns a {@link FluentIterator} on this `Set`.
     */
    iterator(): FluentIterator<T>;
  }

  interface Map<K, V> {
    /**
     * Returns a {@link FluentIterator} on the entries of this `Map`
     */
    iterator(): FluentIterator<[K, V]>;

    /**
     * Returns a { @link FluentIterator} on the values of this `Map`
     */
    valueIterator(): FluentIterator<V>;

    /**
     * Returns a {@link FluentIterator} on the keys of this `Map`
     */
    keyIterator(): FluentIterator<K>;
  }
}

Array.prototype.iterator = function <T>(this: Array<T>) {
  return new FluentIterator<T>(this[Symbol.iterator]());
};

String.prototype.iterator = function () {
  return new FluentIterator<string>(this[Symbol.iterator]());
};

Set.prototype.iterator = function <T>(this: Set<T>) {
  return new FluentIterator<T>(this[Symbol.iterator]());
};

Map.prototype.iterator = function <K, V>(this: Map<K, V>) {
  return new FluentIterator<[K, V]>(this.entries()[Symbol.iterator]());
};
Map.prototype.valueIterator = function <K, V>(this: Map<K, V>) {
  return new FluentIterator<V>(this.values()[Symbol.iterator]());
};
Map.prototype.keyIterator = function <K, V>(this: Map<K, V>) {
  return new FluentIterator<K>(this.keys()[Symbol.iterator]());
};
