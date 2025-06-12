import { expect } from 'chai';
import { sumCollector } from '../../../src/lib/collectors';

describe('SumCollector', () => {
  describe('collect', () => {
    it('should sum numbers', () => {
      const collector = sumCollector();
      collector.collect(1);
      collector.collect(2);
      collector.collect(3);
      expect(collector.result).equal(6);
    });
    it('should sum numbers to initial value', () => {
      const collector = sumCollector(5);
      collector.collect(1);
      collector.collect(2);
      collector.collect(3);
      expect(collector.result).equal(11);
    });
    it('should return 0 if no initial value', () => {
      const collector = sumCollector();
      expect(collector.result).equal(0);
    });
    it('should return initial value', () => {
      const collector = sumCollector(12);
      expect(collector.result).equal(12);
    });
  });
});
