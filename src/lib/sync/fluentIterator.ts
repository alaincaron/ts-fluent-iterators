import * as Iterators from './iterators';
import { Mapper, Predicate, Reducer, identity } from "../types";

export class FluentIterator<A> implements Iterable<A> {

  private iter: Iterable<A>;

  constructor(iter: Iterable<A>) {
    this.iter = iter;
  }

  collect(): A[] {
    return Iterators.collect(this.iter);
  }

  filter(predicate: Predicate<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.filter(this.iter, predicate));
  }

  map<B>(mapper: Mapper<A, B>): FluentIterator<B> {
    return new FluentIterator(Iterators.map(this.iter, mapper));
  }

  first(): A | undefined {
    return Iterators.first(this);
  }

  take(n: number): FluentIterator<A> {
    return new FluentIterator(Iterators.take(this.iter, n));
  }

  skip(n: number): FluentIterator<A> {
    return new FluentIterator(Iterators.skip(this.iter, n));
  }

  find(predicate: Predicate<A>): A | undefined {
    return Iterators.find(this, predicate);
  }

  contains(predicate: Predicate<A>): boolean {
    return Iterators.contains(this, predicate);
  }

  includes(target: A): boolean {
    return Iterators.includes(this, target);
  }

  fold<B>(reducer: Reducer<A, B>, initialValue: B): B {
    return Iterators.fold(this, reducer, initialValue);
  }

  reduce(reducer: Reducer<A, A>, initialValue?: A): A | undefined {
    return Iterators.reduce(this, reducer, initialValue);
  }

  zip<B>(other: Iterable<B>): FluentIterator<[A, B]> {
    return new FluentIterator(Iterators.zip(this, other))
  }

  enumerate(): FluentIterator<[A, number]> {
    return new FluentIterator(Iterators.enumerate(this));
  }

  tap(mapper: Mapper<A, any>): FluentIterator<A> {
    return new FluentIterator(Iterators.tap(this, mapper));
  }

  forEach(mapper: Mapper<A, any>): void {
    Iterators.forEach(this, mapper);
  }

  append(items: Iterable<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.append(this, items));
  }

  prepend(items: Iterable<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.prepend(this, items));
  }

  concat(...iterables: Array<Iterable<A>>): FluentIterator<A> {
    return new FluentIterator(Iterators.concat(this, ...iterables));
  }

  takeWhile(predicate: Predicate<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.takeWhile(this, predicate));
  }

  skipWhile(predicate: Predicate<A>): FluentIterator<A> {
    return new FluentIterator(Iterators.skipWhile(this, predicate));
  }

  distinct(): FluentIterator<A> {
    return new FluentIterator(Iterators.distinct(this));
  }

  all(predicate: Predicate<A>): boolean {
    return Iterators.all(this, predicate);
  }

  some(predicate: Predicate<A>): boolean {
    return Iterators.some(this, predicate);
  }

  sum(mapper: Mapper<A, number> = identity as Mapper<A, number>): number {
    return Iterators.sum(Iterators.map(this, mapper));
  }

  avg(mapper: Mapper<A, number> = identity as Mapper<A, number>): number {
    return Iterators.avg(Iterators.map(this, mapper));
  }

  count(predicate?: Predicate<A>): number {
    return Iterators.count(this, predicate);
  }

  [Symbol.iterator](): Iterator<A> {
    return this.iter[Symbol.iterator]();
  }
}

export function iterator<A>(iter: Iterable<A>): FluentIterator<A> {
  return new FluentIterator(iter);
}
