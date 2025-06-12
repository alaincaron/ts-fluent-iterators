import { expect } from 'chai';
import { foldCollector } from '../../../src/lib/collectors';

describe('FoldCollector', () => {
  describe('collect', () => {
    it('should sum numbers', () => {
      const collector = foldCollector((a: number, b: number) => a + b, 1);
      collector.collect(1);
      collector.collect(2);
      collector.collect(3);
      expect(collector.result).equal(7);
    });
  });
});
