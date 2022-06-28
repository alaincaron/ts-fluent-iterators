import { range } from "../../../src/lib/sync/generators";
import { collect } from "../../../src/lib/sync/iterators";
import { expect } from "chai";

describe("Generators", () => {

  describe("range", () => {
    it("should yield all elements in the range", () => {
      expect(collect(range(1, 5))).deep.equal([1, 2, 3, 4]);
    });

    it("should yield elements according to step", () => {
      expect(collect(range(1, 5, 2))).deep.equal([1, 3]);
    });

    it("should yield no element if end equals start", () => {
      expect(collect(range(1, 1))).deep.equal([]);
    });

    it("should yield in decreasing order if negative step", () => {
      expect(collect(range(5, 0, -1))).deep.equal([5, 4, 3, 2, 1]);
    });
  });
});
