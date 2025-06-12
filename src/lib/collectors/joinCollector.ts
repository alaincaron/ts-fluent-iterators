import { Collector } from './collector';

/**
 * A `Collector` that accepts elements of type `A` and returns a `string`
 *
 * @typeParam A The type of the elements being accepted.
 * @example
 * const c = new StringJoiner<string>(', ', '[', ']');
 * c.collect('foo');
 * c.collect('bar');
 * c.collect('baz');
 // c.result : "foobarbaz"
 */
export class JoinCollector<A> implements Collector<A, string> {
  private acc: string;
  private first = true;

  /**
   * @param separator separator between elements.
   * @param prefix prefix of the joined string.
   * @param suffix suffix of the joined string.
   */
  constructor(
    private readonly separator = ',',
    prefix = '',
    private readonly suffix = ''
  ) {
    this.acc = prefix;
  }

  collect(a: A) {
    if (this.first) {
      this.acc = `${this.acc}${a}`;
      this.first = false;
    } else {
      this.acc = `${this.acc}${this.separator}${a}`;
    }
  }

  get result() {
    return `${this.acc}${this.suffix}`;
  }
}

export function joinCollector<A>(separator = ',', prefix = '', suffix = '') {
  return new JoinCollector<A>(separator, prefix, suffix);
}
