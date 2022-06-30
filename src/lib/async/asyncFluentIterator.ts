import * as Iterators from './asyncIterators';

export class AsyncFluentIterator<A> implements AsyncIterable<A> {

  private iter: AsyncIterable<A>;

  constructor(iter: AsyncIterable<A>) {
    this.iter = iter;
  }

  collect(): Promise<A[]> {
    return Iterators.collect(this);
  }

  filter(predicate: (a: A) => boolean): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.filter(this, predicate));
  }

  map<B>(f: (a: A) => B): AsyncFluentIterator<B> {
    return new AsyncFluentIterator(Iterators.map(this, f));
  }

  first(): Promise<A | undefined> {
    return Iterators.first(this);
  }

  take(n: number): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.take(this, n));
  }

  skip(n: number): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.skip(this, n));
  }

  find(predicate: (a: A) => boolean): Promise<A | undefined> {
    return Iterators.find(this, predicate);
  }

  fold<B>(reducer: (b: B, a: A) => B, initialValue: B): Promise<B> {
    return Iterators.fold(this, reducer, initialValue);
  }

  reduce(reducer: (acc: A, a: A) => A, initialValue?: A): Promise<A | undefined> {
    return Iterators.reduce(this, reducer, initialValue);
  }

  zip<B>(other: AsyncIterable<B> | AsyncIterable<B>): AsyncFluentIterator<[A, B]> {
    return new AsyncFluentIterator(Iterators.zip(this, other));
  }

  enumerate(): AsyncFluentIterator<[A, number]> {
    return new AsyncFluentIterator(Iterators.enumerate(this));
  }

  tap(f: (a: A) => any): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.tap(this, f));
  }

  forEach(f: (a: A) => any): Promise<void> {
    return Iterators.forEach(this, f);
  }

  append(items: AsyncIterable<A> | Iterable<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.append(this, items));
  }

  prepend(items: AsyncIterable<A> | Iterable<A>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.prepend(this, items));
  }

  concat(...iterables: Array<Iterable<A> | AsyncIterable<A>>): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.concat(this, ...iterables));
  }

  takeWhile(predicate: (a: A) => boolean): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.takeWhile(this, predicate));
  }

  skipWhile(predicate: (a: A) => boolean): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.skipWhile(this, predicate));
  }

  all(predicate: (a: A) => boolean | Promise<boolean>): Promise<boolean> {
    return Iterators.all(this, predicate);
  }

  some(predicate: (a: A) => boolean | Promise<boolean>): Promise<boolean> {
    return Iterators.some(this, predicate);
  }

  sum(mapper: (a: A) => number = (a: A) => a as unknown as number): Promise<number> {
    return Iterators.sum(Iterators.map(this, mapper));
  }

  avg(mapper: (a: A) => number = (a: A) => a as unknown as number): Promise<number> {
    return Iterators.avg(Iterators.map(this, mapper));
  }

  [Symbol.asyncIterator](): AsyncIterator<A> {
    return this.iter[Symbol.asyncIterator]();
  }
}

export function asyncFluentIterator<A>(iter: AsyncIterable<A>): AsyncFluentIterator<A> {
  return new AsyncFluentIterator(iter);
}
