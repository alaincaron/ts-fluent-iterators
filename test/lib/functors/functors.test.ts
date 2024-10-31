import { expect } from 'chai';
import { Functor } from '../../../src/lib/functors';

describe('Functor', () => {
  const add1 = (a: number) => a + 1;
  const functor = Functor.from(add1);
  const mul2 = (a: number) => 2 * a;

  it('returns the wrapped function', () => {
    expect(functor.f).eq(add1);
  });
  it('evaluates the function', () => {
    expect(functor.eval(2)).equal(3);
  });
  it('andThen should apply the after functor', () => {
    expect(functor.andThen(mul2).eval(2)).equal(6);
  });
  it('compose should apply the before functor', () => {
    expect(functor.compose(mul2).eval(2)).equal(5);
  });

  it('identity functor should return its argument', () => {
    const f = Functor.identity<number>();
    expect(f.eval(1)).equal(1);
  });
});
