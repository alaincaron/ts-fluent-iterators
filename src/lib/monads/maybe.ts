import { Either, Left, NoSuchElementException, Right } from './either';
import { Monad } from './monad';
import { emptyIterator, FluentIterator, singletonIterator } from '../sync';
import { Mapper, Predicate, Provider, Consumer } from '../utils';

export abstract class Maybe<A> implements Monad<never, A> {
  static of<A>(a: A) {
    return new Some(a);
  }

  static ofNullable<A>(a: A | null): Maybe<A> {
    return a == null ? None : new Some(a);
  }

  static empty<A>(): Maybe<A> {
    return None;
  }

  static createIf<A>(condition: boolean, provider: Provider<A | null>): Maybe<A> {
    return condition ? Maybe.ofNullable(provider()) : None;
  }

  static createUnless<A>(condition: boolean, provider: Provider<A | null>): Maybe<A> {
    return condition ? None : Maybe.ofNullable(provider());
  }

  abstract contains(a: A): boolean;
  abstract exists(predicate: Predicate<A>): boolean;
  abstract forEach(f: Consumer<A>): void;
  abstract all(predicate: Predicate<A>): boolean;
  abstract getOrThrow(): A;
  abstract map<B>(f: Mapper<A, B>): Maybe<B>;
  abstract toIterator(): FluentIterator<A>;
  abstract get(): A | undefined;

  getOrElse(f: Provider<A>): A {
    return this.isEmpty() ? f() : this.getOrThrow();
  }

  abstract isEmpty(): boolean;
  orElse(f: Provider<Maybe<A>>): Maybe<A> {
    return this.isEmpty() ? f() : this;
  }

  isDefined() {
    return !this.isEmpty();
  }

  abstract onNone(f: Provider<unknown>): Maybe<A>;
  abstract onSome(f: Provider<unknown>): Maybe<A>;
  abstract fold<B>(ifEmpty: Provider<B>, ifSome: Mapper<A, B>): B;
  abstract flatMap<B>(f: Mapper<A, Maybe<B>>): Maybe<B>;
  abstract filter(predicate: Predicate<A>): Maybe<A>;
  abstract toEither<L>(ifEmpty: Provider<L>): Either<L, A>;

  abstract toString(): string;
}

class NoneSingleton extends Maybe<never> {
  static readonly INSTANCE = new NoneSingleton();

  private constructor() {
    super();
  }

  exists<A>(_: Predicate<A>) {
    return false;
  }

  contains<A>(_: A) {
    return false;
  }

  forEach(_: Consumer<never>) {}

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

  contains(a: A) {
    return this.value === a;
  }

  forEach(f: Consumer<A>) {
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

  fold<B>(_: Provider<B>, ifSome: Mapper<A, B>) {
    return ifSome(this.value);
  }

  flatMap<B>(mapper: Mapper<A, Maybe<B>>) {
    return mapper(this.value);
  }

  filter(predicate: Predicate<A>) {
    return predicate(this.value) ? this : None;
  }

  toEither<L>(_: Provider<L>) {
    return new Right(this.value);
  }

  toString() {
    return `Some(${this.value})`;
  }
}
