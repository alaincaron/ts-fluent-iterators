import { range } from "../../../src/lib/async/asyncGenerators"
import { AsyncFluentIterator } from "../../../src/lib/async/asyncFluentIterator"
import { expect } from "chai";

describe("AsyncFluentIterator", () => {

  describe("collect", () => {

    it("should collect all elements", async () => {
      expect(await new AsyncFluentIterator(range(1, 3)).collect()).to.deep.equal([1, 2]);
    });

    it("should return empty array on empty iterator", async () => {
      expect(await new AsyncFluentIterator(range(0, 0)).collect()).deep.equal([]);
    });
  });

  describe("map", () => {
    it("should apply function to all elements", async () => {
      expect(await new AsyncFluentIterator(range(1, 3)).map(x => 2 * x).collect()).deep.equal([2, 4]);
    });
  });

  describe("first", () => {
    it("should return the first element", async () => {
      expect(await new AsyncFluentIterator(range(1, 100)).first()).equal(1);
    });

    it("should return undefined on empty iterator.", async () => {
      expect(await new AsyncFluentIterator(range(0, 0)).first()).to.be.undefined;
    });
  });

  describe("take", () => {
    it("should yield no elements if 0 is passed", async () => {
      expect(await new AsyncFluentIterator(range(0, 100)).take(0).collect()).deep.equal([]);
    });
    it("should yield the exact number of elements more elements than required", async () => {
      expect(await new AsyncFluentIterator(range(0, 100)).take(2).collect()).deep.equal([0, 1]);
    });
    it("should yield all elements if there are less elements than required", async () => {
      expect(await new AsyncFluentIterator(range(0, 2)).take(1000).collect()).deep.equal([0, 1]);
    });
  });

  describe("skip", () => {
    it("should skip the exact number of elements if skip equals he number of elements", async () => {
      expect(await new AsyncFluentIterator(range(1, 3)).skip(2).collect()).deep.equal([]);
    });
    it("should skip the exact number of elements if skip is less than the number of elements", async () => {
      expect(await new AsyncFluentIterator(range(1, 3)).skip(1).collect()).deep.equal([2]);
    });
    it("should skip all elements if skip is greater than the number of elements", async () => {
      expect(await new AsyncFluentIterator(range(1, 3)).skip(3).collect()).deep.equal([]);
    });
    it("should skip no elements if skip is 0", async () => {
      expect(await new AsyncFluentIterator(range(1, 3)).skip(0).collect()).deep.equal([1, 2]);
    });
  });

  describe("filter", () => {
    it("should filter odd elements", async () => {
      expect(await new AsyncFluentIterator(range(1, 3)).filter(x => x % 2 === 0).collect()).deep.equal([2]);
    });
  });

  describe("zip", () => {
    it("should zip up to shortest iterator", async () => {
      expect(await new AsyncFluentIterator(range(1, 4)).zip(new AsyncFluentIterator(range(1, 3))).collect()).deep.equal([[1, 1], [2, 2]]);
    });
  });

  describe("enumerate", () => {
    it("should enumerate all elements", async () => {
      expect(await new AsyncFluentIterator(range(1, 3)).enumerate().collect()).deep.equal([[1, 0], [2, 1]]);
    });
  });

  describe("find", () => {
    it("should return matching element if exists", async () => {
      expect(await new AsyncFluentIterator(range(1, 7)).find(x => x % 3 === 0)).equal(3);
    });
    it("should return if no matching element", async () => {
      expect(await new AsyncFluentIterator(range(1, 5)).find(x => x >= 5)).to.be.undefined;
    });
  });

  describe("fold", () => {
    it("should add all elements to initial value", async () => {
      expect(await new AsyncFluentIterator(range(1, 5)).fold((acc, x) => acc + x, 10)).equal(20);
    });
  });

  describe("reduce", () => {
    it("should add all elements to initial value", async () => {
      expect(await new AsyncFluentIterator(range(1, 5)).reduce((acc, x) => acc + x, 10)).equal(20);
    });
    it("should add all elements", async () => {
      expect(await new AsyncFluentIterator(range(1, 5)).reduce((acc, x) => acc + x)).equal(10);
    });
  });

  describe("tap", () => {
    it("should tap all elements", async () => {
      let count = 0;
      let f = (x: number) => { count += x; };
      expect(await new AsyncFluentIterator(range(1, 5)).tap(f).collect()).deep.equal([1, 2, 3, 4]);
      expect(count).equal(10);
    });
  });


});
