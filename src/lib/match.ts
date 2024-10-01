import { Constructor } from './constructor';
import { alwaysTrue } from './functions';
import { Mapper, Predicate } from './types';

type IsCase<T> = { is: Constructor<T> };
type WhenCase<T> = { when: Predicate<T> };
type EqCase<T> = { eq: T };
type Clause<T, R> = (IsCase<T> | WhenCase<T> | EqCase<T>) & { handler: Mapper<T, R> };

abstract class Matcher<T, R, M extends Matcher<T, R, M>> {
  protected readonly clauses: Clause<T, R>[] = [];

  is(target: Constructor<T>, handler: Mapper<T, R>) {
    return this.addClause({ is: target, handler });
  }

  eq(target: T, handler: Mapper<T, R>) {
    return this.addClause({ eq: target, handler });
  }

  when(predicate: Predicate<T>, handler: Mapper<T, R>) {
    return this.addClause({ when: predicate, handler });
  }

  default(handler: Mapper<T, R>) {
    return this.when(alwaysTrue, handler);
  }

  private addClause(clause: Clause<T, R>) {
    this.clauses.push(clause);
    return this as unknown as M;
  }

  protected compute(value: T) {
    for (const clause of this.clauses) {
      if ('is' in clause) {
        if (value instanceof clause.is) return clause.handler(value);
      } else if ('eq' in clause) {
        if (clause.eq === value) return clause.handler(value);
      } else if ('when' in clause) {
        if (clause.when(value)) return clause.handler(value);
      }
    }
    return undefined;
  }
}

class CaseMatcher<T, R> extends Matcher<T, R, CaseMatcher<T, R>> {
  constructor(private readonly value: T) {
    super();
  }

  evaluate() {
    return this.compute(this.value);
  }
}

export function match<T, R>(value: T) {
  return new CaseMatcher<T, R>(value);
}

class FunctionMatcher<T, R> extends Matcher<T, R, FunctionMatcher<T, R>> {
  build() {
    return (value: T) => this.compute(value);
  }
}

export function matcher<T, R>() {
  return new FunctionMatcher<T, R>();
}
