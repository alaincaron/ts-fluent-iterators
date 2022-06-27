import * as Iterators from './iterators';

export class FluentIterator<A> {

  private iter: AsyncIterator<A>;

  constructor(iter: AsyncIterator<A> | AsyncIterable<A>) {
    this.iter = Iterators.asyncIterator(iter);
  }

  collect(): Promise<A[]> {
    return Iterators.collect(this.iter);
  }

  filter(predicate: (a: A) => boolean): FluentIterator<A> {
    return new FluentIterator(Iterators.filter(this.iter, predicate));
  }

  map<B>(f: (a: A) => B): FluentIterator<B> {
    return new FluentIterator(Iterators.map(this.iter, f));
  }

  first(): Promise<A | undefined> {
    return Iterators.first(this.iter);
  }

  take(n: number): FluentIterator<A> {
    return new FluentIterator(Iterators.take(this.iter, n));
  }

  skip(n: number): FluentIterator<A> {
    return new FluentIterator(Iterators.skip(this.iter, n));
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

  zip<B>(other: AsyncIterator<B> | AsyncIterable<B>): FluentIterator<[A, B]> {
    return new FluentIterator(Iterators.zip(this.iter, Iterators.asyncIterator(other)));
  }

  enumerate(): FluentIterator<[A, number]> {
    return new FluentIterator(Iterators.enumerate(this.iter));
  }

  tap(f: (a: A) => any): FluentIterator<A> {
    return new FluentIterator(Iterators.tap(this.iter, f));
  }

  [Symbol.asyncIterator](): AsyncIterator<A> {
    return this.iter;
  }
}
