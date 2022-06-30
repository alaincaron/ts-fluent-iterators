import { range } from "../../../src/lib/promise/promiseGenerators"
import { promiseIterator } from "../../../src/lib/promise/promiseIterator"
import { toPromise } from "../../../src/lib/promise/promiseIterators";
import { expect, assert } from "chai";

describe("PromiseIterator", () => {

  describe("collect", () => {
    it("should collect all elements", async () => {
      expect(await promiseIterator(toPromise([1, 2])).collect()).to.deep.equal([1, 2]);
    });
    it("should return empty array on empty iterator", async () => {
      expect(await promiseIterator(range()).collect()).to.deep.equal([]);
    });
  });

  describe("allSettled", () => {
    it("should wait for all elements", async () => {
      expect(await promiseIterator(range(1, 3)).allSettled())
        .to.deep.equal(
          [
            { status: "fulfilled", value: 1 },
            { status: "fulfilled", value: 2 }
          ]
        );
    });
    it("should return errors", async () => {
      expect(await
        promiseIterator([Promise.resolve(1), Promise.resolve(2), Promise.reject("foobar")]).allSettled()
      ).to.deep.equal(
        [
          { status: "fulfilled", value: 1 },
          { status: "fulfilled", value: 2 },
          { status: "rejected", reason: "foobar" }
        ]
      );
    });
    it("should return empty array on empty iterator", async () => {
      expect(await promiseIterator(range(0, 0)).allSettled()).to.deep.equal([]);
    });
  });


  describe("any", () => {
    it("should collect first promise resolved", async () => {
      expect(await promiseIterator([Promise.reject(), Promise.reject(), Promise.resolve(1)]).any()).to.equal(1);
    });
    it("should return undefined on empty iterator", async () => {
      expect(await promiseIterator([]).any()).to.be.undefined
    });
  });

  describe("race", () => {
    it("should collect first promise", async () => {
      expect(await promiseIterator(range(1, 10)).race()).to.equal(1);
    });
    it("should throw", async () => {
      try {
        await promiseIterator([Promise.reject(), Promise.resolve(1)]).race();
      } catch (err) {
        return;
      }
      assert.fail("race should have trown");

    });
    it("should return undefined on empty iterator", async () => {
      expect(await promiseIterator([]).race()).to.be.undefined
    });
  });

  describe("map", () => {
    it("should apply function to all elements", async () => {
      expect(await promiseIterator(range(1, 3)).map(x => 2 * x).collect()).to.deep.equal([2, 4]);
    });
  });

  describe("first", () => {
    it("should return the first element", async () => {
      expect(await promiseIterator(range(1, 100)).first()).to.equal(1);
    });

    it("should return undefined on empty iterator.", async () => {
      expect(await promiseIterator(range(0, 0)).first()).to.be.undefined;
    });
  });

  describe("take", () => {
    it("should yield no elements if 0 is passed", async () => {
      expect(await promiseIterator(range(0, 100)).take(0).collect()).to.deep.equal([]);
    });
    it("should yield the exact number of elements more elements than required", async () => {
      expect(await promiseIterator(range(0, 100)).take(2).collect()).to.deep.equal([0, 1]);
    });
    it("should yield all elements if there are less elements than required", async () => {
      expect(await promiseIterator(range(0, 2)).take(1000).collect()).to.deep.equal([0, 1]);
    });
  });

  describe("skip", () => {
    it("should skip the exact number of elements if skip equals he number of elements", async () => {
      expect(await promiseIterator(range(1, 3)).skip(2).collect()).to.deep.equal([]);
    });
    it("should skip the exact number of elements if skip is less than the number of elements", async () => {
      expect(await promiseIterator(range(1, 3)).skip(1).collect()).to.deep.equal([2]);
    });
    it("should skip all elements if skip is greater than the number of elements", async () => {
      expect(await promiseIterator(range(1, 3)).skip(3).collect()).to.deep.equal([]);
    });
    it("should skip no elements if skip is 0", async () => {
      expect(await promiseIterator(range(1, 3)).skip(0).collect()).to.deep.equal([1, 2]);
    });
  });

  describe("zip", () => {
    it("should zip up to shortest iterator", async () => {
      expect(await promiseIterator(range(1, 4)).zip(promiseIterator(range(1, 3))).collect()).to.deep.equal([[1, 1], [2, 2]]);
    });
  });

  describe("enumerate", () => {
    it("should enumerate all elements", async () => {
      expect(await promiseIterator(range(1, 3)).enumerate().collect()).to.deep.equal([[1, 0], [2, 1]]);
    });
  });

  describe("find", () => {
    it("should return matching element if exists", async () => {
      expect(await promiseIterator(range(1, 7)).find(x => x % 3 === 0)).to.equal(3);
    });
    it("should return if no matching element", async () => {
      expect(await promiseIterator(range(1, 5)).find(x => x >= 5)).to.be.undefined;
    });
  });

  describe("fold", () => {
    it("should add all elements to initial value", async () => {
      expect(await promiseIterator(range(1, 5)).fold((acc, x) => acc + x, 10)).to.equal(20);
    });
  });

  describe("reduce", () => {
    it("should add all elements to initial value", async () => {
      expect(await promiseIterator(range(1, 5)).reduce((acc, x) => acc + x, 10)).to.equal(20);
    });
    it("should add all elements", async () => {
      expect(await promiseIterator(range(1, 5)).reduce((acc, x) => acc + x)).to.equal(10);
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

  describe("forEach", () => {
    it("should invoke function for all elements", async () => {
      let count = 0;
      let f = (x: number) => { count += x; };
      await promiseIterator(range(1, 5)).forEach(f);
      expect(count).equal(10);
    });
  });

  describe("append", () => {
    it("should append multiple elements", async () => {
      expect(await promiseIterator(range(1, 3)).append(range(3, 5)).collect()).to.deep.equal([1, 2, 3, 4]);
    });

    it("should append to empty iterator", async () => {
      expect(await promiseIterator(range()).append(range(1, 3)).collect()).to.deep.equal([1, 2]);
    });
    it("should append an empty array", async () => {
      expect(await promiseIterator(range(1, 3)).append([]).collect()).to.deep.equal([1, 2]);
    });
  });

  describe("prepend", () => {
    it("should prepend multiple elements", async () => {
      expect(await promiseIterator(range(1, 2)).prepend(range(2, 4)).collect()).to.deep.equal([2, 3, 1]);
    });

    it("should prepend to empty iterator", async () => {
      expect(await promiseIterator(range()).prepend(range(1, 3)).collect()).to.deep.equal([1, 2]);
    });
    it("should prepend an empty array", async () => {
      expect(await promiseIterator(range(1, 3)).prepend([]).collect()).to.deep.equal([1, 2]);
    });
  });

  describe("concat", () => {
    it("should concat multiple elements", async () => {
      expect(await promiseIterator(range(1, 2)).concat([Promise.resolve(2)], [Promise.resolve(3)]).collect()).to.deep.equal([1, 2, 3]);
    });

    it("should concat to empty iterator", async () => {
      expect(await promiseIterator(range()).concat(range(1, 3)).collect()).to.deep.equal([1, 2]);
    });
    it("should concat an empty array", async () => {
      expect(await promiseIterator(range(1, 3)).concat([]).collect()).to.deep.equal([1, 2]);
    });
    it("should concat argument-less", async () => {
      expect(await promiseIterator(range(1, 3)).concat().collect()).to.deep.equal([1, 2]);
    });
  });




});
