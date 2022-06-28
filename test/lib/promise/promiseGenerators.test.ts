import { range } from "../../../src/lib/promise/promiseGenerators";
import { collect } from "../../../src/lib/promise/promiseIterators";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("AsyncGenerators", () => {

  describe("range", () => {
    it("should yield all elements in the range", () => {
      expect(collect(range(1, 5))).to.eventually.deep.equal([1, 2, 3, 4]);
    });

    it("should yield elements according to step", async () => {
      expect(collect(range(1, 5, 2))).to.eventually.deep.equal([1, 3]);
    });

    it("should yield no element if end equals start", async () => {
      expect(collect(range(1, 1))).to.eventually.deep.equal([]);
    });

    it("should yield in decreasing order if negative step", async () => {
      expect(collect(range(5, 0, -1))).to.eventually.deep.equal([5, 4, 3, 2, 1]);
    });
  });
});
