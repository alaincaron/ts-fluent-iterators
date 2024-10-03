import { expect } from 'chai';
import { Either, Maybe, None, NoSuchElementException } from '../../../src/lib/monads';
import { mapperError, predicateError, providerError } from '../helpers';

describe('Maybe', () => {
  it('of', () => {
    const a = Maybe.of(2);
    expect(a.get()).equal(2);
    expect(a.getOrElse(() => 5)).equal(2);
    expect(a.getOrThrow()).equal(2);
    expect(a.orElse(() => Maybe.of(5))).equal(a);
    expect(a.isDefined()).to.be.true;
    expect(a.isEmpty()).to.be.false;
  });

  it('ofNullable', () => {
    expect(Maybe.ofNullable(0)).deep.equal(Maybe.of(0));
    expect(Maybe.ofNullable(null)).eq(Maybe.empty());
    expect(Maybe.ofNullable(undefined)).eq(Maybe.empty());
    expect(Maybe.empty()).eq(None);
    expect(None.get()).to.be.undefined;
    expect(Maybe.empty<number>().getOrElse(() => 5)).equal(5);
    expect(() => None.getOrThrow()).to.throw(NoSuchElementException);
    const x = Maybe.of(5);
    expect(Maybe.empty().orElse(() => x)).deep.equal(x);
    expect(None.isDefined()).to.be.false;
    expect(None.isEmpty()).to.be.true;
  });

  it('createIf', () => {
    expect(Maybe.createIf(false, () => 2)).equal(None);
    expect(Maybe.createIf(true, () => null)).equal(None);
    expect(Maybe.createIf(true, () => 2)).deep.equal(Maybe.of(2));
  });

  it('createUnless', () => {
    expect(Maybe.createUnless(true, () => 2)).equal(None);
    expect(Maybe.createUnless(false, () => null)).equal(None);
    expect(Maybe.createUnless(false, () => 2)).deep.equal(Maybe.of(2));
  });

  it('fold', () => {
    expect(Maybe.of(1).fold(providerError<number>(), it => it + 1)).equal(2);
    expect(None.fold(() => 2, mapperError<unknown, number>())).equal(2);
  });

  it('contains', () => {
    expect(Maybe.of(1).contains(1)).to.be.true;
    expect(Maybe.of(1).contains(2)).to.be.false;
    expect(None.contains(1)).to.be.false;
  });

  it('exists', () => {
    const isEven = (x: number) => x % 2 === 0;
    expect(Maybe.of(1).exists(isEven)).to.be.false;
    expect(Maybe.of(4).exists(isEven)).to.be.true;
    expect(None.exists(isEven)).to.be.false;
  });

  it('forEach', () => {
    let count = 0;
    const f = (_: number) => {
      ++count;
    };

    Maybe.of(1).forEach(f);
    expect(count).equal(1);

    None.forEach(f);
    expect(count).equal(1);
  });

  it('all', () => {
    const isEven = (x: number) => x % 2 === 0;
    expect(Maybe.of(1).all(isEven)).to.be.false;
    expect(Maybe.of(4).all(isEven)).to.be.true;
    expect(None.all(isEven)).to.be.true;
  });

  it('map', () => {
    const mul2 = (x: number) => x * 2;
    expect(Maybe.of(1).map(mul2)).to.deep.equal(Maybe.of(2));
    expect(None.map(mul2)).equal(None);
  });

  it('toIterator', () => {
    expect(Maybe.of(1).toIterator().collect()).to.deep.equal([1]);
    expect(None.toIterator().collect()).to.deep.equal([]);
  });

  it('filter', () => {
    const isEven = (x: number) => x % 2 === 0;
    expect(Maybe.of(1).filter(isEven)).to.equal(None);
    expect(Maybe.of(4).filter(isEven)).to.deep.equal(Maybe.of(4));
    expect(None.filter(predicateError())).equal(None);
  });

  it('flatMap', () => {
    const mul2 = (x: number) => Maybe.of(x * 2);
    expect(Maybe.of(1).flatMap(mul2)).to.deep.equal(Maybe.of(2));
    expect(None.flatMap(mul2)).equal(None);
  });

  it('onSome', () => {
    let count = 0;
    const f = () => {
      ++count;
    };

    Maybe.of(1).onSome(f);
    expect(count).equal(1);

    None.onSome(f);
    expect(count).equal(1);
  });

  it('onNone', () => {
    let count = 0;
    const f = () => {
      ++count;
    };

    Maybe.of(1).onNone(f);
    expect(count).equal(0);

    None.onNone(f);
    expect(count).equal(1);
  });

  it('toEither', () => {
    expect(Maybe.of(1).toEither(() => 5)).deep.equal(Either.right(1));
    expect(None.toEither(() => 5)).deep.equal(Either.left(5));
  });

  it('toString', () => {
    expect(Maybe.of(1).toString()).equal('Some(1)');
    expect(None.toString()).deep.equal('None');
  });
});
