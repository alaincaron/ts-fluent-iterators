import { expect } from 'chai';
import { FoldCollector } from '../../../src/lib/collectors';

describe('FoldCollector', () => {
  describe('collect', () => {
    it('should sum numbers', () => {
      const collector = new FoldCollector((a: number, b: number) => a + b, 1);
      collector.collect(1);
      collector.collect(2);
      collector.collect(3);
      expect(collector.result).equal(7);
    });
  });
});
