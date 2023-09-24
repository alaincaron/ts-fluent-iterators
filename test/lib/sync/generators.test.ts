import { range, repeat, iterator, loop } from '../../../src/lib/sync';
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

  describe('loop', () => {
    it('should yield the exact number of items', () => {
      expect(iterator(loop(i => i + 1, 0, 5, 2)).collect()).deep.equal([1, 3, 5]);
    });
    it('should yield powers of 2', () => {
      expect(iterator(loop(x => 2 ** x, 0, 5, 1)).collect()).deep.equal([1, 2, 4, 8, 16]);
    });
  });

  describe('repeat', () => {
    it('should yield the exact number of items', () => {
      expect(iterator(repeat(i => i + 1, 5)).collect()).deep.equal([1, 2, 3, 4, 5]);
    });
    it('should yield powers of 2', () => {
      expect(iterator(repeat(x => 2 ** x, 5)).collect()).deep.equal([1, 2, 4, 8, 16]);
    });
  });
});
