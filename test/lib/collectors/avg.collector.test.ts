import { expect } from 'chai';
import { AvgCollector } from '../../../src/lib/collectors';

describe('AvgCollector', () => {
  describe('collect', () => {
    it('should compute average', () => {
      const collector = new AvgCollector();
      collector.collect(3);
      collector.collect(3);
      collector.collect(6);
      expect(collector.result).equal(4);
    });
    it('should return 0 if no sample', () => {
      const collector = new AvgCollector();
      expect(collector.result).equal(0);
    });
  });
});
