import { Monad } from './monad';
import { emptyIterator, FluentIterator, singletonIterator } from '../sync';
import { Mapper, Predicate, Provider } from '../types';

function wrap<X>(f: Provider<Try<X>>): Try<X> {
  try {
    return f();
  } catch (e) {
    return new Failure(e) as Try<X>;
  }
}

export abstract class Try<T> implements Monad<unknown, T> {
  static create<T>(f: Provider<T>): Try<T> {
    return wrap(() => new Success(f()));
  }

  abstract get isSuccess(): boolean;
  get isFailure() {
    return !this.isSuccess;
  }
  abstract exists(predicate: Predicate<T>): boolean;
  abstract forEach(f: Mapper<T, any>): void;
  abstract all(predicate: Predicate<T>): boolean;
  abstract getOrThrow(): T;
  abstract toIterator(): FluentIterator<T>;
  abstract get(): T | undefined;

  abstract map<U>(mapper: Mapper<T, U>): Try<U>;
  abstract flatMap<U>(mapper: Mapper<T, Try<U>>): Try<U>;
  abstract transform<U>(success: Mapper<T, Try<U>>, failure: Mapper<unknown, Try<U>>): Try<U>;

  abstract recover(f: Mapper<unknown, T>): Try<T>;
  abstract flatRecover(f: Mapper<unknown, Try<T>>): Try<T>;

  getOrElse<U extends T>(f: Provider<U>): T {
    return this.isSuccess ? this.get()! : f();
  }

  orElse<U extends T>(f: Provider<Try<U>>): Try<T> {
    return this.isSuccess ? this : wrap(f);
  }
}

export class Success<T> extends Try<T> {
  constructor(private readonly value: T) {
    super();
  }
  get isSuccess() {
    return true;
  }

  flatMap<U>(mapper: Mapper<T, Try<U>>) {
    return wrap(() => mapper(this.value));
  }

  map<U>(mapper: Mapper<T, U>): Try<U> {
    return Try.create(() => mapper(this.value));
  }

  transform<U>(success: Mapper<T, Try<U>>, _failure: Mapper<unknown, Try<U>>): Try<U> {
    return this.flatMap(success);
  }

  exists(predicate: Predicate<T>): boolean {
    return predicate(this.value);
  }

  forEach(f: Mapper<T, any>): void {
    f(this.value);
  }

  all(predicate: Predicate<T>): boolean {
    return predicate(this.value);
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

  transform<U>(_success: Mapper<T, Try<U>>, failure: Mapper<unknown, Try<U>>): Try<U> {
    return wrap(() => failure(this.err));
  }

  exists(_predicate: Predicate<T>): boolean {
    return false;
  }

  forEach(_f: Mapper<T, any>): void {}

  all(_predicate: Predicate<T>): boolean {
    return true;
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
    return wrap(() => f(this.err));
  }
}
