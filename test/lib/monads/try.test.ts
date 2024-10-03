import { expect } from 'chai';
import { alwaysFalse, alwaysTrue } from '../../../src/lib/functions';
import { Either, Failure, Maybe, None, Success, Try } from '../../../src/lib/monads';
import { mapperError, providerError } from '../helpers';

describe('Try', () => {
  it('it should return value on success', () => {
    const a = Try.create(() => 2);
    expect(a.isSuccess).to.be.true;
    expect(a.isFailure).to.be.false;
    expect(a).to.deep.equal(new Success(2));
    expect(a.get()).equal(2);
    expect(a.getOrThrow()).equal(2);
    expect(a.getOrElse(providerError<number>())).equal(2);
    expect(a.orElse(() => Try.create(providerError<number>()))).deep.equal(new Success(2));
  });

  it('it should handle errors', () => {
    const e = new Error();
    const a = Try.create<number>(providerError(e));
    expect(a.isSuccess).to.be.false;
    expect(a.isFailure).to.be.true;
    expect(() => a.getOrThrow()).to.throw(e);
    expect(a.get()).to.be.undefined;
    expect(a.getOrElse(() => 2)).equal(2);
    expect(a.orElse(() => Try.create(() => 2))).deep.equal(new Success(2));
  });

  it('map should applier mapper', () => {
    const t1 = new Success(2);
    const f = (x: number) => 2 * x + 1;
    expect(t1.map(f)).to.deep.equal(new Success(5));
    const e = new Error();
    const t2 = t1.map(mapperError<number, number>(e));
    expect(t2).to.deep.equal(new Failure(e));
    expect(t2.map(f)).equal(t2);
    expect(t2.map(mapperError())).equal(t2);
  });

  it('flatMap', () => {
    const t1 = Try.create(() => 2);
    const f = (x: number) => Try.create(() => 2 * x + 1);
    expect(t1.flatMap(f)).to.deep.equal(new Success(5));
    const e = new Error();
    const t2 = t1.flatMap(mapperError<number, Try<number>>(e));
    expect(t2).to.deep.equal(new Failure(e));
    expect(t2.flatMap(f)).equal(t2);
    expect(t2.flatMap(mapperError<number, Try<number>>())).equal(t2);
  });

  it('toEither', () => {
    expect(Try.create(() => 2).toEither()).deep.equal(Either.right(2));
    const e = new Error();
    expect(Try.create(providerError(e)).toEither()).deep.equal(Either.left(e));
  });

  it('toMaybe', () => {
    expect(Try.create(() => 2).toMaybe()).deep.equal(Maybe.of(2));
    expect(Try.create(providerError()).toMaybe()).equal(Maybe.empty());
  });

  it('fold', () => {
    const e = new Error();
    const s = (x: number) => {
      if (x > 0) return 2 * x + 1;
      throw e;
    };

    const f = (x: unknown) => {
      if (x === e) return 0;
      throw x;
    };

    expect(Try.create(() => 2).fold(s, f)).equal(5);
    expect(() => Try.create(() => -1).fold(s, f)).to.throw(e);

    const e1 = new Error();
    expect(Try.create(providerError<number>(e)).fold(s, f)).equal(0);
    expect(() => Try.create(providerError<number>(e1)).fold(s, f)).to.throw(e1);
  });

  it('transform', () => {
    const e = new Error();
    const s = (x: number) =>
      Try.create(() => {
        if (x > 0) return 2 * x + 1;
        throw e;
      });

    const f = (x: unknown) =>
      Try.create(() => {
        if (x === e) return 0;
        throw x;
      });

    expect(Try.create(() => 2).transform(s, f)).to.deep.equal(new Success(5));
    expect(Try.create(() => -1).fold(s, f)).deep.equal(new Failure(e));

    const e1 = new Error();
    expect(Try.create(providerError<number>(e)).transform(s, f)).to.deep.equal(new Success(0));
    expect(Try.create(providerError<number>(e1)).transform(s, f)).to.deep.equal(new Failure(e1));
  });

  it('filter', () => {
    const e = new Error();
    const predicate = (x: number) => {
      if (x < 0) throw e;
      return x % 2 === 0;
    };
    expect(new Success(2).filter(predicate)).deep.equal(Maybe.of(2));
    expect(new Success(3).filter(predicate)).equal(None);
    expect(() => new Success(-1).filter(predicate)).to.throw(e);
    expect(Try.create(providerError<number>()).filter(predicate)).equal(None);
  });

  it('recover', () => {
    const t = new Success(2);
    expect(t.recover(mapperError<unknown, number>())).equal(t);
    expect(Try.create(providerError<number>()).recover(() => 5)).deep.equal(new Success(5));
    const e = new Error();
    expect(Try.create(providerError<number>()).recover(mapperError<unknown, number>(e))).deep.equal(new Failure(e));
  });

  it('flatRecover', () => {
    const t = new Success(2);
    expect(t.flatRecover(mapperError<unknown, Try<number>>())).equal(t);
    const recoverValue = new Success(5);
    expect(Try.create(providerError<number>()).flatRecover(() => recoverValue)).equal(recoverValue);
    const e = new Error();
    expect(Try.create(providerError<number>()).flatRecover(mapperError<unknown, Try<number>>(e))).deep.equal(
      new Failure(e)
    );
  });

  it('exists', () => {
    const isEven = (x: number) => x % 2 === 0;
    expect(new Success(2).exists(isEven)).to.be.true;
    expect(new Success(3).exists(isEven)).to.be.false;
    expect(Try.create(providerError<number>()).exists(alwaysTrue)).to.be.false;
  });

  it('forEach', () => {
    let count = 0;
    let sum = 0;
    const f = (x: number) => {
      ++count;
      sum += x;
    };

    new Success(2).forEach(f);
    expect(count).equal(1);
    expect(sum).equal(2);

    (new Failure('foo') as Try<number>).forEach(f);
    expect(count).equal(1);
    expect(sum).equal(2);
  });

  it('all', () => {
    const isEven = (x: number) => x % 2 === 0;
    expect(new Success(2).all(isEven)).to.be.true;
    expect(new Success(3).all(isEven)).to.be.false;
    expect(Try.create(providerError<number>()).all(alwaysFalse)).to.be.true;
  });

  it('toIterator', () => {
    expect(new Success(2).toIterator().collect()).deep.equal([2]);
    expect(new Failure('foo').toIterator().collect()).deep.equal([]);
  });
});
