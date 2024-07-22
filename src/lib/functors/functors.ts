import * as Functions from '../functions';
import * as Predicates from '../predicates';
import { Mapper, Predicate } from '../types';

export type FunctorLike<T, R> = Functor<T, R> | Mapper<T, R>;
export type PredicateLike<T> = Predicate<T> | BooleanFunctor<T>;

export abstract class Functor<T, R> {
  abstract eval(t: T): R;

  get f(): Mapper<T, R> {
    return this.eval.bind(this);
  }

  andThen<V>(after: FunctorLike<R, V>): Functor<T, V> {
    return new FunctionalFunctor(Functions.compose(this.f, Functor.getFunction(after)));
  }

  compose<V>(before: FunctorLike<V, T>): Functor<V, R> {
    return new FunctionalFunctor(Functions.compose(Functor.getFunction(before), this.f));
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

export abstract class BooleanFunctor<T> extends Functor<T, boolean> {
  get predicate(): Predicate<T> {
    return this.f;
  }

  negate() {
    return new FunctionalBooleanFunctor(Predicates.negate(this.predicate));
  }

  or(op: Functor<T, boolean> | Predicate<T>) {
    return new FunctionalBooleanFunctor(Predicates.or(this.predicate, Functor.getFunction(op)));
  }

  and(op: Functor<T, boolean> | Predicate<T>) {
    return new FunctionalBooleanFunctor(Predicates.and(this.predicate, Functor.getFunction(op)));
  }

  nor(op: Functor<T, boolean> | Predicate<T>) {
    return new FunctionalBooleanFunctor(Predicates.nor(this.predicate, Functor.getFunction(op)));
  }

  nand(op: Functor<T, boolean> | Predicate<T>) {
    return new FunctionalBooleanFunctor(Predicates.nand(this.predicate, Functor.getFunction(op)));
  }

  xor(op: Functor<T, boolean> | Predicate<T>) {
    return new FunctionalBooleanFunctor(Predicates.xor(this.predicate, Functor.getFunction(op)));
  }

  xnor(op: Functor<T, boolean> | Predicate<T>) {
    return new FunctionalBooleanFunctor(Predicates.xnor(this.predicate, Functor.getFunction(op)));
  }

  static alwaysTrue<T>(): BooleanFunctor<T> {
    return ALWAYS_TRUE;
  }

  static alwaysFalse<T>(): BooleanFunctor<T> {
    return ALWAYS_FALSE;
  }

  static fromPredicate<T>(predicate: Predicate<T>): BooleanFunctor<T> {
    return new FunctionalBooleanFunctor(predicate);
  }
}

class FunctionalBooleanFunctor<T> extends BooleanFunctor<T> {
  private readonly _predicate: Predicate<T>;
  constructor(predicate: Predicate<T>) {
    super();
    this._predicate = predicate;
  }

  eval(t: T): boolean {
    return this.f(t);
  }

  get f() {
    return this._predicate;
  }

  get predicate() {
    return this._predicate;
  }
}

const ALWAYS_TRUE = new FunctionalBooleanFunctor(Predicates.alwaysTrue);
const ALWAYS_FALSE = new FunctionalBooleanFunctor(Predicates.alwayFalse);
