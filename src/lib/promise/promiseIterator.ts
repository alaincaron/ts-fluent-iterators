import * as Iterators from './promiseIterators';
import * as SyncIterators from "../sync/iterators";

export class PromiseIterator<A> {

  private iter: Iterator<Promise<A>>;

  constructor(iter: Iterator<Promise<A>> | Iterable<Promise<A>>) {
    this.iter = SyncIterators.iterator(iter);
  }

  collect(): Promise<A[]> {
    return Iterators.collect(this.iter);
  }

  allSettled(): Promise<PromiseSettledResult<A>[]> {
    return Iterators.allSettled(this.iter);
  }

  race(): Promise<A | undefined> {
    return Iterators.race(this.iter);
  }

  any(): Promise<A | undefined> {
    return Iterators.any(this.iter);
  }

  map<B>(f: (a: A) => B | Promise<B>): PromiseIterator<B> {
    return new PromiseIterator(Iterators.map(this.iter, f));
  }

  flatmap<B>(f: (a: Promise<A>) => B | Promise<B>): PromiseIterator<B> {
    return new PromiseIterator(Iterators.flatmap(this.iter, f));
  }

  find(predicate: (a: A) => boolean): Promise<A | undefined> {
    return Iterators.find(this.iter, predicate);
  }

  first(): Promise<A | undefined> {
    return Iterators.first(this.iter);
  }

  fold<B>(reducer: (b: B, a: A) => B | Promise<B>, initialValue: B): Promise<B> {
    return Iterators.fold(this.iter, reducer, initialValue);
  }

  reduce(reducer: (acc: A, a: A) => A | Promise<A>, initialValue?: A): Promise<A | undefined> {
    return Iterators.reduce(this.iter, reducer, initialValue);
  }

  zip<B>(other: Iterator<Promise<B>> | Iterable<Promise<B>>): PromiseIterator<[A, B]> {
    return new PromiseIterator(Iterators.zip(this.iter, SyncIterators.iterator(other)));
  }

  take(n: number): PromiseIterator<A> {
    return new PromiseIterator(Iterators.take(this.iter, n));
  }

  skip(n: number): PromiseIterator<A> {
    return new PromiseIterator(Iterators.skip(this.iter, n));
  }

  enumerate(): PromiseIterator<[A, number]> {
    return new PromiseIterator(Iterators.enumerate(this.iter));
  }

  tap(f: (a: A) => any): PromiseIterator<A> {
    return new PromiseIterator(Iterators.tap(this.iter, f));
  }

  [Symbol.iterator](): Iterator<Promise<A>> {
    return this.iter;
  }

  iterator(): Iterator<Promise<A>> {
    return this.iter;
  }
}

export function promiseIterator<A>(iter: Iterator<Promise<A>> | Iterable<Promise<A>>): PromiseIterator<A> {
  return new PromiseIterator(iter);
}
