import { Either, Left, Right } from './either';
import { Maybe, None, Some } from './maybe';
import { Monad } from './monad';
import { emptyIterator, FluentIterator, singletonIterator } from '../sync';
import { EventualProvider, Mapper, Predicate, Provider } from '../utils';

export abstract class Try<T> implements Monad<never, T> {
  static async createAsync<T>(f: EventualProvider<T | Try<T>>): Promise<Try<T>> {
    try {
      const t = await f();
      return t instanceof Try ? t : new Success(t);
    } catch (e) {
      return new Failure(e) as Try<T>;
    }
  }

  static create<T>(f: Provider<T | Try<T>>): Try<T> {
    try {
      const t = f();
      return t instanceof Try ? t : new Success(t);
    } catch (e) {
      return new Failure(e) as Try<T>;
    }
  }

  abstract get isSuccess(): boolean;

  get isFailure() {
    return !this.isSuccess;
  }
  abstract exists(predicate: Predicate<T>): boolean;
  abstract contains(t: T): boolean;
  abstract forEach(f: Mapper<T, any>): void;
  abstract all(predicate: Predicate<T>): boolean;
  abstract getOrThrow(): T;
  abstract toIterator(): FluentIterator<T>;
  abstract get(): T | undefined;
  abstract filter(predicate: Predicate<T>): Maybe<T>;

  abstract map<U>(mapper: Mapper<T, U>): Try<U>;
  abstract flatMap<U>(mapper: Mapper<T, Try<U>>): Try<U>;

  abstract fold<U>(success: Mapper<T, U>, failure: Mapper<unknown, U>): U;

  abstract transform<U>(success: Mapper<T, Try<U>>, failure: Mapper<unknown, Try<U>>): Try<U>;

  abstract recover(f: Mapper<unknown, T>): Try<T>;
  abstract flatRecover(f: Mapper<unknown, Try<T>>): Try<T>;

  getOrElse<U extends T>(f: Provider<U>): T {
    return this.isSuccess ? this.get()! : f();
  }

  orElse<U extends T>(f: Provider<Try<U>>): Try<T> {
    return this.isSuccess ? this : f();
  }

  abstract toEither(): Either<unknown, T>;
  abstract toMaybe(): Maybe<T>;
}

export class Success<T> extends Try<T> {
  constructor(private readonly value: T) {
    super();
  }
  get isSuccess() {
    return true;
  }

  flatMap<U>(mapper: Mapper<T, Try<U>>): Try<U> {
    return Try.create(() => mapper(this.value));
  }

  map<U>(mapper: Mapper<T, U>): Try<U> {
    return Try.create(() => mapper(this.value));
  }

  fold<U>(success: Mapper<T, U>, _failure: Mapper<unknown, U>): U {
    return success(this.value);
  }

  transform<U>(success: Mapper<T, Try<U>>, _failure: Mapper<unknown, Try<U>>): Try<U> {
    return this.flatMap(success);
  }

  exists(predicate: Predicate<T>): boolean {
    return predicate(this.value);
  }

  contains(t: T) {
    return this.value === t;
  }

  forEach(f: Mapper<T, any>): void {
    f(this.value);
  }

  all(predicate: Predicate<T>): boolean {
    return predicate(this.value);
  }

  filter(predicate: Predicate<T>) {
    return predicate(this.value) ? this.toMaybe() : None;
  }

  getOrThrow() {
    return this.value;
  }

  toIterator() {
    return singletonIterator(this.value);
  }

  get() {
    return this.value;
  }

  recover(_f: Mapper<unknown, T>): Try<T> {
    return this;
  }

  flatRecover(_f: Mapper<unknown, Try<T>>): Try<T> {
    return this;
  }

  toEither() {
    return new Right(this.value);
  }

  toMaybe() {
    return new Some(this.value);
  }
}

export class Failure<T> extends Try<T> {
  constructor(private readonly err: unknown) {
    super();
  }
  get isSuccess() {
    return false;
  }

  flatMap<U>(_mapper: Mapper<T, Try<U>>) {
    return this as unknown as Try<U>;
  }

  map<U>(_mapper: Mapper<T, U>): Try<U> {
    return this as unknown as Try<U>;
  }

  fold<U>(_success: Mapper<T, U>, failure: Mapper<unknown, U>): U {
    return failure(this.err);
  }

  transform<U>(_success: Mapper<T, Try<U>>, failure: Mapper<unknown, Try<U>>): Try<U> {
    return Try.create(() => failure(this.err));
  }

  exists(_predicate: Predicate<T>) {
    return false;
  }

  contains(_t: T) {
    return false;
  }

  forEach(_f: Mapper<T, any>): void {}

  all(_predicate: Predicate<T>): boolean {
    return true;
  }

  filter(_predicate: Predicate<T>) {
    return None;
  }

  getOrThrow(): never {
    throw this.err;
  }

  toIterator() {
    return emptyIterator();
  }

  get() {
    return undefined;
  }

  recover(f: Mapper<unknown, T>): Try<T> {
    return Try.create(() => f(this.err));
  }

  flatRecover(f: Mapper<unknown, Try<T>>): Try<T> {
    return Try.create(() => f(this.err));
  }

  toEither() {
    return new Left(this.err);
  }

  toMaybe() {
    return None;
  }
}
