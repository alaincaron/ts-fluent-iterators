import { expect } from 'chai';
import { Comparators } from '../../../src';
import { Ordering } from '../../../src/lib/functors';

describe('Ordering', () => {
  interface Pair {
    a: number;
    b: number;
  }

  function verifyPairOrdering(ordering: Ordering<Pair>) {
    const p = [
      { a: 0, b: 0 },
      { a: 0, b: 1 },
      { a: 1, b: 0 },
      { a: 1, b: 1 },
    ];
    for (let i = 0; i < p.length; ++i) {
      for (let j = 0; j < p.length; ++j) {
        const cmp = ordering.compare(p[i], p[j]);
        const msg = `i = ${i}, j = ${j}, cmp = ${cmp}`;
        if (i === j) {
          expect(cmp).equal(0, msg);
        } else if (i < j) {
          expect(cmp).to.be.lessThan(0, msg);
        } else {
          expect(cmp).to.be.greaterThan(0, msg);
        }
      }
    }
  }

  it('natural', () => {
    const ordering = Ordering.natural();
    expect(ordering.compare(1, 2)).to.be.lessThan(0);
    expect(ordering.compare(2, 2)).equal(0);
    expect(ordering.compare(2, 1)).to.be.greaterThan(0);
    expect(ordering.comparator).equal(Comparators.natural);
  });

  it('reverse', () => {
    const ordering = Ordering.natural().reverse();
    expect(ordering.compare(1, 2)).to.be.greaterThan(0);
    expect(ordering.compare(2, 2)).equal(0);
    expect(ordering.compare(2, 1)).to.be.lessThan(0);
  });

  it('compound', () => {
    const ordering = Ordering.from<Pair>(Comparators.byAttr('a')).compound(Comparators.byAttr('b'));
    verifyPairOrdering(ordering);
  });

  it('onResultOf', () => {
    const ordering = Ordering.natural().onResultOf<string>(s => s.length);
    expect(ordering.compare('', 'a')).to.be.lessThan(0);
    expect(ordering.compare('b', 'a')).equal(0);
    expect(ordering.compare('a', '')).to.be.greaterThan(0);
  });

  it('fromMany', () => {
    const ordering = Ordering.fromMany<Pair>(Comparators.byAttr('a'), Comparators.byAttr('b'));
    verifyPairOrdering(ordering);
  });

  it('chain', () => {
    const ordering = Ordering.chain<Pair>([Comparators.byAttr('a'), Comparators.byAttr('b')]);
    verifyPairOrdering(ordering);
  });

  it('nullsFirst', () => {
    const ordering = Ordering.natural().nullsFirst();
    expect(ordering.compare(null, 1)).to.be.lessThan(0);
    expect(ordering.compare(undefined, 1)).to.be.lessThan(0);
    expect(ordering.compare(1, null)).to.be.greaterThan(0);
    expect(ordering.compare(1, undefined)).to.be.greaterThan(0);
    expect(ordering.compare(null, undefined)).equal(0);
    expect(ordering.compare(undefined, null)).equal(0);
    expect(ordering.compare(1, 1)).equal(0);
    expect(ordering.compare(1, 2)).to.be.lessThan(0);
  });

  it('nullsLast', () => {
    const ordering = Ordering.natural().nullsLast();
    expect(ordering.compare(null, 1)).to.be.greaterThan(0);
    expect(ordering.compare(undefined, 1)).to.be.greaterThan(0);
    expect(ordering.compare(1, null)).to.be.lessThan(0);
    expect(ordering.compare(1, undefined)).to.be.lessThan(0);
    expect(ordering.compare(null, undefined)).equal(0);
    expect(ordering.compare(undefined, null)).equal(0);
    expect(ordering.compare(1, 1)).equal(0);
    expect(ordering.compare(1, 2)).to.be.lessThan(0);
  });

  it('isOrdered', () => {
    const ordering = Ordering.natural();
    expect(ordering.isOrdered([1, 2, 2, 3, 3])).to.be.true;
    expect(ordering.isOrdered([1, 2, 2, 3, 4, 3])).to.be.false;
    expect(ordering.isOrdered([])).to.be.true;
    expect(ordering.isOrdered([1])).to.be.true;
  });

  it('isStrictlyOrdered', () => {
    const ordering = Ordering.natural();
    expect(ordering.isStrictlyOrdered([1, 2, 2, 3, 3])).to.be.false;
    expect(ordering.isStrictlyOrdered([1, 2, 3, 4, 3])).to.be.false;
    expect(ordering.isStrictlyOrdered([1, 2, 3, 4])).to.be.true;
    expect(ordering.isStrictlyOrdered([])).to.be.true;
    expect(ordering.isStrictlyOrdered([1])).to.be.true;
  });

  it('lexicographical', () => {
    const ordering = Ordering.natural().lexicographical();
    expect(ordering.compare([1, 2], [1, 2])).equal(0);
    expect(ordering.compare([1, 2], [1, 3])).to.be.lessThan(0);
    expect(ordering.compare([1, 3], [1, 2])).to.be.greaterThan(0);
    expect(ordering.compare([1, 2], [1, 2, 3])).to.be.lessThan(0);
    expect(ordering.compare([1, 2, 3], [1, 2])).to.be.greaterThan(0);
  });

  it('max', () => {
    const ordering = Ordering.natural();
    expect(ordering.max(1, 2)).equal(2);
    expect(ordering.max(2, 1)).equal(2);
    expect(ordering.max(1, 2, 5, 4, 3)).equal(5);
    expect(ordering.max(2, 1, 5, 4, 3)).equal(5);
  });

  it('min', () => {
    const ordering = Ordering.natural().reverse();
    expect(ordering.min(1, 2)).equal(2);
    expect(ordering.min(2, 1)).equal(2);
    expect(ordering.min(1, 2, 5, 4, 3)).equal(5);
    expect(ordering.min(2, 1, 5, 4, 3)).equal(5);
  });

  it('maxIter', () => {
    const ordering = Ordering.natural();
    expect(ordering.maxIter([1, 2])).equal(2);
    expect(ordering.maxIter([2, 1])).equal(2);
    expect(ordering.maxIter([1, 2, 5, 4, 3])).equal(5);
    expect(ordering.maxIter([2, 1, 5, 4, 3])).equal(5);
    expect(ordering.maxIter([])).to.be.undefined;
  });

  it('minIter', () => {
    const ordering = Ordering.natural().reverse();
    expect(ordering.minIter([1, 2])).equal(2);
    expect(ordering.minIter([2, 1])).equal(2);
    expect(ordering.minIter([1, 2, 5, 4, 3])).equal(5);
    expect(ordering.minIter([2, 1, 5, 4, 3])).equal(5);
    expect(ordering.minIter([])).to.be.undefined;
  });
});
