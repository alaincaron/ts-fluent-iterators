import { range } from "../../../src/lib/promise/promiseGenerators";
import { collect } from "../../../src/lib/promise/promiseIterators";
import { expect } from "chai";

describe("PromiseGenerators", () => {

  describe("range", () => {
    it("should yield all elements in the range", async () => {
      expect(await collect(range(1, 5))).to.deep.equal([1, 2, 3, 4]);
    });

    it("should yield elements according to step", async () => {
      expect(await collect(range(1, 5, 2))).to.deep.equal([1, 3]);
    });

    it("should yield no element if end equals start", async () => {
      expect(await collect(range(1, 1))).to.deep.equal([]);
    });

    it("should yield in decreasing order if negative step", async () => {
      expect(await collect(range(5, 0))).to.deep.equal([5, 4, 3, 2, 1]);
    });
  });
});
