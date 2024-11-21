import { BinaryMapper, Mapper, Predicate, Provider, Reducer } from '../../src/lib/utils';

export function providerError<T>(err?: unknown): Provider<T> {
  return () => {
    throw err ?? new Error();
  };
}

export function mapperError<A, B>(err?: unknown): Mapper<A, B> {
  return (_: A) => {
    throw err ?? new Error();
  };
}

export function binaryMapperError<A, B, C>(err?: unknown): BinaryMapper<A, B, C> {
  return (_a: A, _b: B) => {
    throw err ?? new Error();
  };
}

export function reducerError<A, B>(err?: unknown): Reducer<A, B> {
  return (_b: B, _a: A) => {
    throw err ?? new Error();
  };
}

export function predicateError<A>(err?: unknown): Predicate<A> {
  return mapperError(err);
}
