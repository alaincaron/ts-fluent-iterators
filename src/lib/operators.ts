import { BinaryFunction, Mapper } from './types';

export abstract class Operator<T, R = T> {
  abstract eval(t: T): R;

  asMapper(): Mapper<T, R> {
    return this.eval.bind(this);
  }

  andThen<V>(after: Operator<R, V> | Mapper<R, V>): Operator<T, V> {
    return new ComposeOperator(this, wrapMapper(after));
  }

  compose<V>(before: Operator<V, T> | Mapper<V, T>): Operator<V, R> {
    return new ComposeOperator(wrapMapper(before), this);
  }

  static identity<T>(): Operator<T, T> {
    return IDENTITY_OPERATOR as Operator<T, T>;
  }
}

function wrapMapper<T, R>(mapper: Operator<T, R> | Mapper<T, R>) {
  if (typeof mapper === 'function') return new FunctionalOperator(mapper);
  return mapper;
}

export class FunctionalOperator<T, R = T> extends Operator<T, R> {
  constructor(private readonly f: Mapper<T, R>) {
    super();
  }

  eval(t: T): R {
    return this.f(t);
  }

  asMapper() {
    return this.f;
  }
}

class ComposeOperator<T, R, V> extends Operator<T, V> {
  constructor(
    private readonly op1: Operator<T, R>,
    private readonly op2: Operator<R, V>
  ) {
    super();
  }

  eval(t: T) {
    return this.op2.eval(this.op1.eval(t));
  }
}

class IdentityOperator<T> extends Operator<T> {
  eval(t: T) {
    return t;
  }
}

const IDENTITY_OPERATOR = new IdentityOperator();

export abstract class BinaryOperator<T, U, R> {
  abstract eval(t: T, u: U): R;

  asBinaryFunction(): BinaryFunction<T, U, R> {
    return this.eval.bind(this);
  }

  andThen<V>(after: Operator<R, V> | Mapper<R, V>): BinaryOperator<T, U, V> {
    return new ComposeBinaryOperator(this, wrapMapper(after));
  }
}

class ComposeBinaryOperator<T, U, R, V> extends BinaryOperator<T, U, V> {
  constructor(
    private readonly op1: BinaryOperator<T, U, R>,
    private readonly op2: Operator<R, V>
  ) {
    super();
  }

  eval(t: T, u: U): V {
    return this.op2.eval(this.op1.eval(t, u));
  }
}

export abstract class BooleanOperator<T> extends Operator<T, boolean> {
  negate() {
    return new FunctionalBooleanOperator((t: T) => !this.eval(t));
  }

  or(op: Operator<T, boolean> | Mapper<T, boolean>) {
    return new FunctionalBooleanOperator((t: T) => this.eval(t) || wrapMapper(op).eval(t));
  }

  and(op: Operator<T, boolean> | Mapper<T, boolean>) {
    return new FunctionalBooleanOperator((t: T) => this.eval(t) && wrapMapper(op).eval(t));
  }

  nor(op: Operator<T, boolean> | Mapper<T, boolean>) {
    return new FunctionalBooleanOperator((t: T) => !(this.eval(t) || wrapMapper(op).eval(t)));
  }

  nand(op: Operator<T, boolean> | Mapper<T, boolean>) {
    return new FunctionalBooleanOperator((t: T) => !(this.eval(t) && wrapMapper(op).eval(t)));
  }

  xor(op: Operator<T, boolean> | Mapper<T, boolean>) {
    return new FunctionalBooleanOperator((t: T) => this.eval(t) !== wrapMapper(op).eval(t));
  }

  xnor(op: Operator<T, boolean> | Mapper<T, boolean>) {
    return new FunctionalBooleanOperator((t: T) => this.eval(t) === wrapMapper(op).eval(t));
  }

  implies(op: Operator<T, boolean> | Mapper<T, boolean>) {
    return new FunctionalBooleanOperator((t: T) => this.eval(t) <= wrapMapper(op).eval(t));
  }

  inhibits(op: Operator<T, boolean> | Mapper<T, boolean>) {
    return new FunctionalBooleanOperator((t: T) => this.eval(t) > wrapMapper(op).eval(t));
  }

  static alwaysTrue<T>() {
    return ALWAYS_TRUE as unknown as BooleanOperator<T>;
  }

  static alwaysFalse<T>() {
    return ALWAYS_FALSE as unknown as BooleanOperator<T>;
  }
}

export class FunctionalBooleanOperator<T> extends BooleanOperator<T> {
  constructor(private readonly f: Mapper<T, boolean>) {
    super();
  }
  eval(t: T): boolean {
    return this.f(t);
  }

  asMapper() {
    return this.f;
  }
}

class ConstantBooleanOperator extends BooleanOperator<never> {
  constructor(private readonly result: boolean) {
    super();
  }

  eval(_: never) {
    return this.result;
  }
}

const ALWAYS_TRUE = new ConstantBooleanOperator(true);
const ALWAYS_FALSE = new ConstantBooleanOperator(false);
