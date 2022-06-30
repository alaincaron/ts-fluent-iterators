import * as Iterators from "../../../src/lib/sync/iterators";
import { expect } from "chai";


describe("iterators", () => {
  describe("sum", () => {
    it("should compute the sum of an iterator with an initial value", () => {
      expect(Iterators.sum([1, 2, 3, 4], -10)).equal(0);
    });
    it("should compute the sum of an iterator without initial value", () => {
      expect(Iterators.sum([1, 2, 3, 4])).equal(10);
    });
  });

  describe("avg", () => {
    it("should compute the average of an iterator", () => {
      expect(Iterators.avg([1, 2, 3, 4])).eq(2.5);
    });
  });
});
