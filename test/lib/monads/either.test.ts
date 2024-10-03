import { expect } from 'chai';
import { Either, Maybe, None, NoSuchElementException, Right } from '../../../src/lib/monads';
import { mapperError, predicateError, reducerError } from '../helpers';

describe('Either', () => {
  it('right', () => {
    const a = Either.right(2);
    expect(a.get()).equal(2);
    expect(a.getOrElse(() => 5)).equal(2);
    expect(a.getOrThrow()).equal(2);
    expect(a.orElse(() => Either.right(5))).equal(a);
    expect(a.isLeft()).to.be.false;
    expect(a.isRight()).to.be.true;
  });

  it('left', () => {
    const a: Either<number, string> = Either.left(2);
    expect(a.get()).to.be.undefined;
    expect(a.getOrElse(() => 'foobar')).equal('foobar');
    expect(() => a.getOrThrow()).to.throw(NoSuchElementException);
    expect(a.orElse(() => Either.right('foobar'))).deep.equal(new Right('foobar'));
    expect(a.isLeft()).to.be.true;
    expect(a.isRight()).to.be.false;
  });

  it('fold', () => {
    expect(Either.right(1).fold(mapperError<unknown, number>(), it => it + 1)).equal(2);
    expect(Either.left(1).fold(it => it + 1, mapperError<unknown, number>())).equal(2);
  });

  it('contains', () => {
    expect(Either.right(1).contains(1)).to.be.true;
    expect(Either.right(1).contains(2)).to.be.false;
    expect(Either.left<string, number>('foo').contains(1)).to.be.false;
  });

  it('exists', () => {
    const isEven = (x: number) => x % 2 === 0;
    expect(Either.right(1).exists(isEven)).to.be.false;
    expect(Either.right(4).exists(isEven)).to.be.true;
    expect(Either.left<string, number>('foo').exists(isEven)).to.be.false;
  });

  it('forEach', () => {
    let count = 0;
    const f = (_: number) => {
      ++count;
    };

    Either.right(1).forEach(f);
    expect(count).equal(1);

    Either.left<string, number>('foo').forEach(f);
    expect(count).equal(1);
  });

  it('all', () => {
    const isEven = (x: number) => x % 2 === 0;
    expect(Either.right(1).all(isEven)).to.be.false;
    expect(Either.right(4).all(isEven)).to.be.true;
    expect(Either.left<string, number>('foo').all(isEven)).to.be.true;
  });

  it('map', () => {
    const mul2 = (x: number) => x * 2;
    expect(Either.right(1).map(mul2)).to.deep.equal(Either.right(2));

    const left = Either.left<string, number>('foo');
    expect(left.map(mul2)).equal(left);
  });

  it('swap', () => {
    expect(Either.right(1).swap()).to.deep.equal(Either.left(1));
    expect(Either.left(1).swap()).to.deep.equal(Either.right(1));
  });

  it('onLeft', () => {
    let count = 0;
    const f = (_: number) => {
      ++count;
    };

    const r = Either.right<number, number>(1);
    expect(r.onLeft(f)).to.equal(r);
    expect(count).equal(0);

    const l = Either.left<number, number>(1);
    expect(l.onLeft(f)).to.equal(l);
    expect(count).equal(1);
  });

  it('onRight', () => {
    let count = 0;
    const f = (_: number) => {
      ++count;
    };

    const r = Either.right<number, number>(1);
    expect(r.onRight(f)).to.equal(r);
    expect(count).equal(1);

    const l = Either.left<number, number>(1);
    expect(l.onRight(f)).to.equal(l);
    expect(count).equal(1);
  });

  it('foldLeft', () => {
    expect(Either.right(2).foldLeft(1, (x, y) => x + y)).equal(3);
    expect(Either.left<string, number>('foobar').foldLeft(1, reducerError())).equal(1);
  });

  it('mapLeft', () => {
    const strlen = (x: string) => x.length;

    const r = Either.right(1);
    expect(r.mapLeft(mapperError())).eq(r);

    expect(Either.left('foobar').mapLeft(strlen)).deep.equal(Either.left(6));
  });

  it('toIterator', () => {
    expect(Either.right(1).toIterator().collect()).to.deep.equal([1]);
    expect(Either.left(1).toIterator().collect()).to.deep.equal([]);
  });

  it('toMaybe', () => {
    expect(Either.right(1).toMaybe()).to.deep.equal(Maybe.of(1));
    expect(Either.left(1).toMaybe()).to.equal(Maybe.empty());
  });

  it('filter', () => {
    const isEven = (x: number) => x % 2 === 0;
    expect(Either.right(1).filter(isEven)).to.equal(None);
    expect(Either.right(4).filter(isEven)).to.deep.equal(Maybe.of(4));
    expect(Either.left<string, number>('foo').filter(predicateError())).equal(None);
  });

  it('flatMap', () => {
    const mul2 = (x: number) => Either.right<string, number>(x * 2);

    expect(Either.right(1).flatMap(mul2)).to.deep.equal(Either.right(2));

    const left = Either.left<string, number>('foo');
    expect(left.flatMap(mul2)).equal(left);
  });

  it('flatMapLeft', () => {
    const strlen = (x: string) => Either.right<string, number>(x.length);

    const r = Either.right<string, number>(1);
    expect(r.flatMapLeft(strlen)).eq(r);

    expect(Either.left('foobar').flatMapLeft(strlen)).deep.equal(Either.right(6));
  });
});
