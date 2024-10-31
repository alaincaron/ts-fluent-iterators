import * as Functions from '../functions';
import { Mapper } from '../utils';

export type FunctorLike<T, R> = Functor<T, R> | Mapper<T, R>;

export abstract class Functor<T, R> {
  abstract eval(t: T): R;

  get f(): Mapper<T, R> {
    return this.eval.bind(this);
  }

  andThen<V>(after: FunctorLike<R, V>): Functor<T, V> {
    return FunctionalFunctor.from(Functions.compose(this.f, Functor.getFunction(after)));
  }

  compose<V>(before: FunctorLike<V, T>): Functor<V, R> {
    return FunctionalFunctor.from(Functions.compose(Functor.getFunction(before), this.f));
  }

  static identity<T>(): Functor<T, T> {
    return IDENTITY_OPERATOR as Functor<T, T>;
  }

  static from<T, R = T>(f: Mapper<T, R>): Functor<T, R> {
    return new FunctionalFunctor(f);
  }

  static getFunction<T, R = T>(mapper: FunctorLike<T, R>): Mapper<T, R> {
    if (typeof mapper === 'function') return mapper;
    return mapper.f;
  }
}

class FunctionalFunctor<T, R = T> extends Functor<T, R> {
  private readonly _f: Mapper<T, R>;
  constructor(f: Mapper<T, R>) {
    super();
    this._f = f;
  }

  eval(t: T): R {
    return this._f(t);
  }

  get f() {
    return this._f;
  }
}

const IDENTITY_OPERATOR = new FunctionalFunctor(Functions.identity());
