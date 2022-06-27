import * as Iterators from './asyncIterators';

export class AsyncFluentIterator<A> {

  private iter: AsyncIterator<A>;

  constructor(iter: AsyncIterator<A> | AsyncIterable<A>) {
    this.iter = Iterators.asyncIterator(iter);
  }

  collect(): Promise<A[]> {
    return Iterators.collect(this.iter);
  }

  filter(predicate: (a: A) => boolean): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.filter(this.iter, predicate));
  }

  map<B>(f: (a: A) => B): AsyncFluentIterator<B> {
    return new AsyncFluentIterator(Iterators.map(this.iter, f));
  }

  first(): Promise<A | undefined> {
    return Iterators.first(this.iter);
  }

  take(n: number): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.take(this.iter, n));
  }

  skip(n: number): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.skip(this.iter, n));
  }

  find(predicate: (a: A) => boolean): Promise<A | undefined> {
    return Iterators.find(this.iter, predicate);
  }

  fold<B>(reducer: (b: B, a: A) => B, initialValue: B): Promise<B> {
    return Iterators.fold(this.iter, reducer, initialValue);
  }

  reduce(reducer: (acc: A, a: A) => A, initialValue?: A): Promise<A | undefined> {
    return Iterators.reduce(this.iter, reducer, initialValue);
  }

  zip<B>(other: AsyncIterator<B> | AsyncIterable<B>): AsyncFluentIterator<[A, B]> {
    return new AsyncFluentIterator(Iterators.zip(this.iter, Iterators.asyncIterator(other)));
  }

  enumerate(): AsyncFluentIterator<[A, number]> {
    return new AsyncFluentIterator(Iterators.enumerate(this.iter));
  }

  tap(f: (a: A) => any): AsyncFluentIterator<A> {
    return new AsyncFluentIterator(Iterators.tap(this.iter, f));
  }

  [Symbol.asyncIterator](): AsyncIterator<A> {
    return this.iter;
  }
}
