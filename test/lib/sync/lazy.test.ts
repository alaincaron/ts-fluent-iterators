import { expect } from 'chai';
import { Either, Failure, Maybe, None, Try } from '../../../src/lib/monads';
import { lazy } from '../../../src/lib/sync/lazy';
import { providerError } from '../helpers';

describe('Lazy', () => {
  it('it should invoke the provider only once', () => {
    let count = 0;
    const provider = () => ++count;
    const v = lazy(provider);
    expect(v.evaluated()).to.be.false;
    expect(v.value()).equal(1);
    expect(v.evaluated()).to.be.true;
    expect(v.value()).equal(1);
    expect(count).equal(1);
  });

  it('it should apply the mapping', () => {
    const v = lazy(() => 2);
    const v2 = v.map(x => x + 1);
    expect(v2.evaluated()).to.be.false;
    expect(v2.value()).equal(3);
  });

  it('should handle flatMap', () => {
    const v = lazy(() => 2);
    const v2 = v.flatMap(x => lazy(() => x + 5));
    expect(v.evaluated()).to.be.false;
    expect(v2.evaluated()).to.be.false;
    expect(v2.value()).equal(7);
  });

  it('should handle errors correctly', () => {
    const e = new Error();
    const v = lazy<number>(providerError(e));
    expect(v.evaluated()).to.be.false;
    expect(() => v.value()).to.throw(e);
    expect(() => v.map(x => x + 2).value()).to.throw(e);
    expect(() => v.flatMap(x => lazy(() => x + 2)).value()).to.throw(e);
    expect(v.toTry()).to.deep.equal(new Failure(e));
    expect(v.toEither()).to.deep.equal(Either.left(e));
    expect(v.toMaybe()).equal(None);
  });

  it('should convert to Monads correctly', () => {
    const v = lazy(() => 2);
    expect(v.toTry()).to.deep.equal(Try.create(() => 2));
    expect(v.toEither()).to.deep.equal(Either.right(2));
    expect(v.toMaybe()).to.deep.equal(Maybe.of(2));
  });
});
