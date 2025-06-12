import { expect } from 'chai';
import { forkingCollector, maxCollector, minCollector, sumCollector } from '../../../src/lib/collectors';

describe('ForkinCollector', () => {
  describe('collect', () => {
    it('should compute min, max ans sum', () => {
      const collector = forkingCollector(minCollector(), maxCollector(), sumCollector());
      collector.collect(3);
      collector.collect(6);
      collector.collect(5);
      expect(collector.result).deep.equal([3, 6, 14]);
    });
    it('should return initial values if no samples', () => {
      const collector = forkingCollector(minCollector(), maxCollector(), sumCollector());
      expect(collector.result).deep.equal([undefined, undefined, 0]);
    });

    it('should return an empty array if no collectors', () => {
      const collector = forkingCollector();
      collector.collect(3);
      expect(collector.result).deep.equal([]);
    });
  });
});
