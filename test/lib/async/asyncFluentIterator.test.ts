import { range } from "../../../src/lib/async/asyncGenerators"
import { asyncIterator } from "../../../src/lib/async/asyncFluentIterator"
import { toAsync } from "../../../src/lib/async/asyncIterators";
import { expect } from "chai";

describe("AsyncFluentIterator", () => {
  describe("collect", () => {
    it("should collect all elements", async () => {
      expect(await asyncIterator(toAsync([1, 2])).collect()).deep.equal([1, 2]);
    });

    it("should return empty array on empty iterator", async () => {
      expect(await asyncIterator(range()).collect()).to.deep.equal([]);
    });
  });

  describe("map", () => {
    it("should apply function to all elements", async () => {
      expect(await asyncIterator(toAsync([1, 2])).map(x => 2 * x).collect()).to.deep.equal([2, 4]);
    });
  });

  describe("first", () => {
    it("should return the first element", async () => {
      expect(await asyncIterator(range(1, 100)).first()).to.deep.equal(1);
    });

    it("should return undefined on empty iterator.", async () => {
      expect(await asyncIterator(range()).first()).to.be.undefined;
    });
  });

  describe("take", () => {
    it("should yield no elements if 0 is passed", async () => {
      expect(await asyncIterator(range(0, 100)).take(0).collect()).to.deep.equal([]);
    });
    it("should yield the exact number of elements more elements than required", async () => {
      expect(await asyncIterator(range(0, 100)).take(2).collect()).to.deep.equal([0, 1]);
    });
    it("should yield all elements if there are less elements than required", async () => {
      expect(await asyncIterator(toAsync([0, 1])).take(1000).collect()).to.deep.equal([0, 1]);
    });
  });

  describe("skip", () => {
    it("should skip the exact number of elements if skip equals he number of elements", async () => {
      expect(await asyncIterator(toAsync([1, 2])).skip(2).collect()).deep.equal([]);
    });
    it("should skip the exact number of elements if skip is less than the number of elements", async () => {
      expect(await asyncIterator(range(1, 3)).skip(1).collect()).deep.equal([2]);
    });
    it("should skip all elements if skip is greater than the number of elements", async () => {
      expect(await asyncIterator(range(1, 3)).skip(3).collect()).deep.equal([]);
    });
    it("should skip no elements if skip is 0", async () => {
      expect(await asyncIterator(range(1, 3)).skip(0).collect()).deep.equal([1, 2]);
    });
  });

  describe("filter", () => {
    it("should filter odd elements", async () => {
      expect(await asyncIterator(range(1, 3)).filter(x => x % 2 === 0).collect()).deep.equal([2]);
    });
    it("should filter odd elements with promise predicate", async () => {
      expect(await asyncIterator(range(1, 3)).filter(x => Promise.resolve(x % 2 === 0)).collect()).deep.equal([2]);
    });
  });

  describe("zip", () => {
    it("should zip up to shortest iterator", async () => {
      expect(await asyncIterator(range(1, 4)).zip(asyncIterator(range(1, 3))).collect()).deep.equal([[1, 1], [2, 2]]);
    });
  });

  describe("enumerate", () => {
    it("should enumerate all elements", async () => {
      expect(await asyncIterator(range(1, 3)).enumerate().collect()).deep.equal([[1, 0], [2, 1]]);
    });
  });

  describe("find", () => {
    it("should return matching element if exists", async () => {
      expect(await asyncIterator(range(1, 7)).find(x => x % 3 === 0)).equal(3);
    });
    it("should return if no matching element", async () => {
      expect(await asyncIterator(range(1, 5)).find(x => x >= 5)).to.be.undefined;
    });
  });

  describe("contains", () => {
    it("should return true", async () => {
      expect(await asyncIterator(range(1, 7)).contains(x => x % 3 === 0)).equal(true);
    });
    it("should return false", async () => {
      expect(await asyncIterator(range(1, 5)).contains(x => x >= 5)).equal(false);
    });
    it("should return true with promise", async () => {
      expect(await asyncIterator(range(1, 7)).contains(x => Promise.resolve(x % 3 === 0))).equal(true);
    });
    it("should return false with promise", async () => {
      expect(await asyncIterator(range(1, 5)).contains(x => Promise.resolve(x >= 5))).equal(false);
    });
  });

  describe("includes", () => {
    it("should return true", async () => {
      expect(await asyncIterator(range(1, 7)).includes(3)).equal(true);
    });
    it("should return false", async () => {
      expect(await asyncIterator(range(1, 5)).includes(6)).equal(false);
    });
    it("should return true with promise", async () => {
      expect(await asyncIterator(range(1, 7)).includes(Promise.resolve(3))).equal(true);
    });
    it("should return false with promise", async () => {
      expect(await asyncIterator(range(1, 5)).includes(Promise.resolve(6))).equal(false);
    });
  });

  describe("fold", () => {
    it("should add all elements to initial value", async () => {
      expect(await asyncIterator(range(1, 5)).fold((acc, x) => acc + x, 10)).equal(20);
    });
  });

  describe("reduce", () => {
    it("should add all elements to initial value", async () => {
      expect(await asyncIterator(range(1, 5)).reduce((acc, x) => acc + x, 10)).equal(20);
    });
    it("should add all elements", async () => {
      expect(await asyncIterator(range(1, 5)).reduce((acc, x) => acc + x)).equal(10);
    });
  });

  describe("tap", () => {
    it("should tap all elements", async () => {
      let count = 0;
      let f = (x: number) => { count += x; };
      expect(await asyncIterator(range(1, 5)).tap(f).collect()).deep.equal([1, 2, 3, 4]);
      expect(count).equal(10);
    });
  });

  describe("forEach", () => {
    it("should invoke function on all elements", async () => {
      let count = 0;
      let f = (x: number) => { count += x; };
      await asyncIterator(range(1, 5)).forEach(f);
      expect(count).equal(10);
    });
  });

  describe("append", () => {
    it("should append multiple elements", async () => {
      expect(await asyncIterator(range(1, 3)).append([3, 4]).collect()).to.deep.equal([1, 2, 3, 4]);
    });

    it("should append to empty iterator", async () => {
      expect(await asyncIterator(range(0, 0)).append([1, 2]).collect()).to.deep.equal([1, 2]);
    });
    it("should append an empty array", async () => {
      expect(await asyncIterator(range(1, 3)).append([]).collect()).to.deep.equal([1, 2]);
    });
  });

  describe("prepend", () => {
    it("should prepend multiple elements", async () => {
      expect(await asyncIterator(range(1, 2)).prepend([2, 3]).collect()).to.deep.equal([2, 3, 1]);
    });

    it("should prepend to empty iterator", async () => {
      expect(await asyncIterator(range(0, 0)).prepend([1, 2]).collect()).to.deep.equal([1, 2]);
    });
    it("should prepend an empty array", async () => {
      expect(await asyncIterator(range(1, 3)).prepend([]).collect()).to.deep.equal([1, 2]);
    });
  });

  describe("concat", () => {
    it("should concat multiple elements", async () => {
      expect(await asyncIterator(range(1, 2)).concat([2], [3]).collect()).to.deep.equal([1, 2, 3]);
    });

    it("should concat to empty iterator", async () => {
      expect(await asyncIterator(range()).concat([1, 2]).collect()).to.deep.equal([1, 2]);
    });
    it("should concat an empty array", async () => {
      expect(await asyncIterator(range(1, 3)).concat([]).collect()).to.deep.equal([1, 2]);
    });
    it("should concat argument-less", async () => {
      expect(await asyncIterator(range(1, 3)).concat().collect()).to.deep.equal([1, 2]);
    });
  });

  describe("takeWhile", () => {
    it("take up to 5", async () => {
      expect(await asyncIterator(range(1, 100)).takeWhile(x => x <= 2).collect()).to.deep.equal([1, 2]);
    });
    it("should return all elements", async () => {
      expect(await asyncIterator(range(1, 4)).takeWhile((_ => Promise.resolve(true))).collect()).to.deep.equal([1, 2, 3]);
    });
    it("should return no elements", async () => {
      expect(await asyncIterator(range(1, 4)).takeWhile((_ => false)).collect()).to.deep.equal([]);
    });
    it("should work on empty iterator", async () => {
      expect(await asyncIterator(range()).takeWhile(x => {
        throw new Error(`x = ${x}`);
      }).collect()).to.deep.equal([]);
    });
  });

  describe("skipWhile", () => {
    it("should yield skip 2 elements", async () => {
      expect(await asyncIterator(toAsync([1, 10, 2, 11])).skipWhile(x => x != 10).collect()).to.deep.equal([10, 2, 11]);
    });
    it("should return no elements", async () => {
      expect(await asyncIterator(range(1, 4)).skipWhile((x => x > 0)).collect()).to.deep.equal([]);
    });
    it("should return all elements", async () => {
      expect(await asyncIterator(range(1, 4)).skipWhile((x => x % 2 === 0)).collect()).to.deep.equal([1, 2, 3]);
    });
    it("should work on empty iterator", async () => {
      expect(await asyncIterator(range()).skipWhile(x => {
        throw new Error(`x = ${x}`);
      }).collect()).to.deep.equal([]);
    });
  });

  describe("all", () => {
    it("should return true", async () => {
      expect(await asyncIterator(range(1, 5)).all(x => x > 0)).equal(true);
    });
    it("should return true if empty", async () => {
      expect(await asyncIterator(range()).all((x => x > 0))).equal(true);
    });
    it("should return false", async () => {
      expect(await asyncIterator(range(4, -1, -1)).all(x => x > 0)).equal(false);
    });
  });

  describe("some", () => {
    it("should return true", async () => {
      expect(await asyncIterator(range(-1, 2)).some(x => x > 0)).equal(true);
    });
    it("should return false if empty", async () => {
      expect(await asyncIterator(range()).some((x => x > 0))).equal(false);
    });
    it("should return false", async () => {
      expect(await asyncIterator(range(-5, 1)).some(x => x > 0)).equal(false);
    });
  });

  describe("sum", () => {
    it("should apply mapper", async () => {
      expect(await asyncIterator(toAsync(["foo", "bar", "foobar"])).sum(x => x.length)).equal(12);
    });
    it("should sum numbers", async () => {
      expect(await asyncIterator(toAsync([1, 2, 3])).sum()).equal(6);
    });
    it("should return 0 on empty iterators", async () => {
      expect(await asyncIterator(range()).sum()).equal(0);
    });
  });

  describe("avg", () => {
    it("should apply mapper", async () => {
      expect(await asyncIterator(toAsync(["foo", "bar", "foobar"])).avg(x => x.length)).equal(4);
    });
    it("should avg numbers", async () => {
      expect(await asyncIterator(toAsync([1, 2])).avg()).equal(1.5);
    });
    it("should return 0 on empty iterators", async () => {
      expect(await asyncIterator(range()).avg()).equal(0);
    });
  });

  describe("count", () => {
    it("should use predicate", async () => {
      expect(await asyncIterator(range(1, 4)).count(x => x % 2 === 0)).equal(1);
    });
    it("should use default true predicate", async () => {
      expect(await asyncIterator(range(1, 4)).count()).equal(3);
    });
  });
});
