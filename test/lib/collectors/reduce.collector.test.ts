import { expect } from 'chai';
import { reduceCollector } from '../../../src/lib/collectors';

describe('ReduceCollector', () => {
  describe('collect', () => {
    it('should sum numbers with initial value', () => {
      const collector = reduceCollector((a: number, b: number) => a + b, 1);
      collector.collect(1);
      collector.collect(2);
      collector.collect(3);
      expect(collector.result).equal(7);
    });
    it('should sum numbers without initial value', () => {
      const collector = reduceCollector((a: number, b: number) => a + b);
      collector.collect(1);
      collector.collect(2);
      collector.collect(3);
      expect(collector.result).equal(6);
    });
  });
});
