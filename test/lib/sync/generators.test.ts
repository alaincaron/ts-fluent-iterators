import { iterate, range, repeatedly, iterator } from '../../../src/lib/sync';
import { expect } from 'chai';

describe('Generators', () => {
  describe('range', () => {
    it('should yield all elements in the range', () => {
      expect(iterator(range(1, 5)).collect()).deep.equal([1, 2, 3, 4]);
    });

    it('should yield elements according to step', () => {
      expect(iterator(range(1, 5, 2)).collect()).deep.equal([1, 3]);
    });

    it('should yield no element if end equals start', () => {
      expect(iterator(range(1, 1)).collect()).deep.equal([]);
    });

    it('should yield in decreasing order if negative step', () => {
      expect(iterator(range(5, 0)).collect()).deep.equal([5, 4, 3, 2, 1]);
    });
  });

  describe('repeatedly', () => {
    it('should yield the exact number of items', () => {
      let i = 1;
      expect(iterator(repeatedly(() => i++, 5)).collect()).deep.equal([1, 2, 3, 4, 5]);
      expect(i).equal(6);
    });
  });

  describe('iterate', () => {
    it('should yield powers of 2', () => {
      expect(iterator(iterate(x => 2 * x, 1, 5)).collect()).deep.equal([1, 2, 4, 8, 16]);
    });
  });
});
