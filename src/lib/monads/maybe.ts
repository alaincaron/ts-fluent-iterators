import { Either, Left, NoSuchElementException, Right } from './either';
import { Monad } from './monad';
import { emptyIterator, FluentIterator, singletonIterator } from '../sync';
import { Mapper, Predicate, Provider, Reducer } from '../types';

export abstract class Maybe<A> implements Monad<never, A> {
  static of<A>(a: A) {
    return new Some(a);
  }

  static ofNullable<A>(a: A | null) {
    return a == null ? None : new Some(a);
  }

  static empty<A>(): Maybe<A> {
    return None;
  }

  static createIf<A>(condition: boolean, provider: Provider<A | null>) {
    return condition ? Maybe.ofNullable(provider()) : None;
  }

  static createUnless<A>(condition: boolean, provider: Provider<A | null>) {
    return condition ? None : Maybe.ofNullable(provider());
  }

  abstract exists(predicate: Predicate<A>): boolean;
  abstract forEach(f: Mapper<A, any>): void;
  abstract all(predicate: Predicate<A>): boolean;
  abstract getOrThrow(): A;
  abstract map<B>(f: Mapper<A, B>): Maybe<B>;
  abstract toIterator(): FluentIterator<A>;
  abstract get(): A | undefined;

  abstract isEmpty(): boolean;

  isNotEmpty() {
    return !this.isEmpty();
  }

  isDefined() {
    return !this.isEmpty();
  }

  abstract onNone(f: Provider<unknown>): Maybe<A>;
  abstract onSome(f: Provider<unknown>): Maybe<A>;
  abstract fold<B>(ifEmpty: Provider<B>, ifSome: Mapper<A, B>): B;
  abstract flatMap<B>(f: Mapper<A, Maybe<B>>): Maybe<B>;
  abstract filter(predicate: Predicate<A>): Maybe<A>;
  abstract foldLeft<B>(initial: B, f: Reducer<A, B>): B;
  abstract toEither<L>(ifEmpty: Provider<L>): Either<L, A>;

  abstract toString(): string;
}

class NoneSingleton extends Maybe<never> {
  static readonly INSTANCE = new NoneSingleton();

  private constructor() {
    super();
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

  map<B>(_: Mapper<never, B>) {
    return this;
  }

  toIterator() {
    return emptyIterator();
  }

  get() {
    return undefined;
  }

  isEmpty() {
    return true;
  }

  onNone(f: Provider<unknown>) {
    f();
    return this;
  }

  onSome(_: Provider<unknown>) {
    return this;
  }

  fold<B>(ifEmpty: Provider<B>, _: Mapper<never, B>) {
    return ifEmpty();
  }

  flatMap<B>(_: Mapper<never, Maybe<B>>) {
    return this;
  }

  filter(_: Predicate<never>) {
    return this;
  }

  foldLeft<B>(initial: B, _: Reducer<never, B>) {
    return initial;
  }

  toEither<L>(ifEmpty: Provider<L>) {
    return new Left(ifEmpty());
  }

  toString() {
    return 'None';
  }
}

export const None = NoneSingleton.INSTANCE;

export class Some<A> extends Maybe<A> {
  constructor(private readonly value: A) {
    super();
  }

  exists(predicate: Predicate<A>) {
    return predicate(this.value);
  }

  forEach(f: Mapper<A, any>) {
    f(this.value);
  }

  all(predicate: Predicate<A>) {
    return predicate(this.value);
  }

  getOrThrow(): A {
    return this.value;
  }

  map<B>(mapper: Mapper<A, B>) {
    return new Some(mapper(this.value));
  }

  toIterator() {
    return singletonIterator(this.value);
  }

  get(): A {
    return this.value;
  }

  isEmpty() {
    return false;
  }

  onNone(_: Provider<unknown>) {
    return this;
  }

  onSome(f: Provider<unknown>) {
    f();
    return this;
  }

  fold<B>(_: Provider<never>, ifSome: Mapper<A, B>) {
    return ifSome(this.value);
  }

  flatMap<B>(mapper: Mapper<A, Maybe<B>>) {
    return mapper(this.value);
  }

  filter(predicate: Predicate<A>) {
    return predicate(this.value) ? this : None;
  }

  foldLeft<B>(initial: B, reducer: Reducer<A, B>) {
    return reducer(initial, this.value);
  }

  toEither<L>(_: Provider<L>) {
    return new Right(this.value);
  }

  toString() {
    return `Some(${this.value})`;
  }
}
