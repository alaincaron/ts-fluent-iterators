import * as Iterators from './iterators';

export class FluentIterator<A> implements Iterable<A> {

  private iter: Iterable<A>;

  constructor(iter: Iterable<A>) {
    this.iter = iter;
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
    return Iterators.first(this);
  }

  take(n: number): FluentIterator<A> {
    return new FluentIterator(Iterators.take(this.iter, n));
  }

  skip(n: number): FluentIterator<A> {
    return new FluentIterator(Iterators.skip(this.iter, n));
  }

  find(predicate: (a: A) => boolean): A | undefined {
    return Iterators.find(this, predicate);
  }

  fold<B>(reducer: (b: B, a: A) => B, initialValue: B): B {
    return Iterators.fold(this, reducer, initialValue);
  }

  reduce(reducer: (acc: A, a: A) => A, initialValue?: A): A | undefined {
    return Iterators.reduce(this, reducer, initialValue);
  }

  zip<B>(other: Iterable<B>): FluentIterator<[A, B]> {
    return new FluentIterator(Iterators.zip(this, other))
  }

  enumerate(): FluentIterator<[A, number]> {
    return new FluentIterator(Iterators.enumerate(this));
  }

  tap(f: (a: A) => any): FluentIterator<A> {
    return new FluentIterator(Iterators.tap(this, f));
  }

  forEach(f: (a: A) => any): void {
    Iterators.forEach(this, f);
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

  takeWhile(predicate: (a: A) => boolean): FluentIterator<A> {
    return new FluentIterator(Iterators.takeWhile(this, predicate));
  }

  skipWhile(predicate: (a: A) => boolean): FluentIterator<A> {
    return new FluentIterator(Iterators.skipWhile(this, predicate));
  }

  [Symbol.iterator](): Iterator<A> {
    return this.iter[Symbol.iterator]();
  }
}

export function fluentIterator<A>(iter: Iterable<A>): FluentIterator<A> {
  return new FluentIterator(iter);
}
