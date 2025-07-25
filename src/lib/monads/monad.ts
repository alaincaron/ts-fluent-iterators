import { Maybe } from './maybe';
import { FluentIterator } from '../sync';
import { Mapper, Predicate, Consumer } from '../utils';

export interface Monad<A, B> {
  exists(predicate: Predicate<B>): boolean;
  contains(b: B): boolean;
  forEach(f: Consumer<B>): void;
  all(predicate: Predicate<B>): boolean;
  filter(predicate: Predicate<B>): Maybe<B>;
  getOrThrow(): B;
  map<B1>(f: Mapper<B, B1>): Monad<A, B1>;
  toIterator(): FluentIterator<B>;
  get(): B | undefined;
}
