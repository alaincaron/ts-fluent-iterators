import { expect } from 'chai';
import { match, matcher } from '../../../src/lib/match';

describe('Match', () => {
  it('match should invoke the right clause', () => {
    const x = match(25)
      .when(
        x => x % 2 === 0,
        x => x + 1
      )
      .when(
        x => x % 3 === 0,
        x => x + 2
      )
      .is(25, x => x + 2)
      .default(_ => 0)
      .evaluate();

    expect(x).equal(27);
  });

  it('matcher should return a function behaving like match', () => {
    const f = matcher<number, number>()
      .when(
        x => x % 2 === 0,
        x => x + 1
      )
      .when(
        x => x % 3 === 0,
        x => x + 2
      )
      .is(25, _ => 27)
      .default(_ => 0)
      .build();

    expect(f(6)).equal(7);
    expect(f(9)).equal(11);
    expect(f(17)).equal(0);
    expect(f(25)).equal(27);
  });

  it('matcher should match by classes', () => {
    const XYZ = class {};

    const f = matcher<unknown, number>()
      .is(XYZ, _ => 1)
      .is(null, _ => 2)
      .is(undefined, _ => 3)
      .is(false, _ => 4)
      .is(true, _ => 5)
      .is('foobar', _ => 6)
      .default(_ => 7)
      .build();

    expect(f(new XYZ())).equal(1);
    expect(f(null)).equal(2);
    expect(f(undefined)).equal(3);
    expect(f(false)).equal(4);
    expect(f(true)).equal(5);
    expect(f('foobar')).equal(6);
    expect(f(0)).equal(7);
    expect(f('bar')).equal(7);
  });
});
