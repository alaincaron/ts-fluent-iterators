import * as Iterators from './promiseIterators';
import * as SyncIterators from "../sync/iterators";

export class PromiseIterator<A> implements Iterable<Promise<A>> {

  private iter: Iterable<Promise<A>>;

  constructor(iter: Iterable<Promise<A>>) {
    this.iter = iter;
  }

  collect(): Promise<A[]> {
    return Iterators.collect(this);
  }

  allSettled(): Promise<PromiseSettledResult<A>[]> {
    return Iterators.allSettled(this);
  }

  race(): Promise<A | undefined> {
    return Iterators.race(this);
  }

  any(): Promise<A | undefined> {
    return Iterators.any(this);
  }

  forEach(f: (a: A) => any): Promise<void> {
    return Iterators.forEach(this, f);
  }

  map<B>(f: (a: A) => B | Promise<B>): PromiseIterator<B> {
    return new PromiseIterator(Iterators.map(this, f));
  }

  flatmap<B>(f: (a: Promise<A>) => B | Promise<B>): PromiseIterator<B> {
    return new PromiseIterator(Iterators.flatmap(this, f));
  }

  find(predicate: (a: A) => boolean): Promise<A | undefined> {
    return Iterators.find(this, predicate);
  }

  first(): Promise<A | undefined> {
    return Iterators.first(this);
  }

  fold<B>(reducer: (b: B, a: A) => B | Promise<B>, initialValue: B): Promise<B> {
    return Iterators.fold(this, reducer, initialValue);
  }

  reduce(reducer: (acc: A, a: A) => A | Promise<A>, initialValue?: A): Promise<A | undefined> {
    return Iterators.reduce(this, reducer, initialValue);
  }

  zip<B>(other: Iterable<Promise<B>> | Iterable<Promise<B>>): PromiseIterator<[A, B]> {
    return new PromiseIterator(Iterators.zip(this, other));
  }

  take(n: number): PromiseIterator<A> {
    return new PromiseIterator(Iterators.take(this, n));
  }

  skip(n: number): PromiseIterator<A> {
    return new PromiseIterator(Iterators.skip(this, n));
  }

  enumerate(): PromiseIterator<[A, number]> {
    return new PromiseIterator(Iterators.enumerate(this));
  }

  tap(f: (a: A) => any): PromiseIterator<A> {
    return new PromiseIterator(Iterators.tap(this, f));
  }

  append(promises: Iterable<Promise<A>>): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.append(this, promises));
  }

  prepend(promises: Iterable<Promise<A>>): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.prepend(this, promises));
  }

  concat(...iterables: Iterable<Promise<A>>[]): PromiseIterator<A> {
    return new PromiseIterator(SyncIterators.concat(this, ...iterables));
  }

  [Symbol.iterator](): Iterator<Promise<A>> {
    return this.iter[Symbol.iterator]();
  }
}

export function promiseIterator<A>(iter: Iterable<Promise<A>>): PromiseIterator<A> {
  return new PromiseIterator(iter);
}
