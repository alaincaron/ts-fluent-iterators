import { Constructor } from './constructor';
import { alwaysTrue } from './functions';
import { NoneSingleton } from './monads';
import { Mapper, Predicate } from './types';

export type MatchCase =
  | string
  | number
  | boolean
  | symbol
  | bigint
  | null
  | undefined
  | Constructor<any, any>
  | NoneSingleton;

export type Clause<T, R> = ({ is: MatchCase } | { when: Predicate<T> }) & { handler: Mapper<T, R> };

function evaluate<T, R>(value: T, clauses: Clause<T, R>[]) {
  for (const clause of clauses) {
    if ('is' in clause) {
      if (compare(clause.is, value)) return clause.handler(value);
    } else if ('when' in clause) {
      if (clause.when(value)) return clause.handler(value);
    }
  }
  return undefined;
}

class CaseMatcher<T, R> {
  private readonly clauses: Clause<T, R>[] = [];

  constructor(private readonly value: T) {}

  is(target: MatchCase, handler: Mapper<T, R>) {
    this.clauses.push(is(target, handler));
    return this;
  }

  when(predicate: Predicate<T>, handler: Mapper<T, R>) {
    this.clauses.push(when(predicate, handler));
    return this;
  }

  default(handler: Mapper<T, R>) {
    return this.when(alwaysTrue, handler);
  }

  evaluate() {
    return evaluate(this.value, this.clauses);
  }
}

export function match<T, R>(value: T) {
  return new CaseMatcher<T, R>(value);
}

class FunctionMatcher<T, R> {
  private readonly clauses: Clause<T, R>[] = [];

  is(target: MatchCase, handler: Mapper<T, R>) {
    this.clauses.push(is(target, handler));
    return this;
  }

  when(predicate: Predicate<T>, handler: Mapper<T, R>) {
    this.clauses.push(when(predicate, handler));
    return this;
  }

  default(handler: Mapper<T, R>) {
    return this.when(alwaysTrue, handler);
  }

  build() {
    return (value: T) => evaluate(value, this.clauses);
  }
}

export function matcher<T, R>() {
  return new FunctionMatcher<T, R>();
}

function is<T, R>(target: MatchCase, handler: Mapper<T, R>) {
  return { is: target, handler };
}

function when<T, R>(predicate: Predicate<T>, handler: Mapper<T, R>) {
  return { when: predicate, handler };
}

/**
 * Compare case value and actual value.
 * Used instead of `===` because also handles situations when case value is `Option | Either  for example.
 *
 * @since 1.0.0
 * @param caseValue value of the case
 * @param actualValue actual value
 * @returns is case value equals actual value
 */
function compare<T>(target: MatchCase, actualValue: T): boolean {
  if (typeof target === 'function') {
    return actualValue instanceof target;
  }

  return target === actualValue;
}
