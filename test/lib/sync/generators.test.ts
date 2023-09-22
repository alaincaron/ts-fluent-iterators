import { range, repeat, repeatWhile, doWhile, iterator } from '../../../src/lib/sync';
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

  describe('repeat', () => {
    it('should yield the exact number of items', () => {
      let i = 1;
      expect(iterator(repeat(_ => i++, 5)).collect()).deep.equal([1, 2, 3, 4, 5]);
      expect(i).equal(6);
    });
    it('should yield powers of 2', () => {
      expect(iterator(repeat(x => 2 ** x, 5)).collect()).deep.equal([1, 2, 4, 8, 16]);
    });
  });

  describe('repeat', () => {
    it('should yield the exact number of items', () => {
      let i = 1;
      expect(iterator(repeat(_ => i++, 5)).collect()).deep.equal([1, 2, 3, 4, 5]);
      expect(i).equal(6);
    });
  });

  describe('repeat', () => {
    it('should yield the exact number of items', () => {
      expect(iterator(repeat(i => i + 1, 5)).collect()).deep.equal([1, 2, 3, 4, 5]);
    });
  });

  describe('repeatWhile', () => {
    it('should yield the exact number of items', () => {
      expect(
        iterator(
          repeatWhile(
            i => i + 1,
            0,
            i => i < 5
          )
        ).collect()
      ).deep.equal([1, 2, 3, 4, 5]);
    });

    it('should not yield anything if predicate is false', () => {
      expect(
        iterator(
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
    it('should yield the exact number of items', () => {
      expect(
        iterator(
          doWhile(
            i => i + 1,
            0,
            i => i < 5
          )
        ).collect()
      ).deep.equal([1, 2, 3, 4, 5]);
    });
    it('should yield 1 item if predicate is false', () => {
      expect(
        iterator(
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
