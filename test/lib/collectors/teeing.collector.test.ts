import { expect } from 'chai';
import { maxCollector, minCollector, teeingCollector } from '../../../src/lib/collectors';

describe('TeeingCollector', () => {
  describe('collect', () => {
    it('should compute min and max', () => {
      const collector = teeingCollector(minCollector(), maxCollector(), (min, max) => ({ min, max }));
      collector.collect(3);
      collector.collect(3);
      collector.collect(6);
      expect(collector.result).deep.equal({ min: 3, max: 6 });
    });
    it('should return 0 if no sample', () => {
      const collector = teeingCollector(minCollector(), maxCollector(), (min, max) => ({ min, max }));
      expect(collector.result).deep.equal({ min: undefined, max: undefined });
    });
  });
});
