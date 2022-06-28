import { range } from "../../../src/lib/sync/generators";
import { FluentIterator } from "../../../src/lib/sync/fluentIterator";
import { expect } from "chai";

describe("FluentIterator", () => {

  describe("collect", () => {

    it("should collect all elements", () => {
      expect(new FluentIterator([1, 2]).collect()).to.deep.equal([1, 2]);
    });

    it("should return empty array on empty iterator", () => {
      expect(new FluentIterator([]).collect()).deep.equal([]);
    });
  });

  describe("map", () => {
    it("should apply function to all elements", () => {
      expect(new FluentIterator<number>([1, 2]).map(x => 2 * x).collect()).deep.equal([2, 4]);
    });
  });

  describe("first", () => {
    it("should return the first element", () => {
      expect(new FluentIterator([1, 2]).first()).equal(1);
    });

    it("should return undefined on empty iterator.", () => {
      expect(new FluentIterator([]).first()).to.be.undefined;
    });
  });

  describe("take", () => {
    it("should yield no elements if 0 is passed", () => {
      expect(new FluentIterator(range(0, 100)).take(0).collect()).deep.equal([]);
    });
    it("should yield the exact number of elements more elements than required", () => {
      expect(new FluentIterator(range(0, 100)).take(2).collect()).deep.equal([0, 1]);
    });
    it("should yield all elements if there are less elements than required", () => {
      expect(new FluentIterator(range(0, 2)).take(1000).collect()).deep.equal([0, 1]);
    });
  });

  describe("skip", () => {
    it("should skip the exact number of elements if skip equals he number of elements", () => {
      expect(new FluentIterator([1, 2]).skip(2).collect()).deep.equal([]);
    });
    it("should skip the exact number of elements if skip is less than the number of elements", () => {
      expect(new FluentIterator([1, 2]).skip(1).collect()).deep.equal([2]);
    });
    it("should skip all elements if skip is greater than the number of elements", () => {
      expect(new FluentIterator([1, 2]).skip(3).collect()).deep.equal([]);
    });
    it("should skip no elements if skip is 0", () => {
      expect(new FluentIterator([1, 2]).skip(0).collect()).deep.equal([1, 2]);
    });
  });

  describe("filter", () => {
    it("should filter odd elements", () => {
      expect(new FluentIterator<number>([1, 2]).filter(x => x % 2 === 0).collect()).deep.equal([2]);
    });
  });

  describe("zip", () => {
    it("should zip up to shortest iterator", () => {
      expect(new FluentIterator([1, 2, 3]).zip(new FluentIterator(["a", "b"])).collect()).deep.equal([[1, "a"], [2, "b"]]);
    });
  });

  describe("enumerate", () => {
    it("should enumerate all elements", () => {
      expect(new FluentIterator(["a", "b"]).enumerate().collect()).deep.equal([["a", 0], ["b", 1]]);
    });
  });

  describe("find", () => {
    it("should return matching element if exists", () => {
      expect(new FluentIterator(range(1, 7)).find(x => x % 3 === 0)).equal(3);
    });
    it("should return if no matching element", () => {
      expect(new FluentIterator(range(1, 5)).find(x => x >= 5)).to.be.undefined;
    });
  });

  describe("fold", () => {
    it("should add all elements to initial value", () => {
      expect(new FluentIterator(range(1, 5)).fold((acc, x) => acc + x, 10)).equal(20);
    });
  });

  describe("reduce", () => {
    it("should add all elements to initial value", () => {
      expect(new FluentIterator(range(1, 5)).reduce((acc, x) => acc + x, 10)).equal(20);
    });
    it("should add all elements", () => {
      expect(new FluentIterator(range(1, 5)).reduce((acc, x) => acc + x)).equal(10);
    });
  });

  describe("tap", () => {
    it("should tap all elements", () => {
      let count = 0;
      let f = (x: number) => { count += x; };
      expect(new FluentIterator(range(1, 5)).tap(f).collect()).deep.equal([1, 2, 3, 4]);
      expect(count).equal(10);
    });
  });


});
