import * as Iterators from './iterators';

export class FluentIterator<A> {

  private iter: Iterator<A>;

  constructor(iter: Iterator<A> | Iterable<A>) {
    this.iter = Iterators.iterator(iter);
  }

  collect(): A[] {
    return Iterators.collect(this.iter);
  }

  filter(predicate: (a: A) => boolean): FluentIterator<A> {
    return new FluentIterator(Iterators.filter(this.iter, predicate));
  }

  map<B>(f: (a: A) => B): FluentIterator<B> {
    return new FluentIterator(Iterators.map(this.iter, f));
  }

  first(): A | undefined {
    return Iterators.first(this.iter);
  }

  take(n: number): FluentIterator<A> {
    return new FluentIterator(Iterators.take(this.iter, n));
  }

  skip(n: number): FluentIterator<A> {
    return new FluentIterator(Iterators.skip(this.iter, n));
  }

  find(predicate: (a: A) => boolean): A | undefined {
    return Iterators.find(this.iter, predicate);
  }

  fold<B>(reducer: (b: B, a: A) => B, initialValue: B): B {
    return Iterators.fold(this.iter, reducer, initialValue);
  }

  reduce(reducer: (acc: A, a: A) => A, initialValue?: A): A | undefined {
    return Iterators.reduce(this.iter, reducer, initialValue);
  }

  zip<B>(other: Iterator<B> | Iterable<B>): FluentIterator<[A, B]> {
    return new FluentIterator(Iterators.zip(this.iter, Iterators.iterator(other)));
  }

  enumerate(): FluentIterator<[A, number]> {
    return new FluentIterator(Iterators.enumerate(this.iter));
  }

  tap(f: (a: A) => any): FluentIterator<A> {
    return new FluentIterator(Iterators.tap(this.iter, f));
  }

  [Symbol.iterator](): Iterator<A> {
    return this.iter;
  }
}


export function fluentIterator<A>(iter: Iterator<A> | Iterable<A>): FluentIterator<A> {
  return new FluentIterator<A>(iter);
}
