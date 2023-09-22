import { range, repeat, repeatWhile, doWhile, promiseIterator as iterator } from '../../../src/lib/promise';

import { expect } from 'chai';

describe('PromiseGenerators', () => {
  describe('range', () => {
    it('should yield all elements in the range', async () => {
      expect(await iterator(range(1, 5)).collect()).to.deep.equal([1, 2, 3, 4]);
    });

    it('should yield elements according to step', async () => {
      expect(await iterator(range(1, 5, 2)).collect()).to.deep.equal([1, 3]);
    });

    it('should yield no element if end equals start', async () => {
      expect(await iterator(range(1, 1)).collect()).to.deep.equal([]);
    });

    it('should yield in decreasing order if negative step', async () => {
      expect(await iterator(range(5, 0)).collect()).to.deep.equal([5, 4, 3, 2, 1]);
    });

    describe('repeat', () => {
      it('should yield the exact number of items', async () => {
        let i = 1;
        expect(await iterator(repeat(_ => i++, 5)).collect()).deep.equal([1, 2, 3, 4, 5]);
        expect(i).equal(6);
      });
    });

    describe('repeat', () => {
      it('should yield the exact number of items', async () => {
        expect(await iterator(repeat(i => i + 1, 5)).collect()).deep.equal([1, 2, 3, 4, 5]);
      });
    });

    describe('repeatWhile', () => {
      it('should yield the exact number of items', async () => {
        expect(
          await iterator(
            repeatWhile(
              i => i + 1,
              0,
              i => i < 5
            )
          ).collect()
        ).deep.equal([1, 2, 3, 4, 5]);
      });

      it('should not yield anything if predicate is false', async () => {
        expect(
          await iterator(
            repeatWhile(
              i => i + 1,
              0,
              i => i < 0
            )
          ).collect()
        ).deep.equal([]);
      });
    });

    describe('doWhile', () => {
      it('should yield the exact number of items', async () => {
        expect(
          await iterator(
            doWhile(
              i => i + 1,
              0,
              i => i < 5
            )
          ).collect()
        ).deep.equal([1, 2, 3, 4, 5]);
      });
      it('should yield 1 item if predicate is false', async () => {
        expect(
          await iterator(
            doWhile(
              i => i + 1,
              0,
              i => i < 0
            )
          ).collect()
        ).deep.equal([1]);
      });
    });
  });
});
