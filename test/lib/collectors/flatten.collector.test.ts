import { expect } from 'chai';
import { flattenCollector } from '../../../src/lib/collectors';

describe('FlattenCollector', () => {
  describe('collect', () => {
    it('should return list of numbers', () => {
      const collector = flattenCollector();
      collector.collect([1, 2]);
      collector.collect([3, 4, 2]);
      collector.collect([1]);
      expect(collector.result.collect()).deep.equal([1, 2, 3, 4, 2, 1]);
    });
  });
});
