import { expect } from 'chai';
import { BooleanFunctor, Functor } from '../../../src/lib/functors';

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

describe('BooleanFunctor', () => {
  const isEven = (a: number) => a % 2 === 0;
  const functor = BooleanFunctor.fromPredicate(isEven);

  it('returns the wrapped function', () => {
    expect(functor.f).equal(isEven);
    expect(functor.predicate);
  });

  it('evaluates the predicate', () => {
    expect(functor.eval(2)).to.be.true;
    expect(functor.eval(3)).to.be.false;
  });

  it('negates the predicate', () => {
    const functor1 = functor.negate();
    expect(functor1.eval(2)).to.be.false;
    expect(functor1.eval(3)).to.be.true;
  });

  it('builds an or predicate', () => {
    const functor1 = functor.or((x: number) => x >= 5);
    expect(functor1.eval(2)).to.be.true;
    expect(functor1.eval(3)).to.be.false;
    expect(functor1.eval(5)).to.be.true;
    expect(functor1.eval(6)).to.be.true;
  });

  it('builds an and predicate', () => {
    const functor1 = functor.and((x: number) => x >= 5);
    expect(functor1.eval(2)).to.be.false;
    expect(functor1.eval(3)).to.be.false;
    expect(functor1.eval(5)).to.be.false;
    expect(functor1.eval(6)).to.be.true;
  });

  it('builds a nor predicate', () => {
    const functor1 = functor.nor((x: number) => x >= 5);
    expect(functor1.eval(2)).to.be.false;
    expect(functor1.eval(3)).to.be.true;
    expect(functor1.eval(5)).to.be.false;
    expect(functor1.eval(6)).to.be.false;
  });

  it('builds a nand predicate', () => {
    const functor1 = functor.nand((x: number) => x >= 5);
    expect(functor1.eval(2)).to.be.true;
    expect(functor1.eval(3)).to.be.true;
    expect(functor1.eval(5)).to.be.true;
    expect(functor1.eval(6)).to.be.false;
  });

  it('builds a xor predicate', () => {
    const functor1 = functor.xor((x: number) => x >= 5);
    expect(functor1.eval(2)).to.be.true;
    expect(functor1.eval(3)).to.be.false;
    expect(functor1.eval(5)).to.be.true;
    expect(functor1.eval(6)).to.be.false;
  });

  it('builds a xnor predicate', () => {
    const functor1 = functor.xnor((x: number) => x >= 5);
    expect(functor1.eval(2)).to.be.false;
    expect(functor1.eval(3)).to.be.true;
    expect(functor1.eval(5)).to.be.false;
    expect(functor1.eval(6)).to.be.true;
  });
});
