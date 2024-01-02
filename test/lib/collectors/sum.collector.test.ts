import { expect } from 'chai';
import { SumCollector } from '../../../src/lib/collectors';

describe('SumCollector', () => {
  describe('collect', () => {
    it('should sum numbers', () => {
      const collector = new SumCollector();
      collector.collect(1);
      collector.collect(2);
      collector.collect(3);
      expect(collector.result).equal(6);
    });
    it('should sum numbers to initial value', () => {
      const collector = new SumCollector(5);
      collector.collect(1);
      collector.collect(2);
      collector.collect(3);
      expect(collector.result).equal(11);
    });
    it('should return 0 if no initial value', () => {
      const collector = new SumCollector();
      expect(collector.result).equal(0);
    });
    it('should return initial value', () => {
      const collector = new SumCollector(12);
      expect(collector.result).equal(12);
    });
  });
});
