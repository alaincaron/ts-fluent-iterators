import { EventualMapper, EventualProvider } from '../types';

interface PromiseDefinition<T> {
  resolve: (t: T) => void;
  reject: (e: any) => void;
}

enum State {
  INITIAL,
  WAITING,
  READY,
}

/**
 * Represents a lazy-evaluated value that is computed only when needed.
 * @class Lazy
 * @template T - The type of the value.
 */
export class AsyncLazy<T> {
  /**
   * State indicating the evaluation of the value
   * @private
   */
  private state: State = State.INITIAL;

  /**
   * Promises waiting to be resolved
   * @private
   */
  private promises: PromiseDefinition<T>[] = [];
  /**
   * The computed value, stored after evaluation.
   */
  private value?: T;

  /**
   * Private constructor to create an instance of `Lazy`.
   * @private
   * @constructor
   * @param {AsyncProver<T>} provider - The function representing the lazy provider.
   */
  private constructor(private readonly provider: EventualProvider<T>) {}

  /**
   * Static method to create an instance of `Lazy`.
   * @template T - The type of the value.
   * @param {AsynProvider<T>} provider - The function representing the lazy provider.
   * @returns {Lazy<T>} An instance of Lazy.
   */
  static create<T>(provider: EventualProvider<T>): AsyncLazy<T> {
    return new AsyncLazy<T>(provider);
  }

  /**
   * Maps the computed value to a new value using the provided function.
   * @paramType R - The type of the result after applying the function.
   * @param {Mapper<T,R>} fn - The function to apply to the computed value.
   * @returns {Lazy<R>} A new instance of Lazy with the transformed value.
   */
  map<R>(fn: EventualMapper<T, R>): AsyncLazy<R> {
    return new AsyncLazy<R>(async () => fn(await this.evaluate()));
  }

  /**
   * Evaluates and returns the computed value, calculating it only when necessary.
   * @returns {T} The computed value.
   */
  async evaluate(): Promise<T> {
    switch (this.state) {
      case State.INITIAL: {
        this.state = State.WAITING;
        this.value = await this.provider();
        this.state = State.READY;
        for (;;) {
          const promise = this.promises.shift();
          if (!promise) break;
          promise.resolve(this.value);
        }
        return this.value;
      }
      case State.WAITING: {
        const promise = new Promise<T>((resolve, reject) => {
          this.promises.push({ resolve, reject });
        });
        return promise;
      }
      case State.READY:
        return this.value!;
    }
  }
}

export function asyncLazy<T>(provider: EventualProvider<T>): AsyncLazy<T> {
  return AsyncLazy.create(provider);
}
