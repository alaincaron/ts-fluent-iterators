import { Try } from '../monads';
import { Mapper, Provider } from '../types';

/**
 * Represents a lazy-evaluated value that is computed only when needed.
 * @class Lazy
 * @template T - The type of the value.
 */
export class Lazy<T> {
  /**
   * The computed value, stored after evaluation.
   * @private
   * @type {T | undefined}
   */
  private value?: Try<T>;

  /**
   * Private constructor to create an instance of `Lazy`.
   * @private
   * @constructor
   * @param {() => T} provider - The function representing the lazy provider.
   */
  private constructor(private readonly provider: Provider<T>) {}

  /**
   * Static method to create an instance of `Lazy`.
   * @template T - The type of the value.
   * @param {() => T | Promise<T>} provider - The function representing the lazy provider.
   * @returns {Lazy<T>} An instance of Lazy.
   */
  static create<T>(provider: Provider<T>): Lazy<T> {
    return new Lazy<T>(provider);
  }

  /**
   * Maps the computed value to a new value using the provided function.
   * @paramType R - The type of the result after applying the function.
   * @param {Mapper<T,R>} fn - The function to apply to the computed value.
   * @returns {Lazy<R>} A new instance of Lazy with the transformed value.
   */
  map<R>(fn: Mapper<T, R>): Lazy<R> {
    return new Lazy<R>(() => fn(this.evaluate()));
  }

  /**
   * Evaluates and returns the computed value, calculating it only when necessary.
   * @returns {T} The computed value.
   */
  evaluate(): T {
    if (!this.value) {
      this.value = Try.create(this.provider);
    }
    return this.value.getOrThrow();
  }
}

export function lazy<T>(provider: Provider<T>): Lazy<T> {
  return Lazy.create(provider);
}
