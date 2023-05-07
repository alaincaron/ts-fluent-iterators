import { range, repeatedly, iterate, asyncIterator as iterator } from '../../../src/lib/async';
import { expect } from 'chai';

describe('AsyncGenerators', () => {
  describe('range', () => {
    it('should yield all elements in the range', async () => {
      expect(await iterator(range(1, 5)).collect()).deep.equal([1, 2, 3, 4]);
    });

    it('should yield elements according to step', async () => {
      expect(await iterator(range(1, 5, 2)).collect()).deep.equal([1, 3]);
    });

    it('should yield no element if end equals start', async () => {
      expect(await iterator(range(1, 1)).collect()).deep.equal([]);
    });

    it('should yield in decreasing order if negative step', async () => {
      expect(await iterator(range(5, 0)).collect()).deep.equal([5, 4, 3, 2, 1]);
    });
  });

  describe('repeatedly', () => {
    it('should yield the exact number of items', async () => {
      let i = 1;
      expect(await iterator(repeatedly(() => i++, 5)).collect()).deep.equal([1, 2, 3, 4, 5]);
      expect(i).equal(6);
    });
  });

  describe('iterate', () => {
    it('should yield powers of 2', async () => {
      expect(await iterator(iterate(x => 2 * x, 1, 5)).collect()).deep.equal([1, 2, 4, 8, 16]);
    });
  });
});
