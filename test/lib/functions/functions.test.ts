import { expect } from 'chai';
import * as Functions from '../../../src/lib/functions';

describe('Functions', () => {
  const add1 = (a: number) => a + 1;
  const mul2 = (a: number) => 2 * a;
  const add2 = (a: number) => a + 2;

  it('compose should apply the functions in the right order', () => {
    expect(Functions.compose(mul2, add1)(2)).equal(5);
    expect(Functions.compose(add1, mul2)(2)).equal(6);
  });

  it('chain should apply functions in the right order', () => {
    expect(Functions.chain(add1, mul2, add2)(2)).equal(8);
    expect(Functions.chain(mul2, add1, add2)(2)).equal(7);
  });

  it('ifElse should invoke the right clause', () => {
    const f = Functions.ifElse((x: number) => x % 2 === 0, mul2, add1);
    expect(f(2)).equal(4);
    expect(f(1)).equal(2);
  });

  it('tap should return its target', () => {
    let flag = false;
    const f = (_: number) => {
      flag = true;
    };
    expect(Functions.tap(f)(5)).eq(5);
    expect(flag).to.be.true;
  });

  it('curry', () => {
    const f = (a: number, b: number, c: number) => a + b + c;
    expect(Functions.curry(f, 1, 2, 3)()).eq(6);
    expect(Functions.curry(f, 1)(2)(3)).eq(6);
    expect(Functions.curry(f, 1, 2)(3)).eq(6);
  });
});
