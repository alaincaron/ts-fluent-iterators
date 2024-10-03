import { Maybe, None, Some } from './maybe';
import { Monad } from './monad';
import { alwaysFalse } from '../functions';
import { emptyIterator, FluentIterator, singletonIterator } from '../sync';
import { BinaryMapper, Mapper, Predicate, Provider } from '../types';

export class NoSuchElementException extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export abstract class Either<A, B> implements Monad<A, B> {
  static right<A, B>(b: B): Either<A, B> {
    return new Right(b);
  }

  static left<A, B>(a: A): Either<A, B> {
    return new Left(a);
  }

  abstract isRight(): boolean;
  isLeft() {
    return !this.isRight;
  }
  abstract exists(predicate: Predicate<B>): boolean;
  abstract forEach(f: Mapper<B, unknown>): void;
  abstract all(predicate: Predicate<B>): boolean;
  abstract getOrThrow(): B;
  abstract map<B1>(f: Mapper<B, B1>): Either<A, B1>;
  abstract fold<C>(leftFunction: Mapper<A, C>, rightFunction: Mapper<B, C>): C;
  abstract swap(): Either<B, A>;
  abstract onLeft(f: Mapper<A, unknown>): Either<A, B>;
  abstract onRight(f: Mapper<B, unknown>): Either<A, B>;
  abstract foldLeft<C>(c: C, rightFunction: BinaryMapper<C, B, C>): C;
  abstract mapLeft<A1>(f: Mapper<A, A1>): Either<A1, B>;

  abstract toIterator(): FluentIterator<B>;
  abstract get(): B | undefined;
  abstract filter(predicate: Predicate<B>): Maybe<B>;

  orElse(f: Provider<Either<A, B>>): Either<A, B> {
    return this.isRight() ? this : f();
  }

  contains(x: B) {
    return this.fold(alwaysFalse, it => it === x);
  }

  abstract flatMap<C>(mapper: Mapper<B, Either<A, C>>): Either<A, C>;
  abstract flatMapLeft<C>(mapper: Mapper<A, Either<C, B>>): Either<C, B>;

  abstract toMaybe(): Maybe<B>;

  getOrElse(f: Provider<B>): B {
    return this.fold(
      _ => f(),
      it => it
    );
  }
}

export class Left<A> extends Either<A, never> {
  constructor(private readonly value: A) {
    super();
  }
  isLeft() {
    return true;
  }

  isRight() {
    return false;
  }

  exists(_: Predicate<never>) {
    return false;
  }

  forEach(_: Mapper<never, any>) {}

  all(_: Predicate<never>) {
    return true;
  }

  getOrThrow(): never {
    throw new NoSuchElementException();
  }

  map<B1>(_: Mapper<never, B1>): Either<A, B1> {
    return this;
  }

  fold<C>(leftFunction: Mapper<A, C>, _: Mapper<never, C>) {
    return leftFunction(this.value);
  }

  swap(): Right<A> {
    return new Right(this.value);
  }

  onLeft(f: Mapper<A, any>): Left<A> {
    f(this.value);
    return this;
  }

  onRight(_: Mapper<never, any>): Left<A> {
    return this;
  }

  foldLeft<C>(c: C, _: BinaryMapper<C, never, C>) {
    return c;
  }

  mapLeft<A1>(f: Mapper<A, A1>): Left<A1> {
    return new Left(f(this.value));
  }

  toIterator() {
    return emptyIterator();
  }

  get() {
    return undefined;
  }

  filter(_: Predicate<never>) {
    return None;
  }

  flatMap<C>(_: Mapper<never, Either<A, C>>): Left<A> {
    return this;
  }

  flatMapLeft<C, B>(mapper: Mapper<A, Either<C, B>>): Either<C, B> {
    return mapper(this.value);
  }

  toMaybe() {
    return None;
  }
}

export class Right<B> extends Either<never, B> {
  constructor(private readonly value: B) {
    super();
  }
  isLeft() {
    return false;
  }

  isRight() {
    return true;
  }

  exists(predicate: Predicate<B>) {
    return predicate(this.value);
  }

  forEach(f: Mapper<B, any>) {
    f(this.value);
  }

  all(predicate: Predicate<B>) {
    return predicate(this.value);
  }

  getOrThrow() {
    return this.value;
  }

  map<B1>(mapper: Mapper<B, B1>) {
    return new Right(mapper(this.value));
  }

  fold<C>(_: Mapper<never, C>, rightFunction: Mapper<B, C>) {
    return rightFunction(this.value);
  }

  swap(): Left<B> {
    return new Left(this.value);
  }

  onLeft(_: Mapper<never, any>): Right<B> {
    return this;
  }

  onRight(f: Mapper<B, any>): Right<B> {
    f(this.value);
    return this;
  }

  foldLeft<C>(c: C, f: BinaryMapper<C, B, C>) {
    return f(c, this.value);
  }

  mapLeft<A1>(_: Mapper<never, A1>) {
    return this;
  }

  toIterator() {
    return singletonIterator(this.value);
  }

  get(): B {
    return this.value;
  }

  filter(predicate: Predicate<B>) {
    return predicate(this.value) ? new Some(this.value) : None;
  }

  flatMap<A, C>(mapper: Mapper<B, Either<A, C>>): Either<A, C> {
    return mapper(this.value);
  }

  flatMapLeft(_: Mapper<never, Either<never, B>>): Right<B> {
    return this;
  }

  toMaybe() {
    return new Some(this.value);
  }
}
