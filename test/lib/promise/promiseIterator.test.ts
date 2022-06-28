import { range } from "../../../src/lib/promise/promiseGenerators"
import { promiseIterator } from "../../../src/lib/promise/promiseIterator"
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("PromiseIterator", () => {

  describe("collect", () => {
    it("should collect all elements", () => {
      expect(promiseIterator(range(1, 3)).collect()).to.eventually.deep.equal([1, 2]);
    });
    it("should return empty array on empty iterator", () => {
      expect(promiseIterator(range(0, 0)).collect()).to.eventually.deep.equal([]);
    });
  });

  describe("allSettled", () => {
    it("should wait for all elements", () => {
      expect(promiseIterator(range(1, 3)).allSettled())
        .to.eventually.deep.equal(
          [
            { status: "fulfilled", value: 1 },
            { status: "fulfilled", value: 2 }
          ]
        );
    });
    it("should return errors", () => {
      expect(
        promiseIterator([Promise.resolve(1), Promise.resolve(2), Promise.reject("foobar")]).allSettled()
      ).to.eventually.deep.equal(
        [
          { status: "fulfilled", value: 1 },
          { status: "fulfilled", value: 2 },
          { status: "rejected", reason: "foobar" }
        ]
      );
    });
    it("should return empty array on empty iterator", () => {
      expect(promiseIterator(range(0, 0)).allSettled()).to.eventually.deep.equal([]);
    });
  });


  describe("any", () => {
    it("should collect first promise resolved", () => {
      expect(promiseIterator([Promise.reject(), Promise.reject(), Promise.resolve(1)]).any()).to.eventually.equal(1);
    });
    it("should return undefined on empty iterator", () => {
      expect(promiseIterator([]).any()).to.eventually.be.undefined
    });
  });

  describe("race", () => {
    it("should collect first promise", () => {
      expect(promiseIterator(range(1, 10)).race()).to.eventually.equal(1);
    });
    it("should throw", () => {
      expect(promiseIterator([Promise.reject(), Promise.resolve(1)]).race()).to.be.rejected;
    });
    it("should return undefined on empty iterator", () => {
      expect(promiseIterator([]).race()).to.eventually.be.undefined
    });
  });

  describe("map", () => {
    it("should apply function to all elements", () => {
      expect(promiseIterator(range(1, 3)).map(x => 2 * x).collect()).to.eventually.deep.equal([2, 4]);
    });
  });

  describe("first", () => {
    it("should return the first element", () => {
      expect(promiseIterator(range(1, 100)).first()).to.eventually.equal(1);
    });

    it("should return undefined on empty iterator.", () => {
      expect(promiseIterator(range(0, 0)).first()).to.eventually.be.undefined;
    });
  });

  describe("take", () => {
    it("should yield no elements if 0 is passed", () => {
      expect(promiseIterator(range(0, 100)).take(0).collect()).to.eventually.deep.equal([]);
    });
    it("should yield the exact number of elements more elements than required", () => {
      expect(promiseIterator(range(0, 100)).take(2).collect()).to.eventually.deep.equal([0, 1]);
    });
    it("should yield all elements if there are less elements than required", () => {
      expect(promiseIterator(range(0, 2)).take(1000).collect()).to.eventually.deep.equal([0, 1]);
    });
  });

  describe("skip", () => {
    it("should skip the exact number of elements if skip equals he number of elements", () => {
      expect(promiseIterator(range(1, 3)).skip(2).collect()).to.eventually.deep.equal([]);
    });
    it("should skip the exact number of elements if skip is less than the number of elements", () => {
      expect(promiseIterator(range(1, 3)).skip(1).collect()).to.eventually.deep.equal([2]);
    });
    it("should skip all elements if skip is greater than the number of elements", () => {
      expect(promiseIterator(range(1, 3)).skip(3).collect()).to.eventually.deep.equal([]);
    });
    it("should skip no elements if skip is 0", () => {
      expect(promiseIterator(range(1, 3)).skip(0).collect()).to.eventually.deep.equal([1, 2]);
    });
  });

  describe("zip", () => {
    it("should zip up to shortest iterator", () => {
      expect(promiseIterator(range(1, 4)).zip(promiseIterator(range(1, 3))).collect()).to.eventually.deep.equal([[1, 1], [2, 2]]);
    });
  });

  describe("enumerate", () => {
    it("should enumerate all elements", () => {
      expect(promiseIterator(range(1, 3)).enumerate().collect()).to.eventually.deep.equal([[1, 0], [2, 1]]);
    });
  });

  describe("find", () => {
    it("should return matching element if exists", () => {
      expect(promiseIterator(range(1, 7)).find(x => x % 3 === 0)).to.eventually.equal(3);
    });
    it("should return if no matching element", () => {
      expect(promiseIterator(range(1, 5)).find(x => x >= 5)).to.eventually.be.undefined;
    });
  });

  describe("fold", () => {
    it("should add all elements to initial value", () => {
      expect(promiseIterator(range(1, 5)).fold((acc, x) => acc + x, 10)).to.eventually.equal(20);
    });
  });

  describe("reduce", () => {
    it("should add all elements to initial value", () => {
      expect(promiseIterator(range(1, 5)).reduce((acc, x) => acc + x, 10)).to.eventually.equal(20);
    });
    it("should add all elements", () => {
      expect(promiseIterator(range(1, 5)).reduce((acc, x) => acc + x)).to.eventually.equal(10);
    });
  });

  describe("tap", () => {
    it("should tap all elements", async () => {
      let count = 0;
      let f = (x: number) => { count += x; };
      expect(await promiseIterator(range(1, 5)).tap(f).collect()).to.deep.equal([1, 2, 3, 4]);
      expect(count).equal(10);
    });
  });


});
