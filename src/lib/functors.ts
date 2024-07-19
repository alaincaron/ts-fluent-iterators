import { Mapper, Predicate } from './types';

export abstract class Functor<T, R = T> {
  abstract eval(t: T): R;

  asFunction(): Mapper<T, R> {
    return this.eval.bind(this);
  }

  andThen<V>(after: Functor<R, V> | Mapper<R, V>): Functor<T, V> {
    after = Functor.getFunction(after);
    return new FunctionalFunctor((t: T) => after(this.eval(t)));
  }

  compose<V>(before: Functor<V, T> | Mapper<V, T>): Functor<V, R> {
    before = Functor.getFunction(before);
    return new FunctionalFunctor((v: V) => this.eval(before(v)));
  }

  static identity<T>(): Functor<T, T> {
    return IDENTITY_OPERATOR as Functor<T, T>;
  }

  static from<T, R = T>(f: Mapper<T, R>): Functor<T, R> {
    return new FunctionalFunctor(f);
  }

  static getFunction<T, R = T>(f: Functor<T, R> | Mapper<T, R>): Mapper<T, R> {
    if (typeof f === 'function') return f;
    return f.asFunction();
  }
}

class FunctionalFunctor<T, R = T> extends Functor<T, R> {
  constructor(private readonly f: Mapper<T, R>) {
    super();
  }

  eval(t: T): R {
    return this.f(t);
  }

  asFunction() {
    return this.f;
  }
}

class IdentityFunctor<T> extends Functor<T> {
  eval(t: T) {
    return t;
  }
}

const IDENTITY_OPERATOR = new IdentityFunctor();

export abstract class BooleanFunctor<T> extends Functor<T, boolean> {
  negate() {
    return new FunctionalBooleanFunctor((t: T) => !this.eval(t));
  }

  or(op: Functor<T, boolean> | Predicate<T>) {
    op = Functor.getFunction(op);
    return new FunctionalBooleanFunctor((t: T) => this.eval(t) || op(t));
  }

  and(op: Functor<T, boolean> | Predicate<T>) {
    op = Functor.getFunction(op);
    return new FunctionalBooleanFunctor((t: T) => this.eval(t) && op(t));
  }

  nor(op: Functor<T, boolean> | Predicate<T>) {
    op = Functor.getFunction(op);
    return new FunctionalBooleanFunctor((t: T) => !(this.eval(t) || op(t)));
  }

  nand(op: Functor<T, boolean> | Predicate<T>) {
    op = Functor.getFunction(op);
    return new FunctionalBooleanFunctor((t: T) => !(this.eval(t) && op(t)));
  }

  xor(op: Functor<T, boolean> | Predicate<T>) {
    op = Functor.getFunction(op);
    return new FunctionalBooleanFunctor((t: T) => this.eval(t) !== op(t));
  }

  xnor(op: Functor<T, boolean> | Predicate<T>) {
    op = Functor.getFunction(op);
    return new FunctionalBooleanFunctor((t: T) => this.eval(t) === op(t));
  }

  implies(op: Functor<T, boolean> | Predicate<T>) {
    op = Functor.getFunction(op);
    return new FunctionalBooleanFunctor((t: T) => this.eval(t) <= op(t));
  }

  inhibits(op: Functor<T, boolean> | Predicate<T>) {
    op = Functor.getFunction(op);
    return new FunctionalBooleanFunctor((t: T) => this.eval(t) > op(t));
  }

  static alwaysTrue<T>() {
    return ALWAYS_TRUE as unknown as BooleanFunctor<T>;
  }

  static alwaysFalse<T>() {
    return ALWAYS_FALSE as unknown as BooleanFunctor<T>;
  }

  static fromPredicate<T>(predicate: Predicate<T>): BooleanFunctor<T> {
    return new FunctionalBooleanFunctor(predicate);
  }
}

class FunctionalBooleanFunctor<T> extends BooleanFunctor<T> {
  constructor(private readonly f: Predicate<T>) {
    super();
  }

  eval(t: T): boolean {
    return this.f(t);
  }

  asMapper() {
    return this.f;
  }
}

class ConstantBooleanFunctor extends BooleanFunctor<any> {
  constructor(private readonly result: boolean) {
    super();
  }

  eval(_: any) {
    return this.result;
  }
}

const ALWAYS_TRUE = new ConstantBooleanFunctor(true);
const ALWAYS_FALSE = new ConstantBooleanFunctor(false);
