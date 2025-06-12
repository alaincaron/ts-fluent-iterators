import { expect } from 'chai';
import { statsCollector } from '../../../src/lib/collectors';

describe('StatsCollector', () => {
  describe('collect', () => {
    it('should compute average', () => {
      const collector = statsCollector();
      collector.collect(3);
      collector.collect(3);
      collector.collect(6);
      expect(collector.result).deep.equal({
        count: 3,
        mean: 4,
        minValue: 3,
        maxValue: 6,
        variance: 3,
      });
    });
    it('should return default statis if no sample', () => {
      const collector = statsCollector();
      expect(collector.result).deep.equal({
        count: 0,
        mean: 0,
        minValue: Infinity,
        maxValue: -Infinity,
        variance: NaN,
      });
    });
  });
});
