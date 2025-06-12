import { expect } from 'chai';
import { fluentCollector, sumCollector } from '../../../src/lib/collectors';

describe('FluentCollector', () => {
  describe('map', () => {
    it('should compute sum of squares', () => {
      const collector = fluentCollector(sumCollector()).map((x: number) => x * x);
      collector.collect(1);
      collector.collect(2);
      collector.collect(3);
      expect(collector.result).equal(14);
    });
  });

  describe('filter', () => {
    it('should compute sum of odd numbers', () => {
      const collector = fluentCollector(sumCollector()).filter((x: number) => x % 2 === 1);
      collector.collect(1);
      collector.collect(2);
      collector.collect(3);
      expect(collector.result).equal(4);
    });
  });
  describe('andThen', () => {
    it('should compute square of the sum', () => {
      const collector = fluentCollector(sumCollector()).andThen((x: number) => x * x);
      collector.collect(1);
      collector.collect(2);
      collector.collect(3);
      expect(collector.result).equal(36);
    });
  });

  describe('factory function', () => {
    it('should not wrap fluent collector', () => {
      const collector = fluentCollector(sumCollector());
      expect(fluentCollector(collector)).equal(collector);
    });
  });
});
