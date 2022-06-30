import { range } from "../../../src/lib/sync/generators";
import { fluentIterator } from "../../../src/lib/sync/fluentIterator";
import { expect } from "chai";

describe("SyncFluentIterator", () => {

  describe("collect", () => {

    it("should collect all elements", () => {
      expect(fluentIterator([1, 2]).collect()).to.deep.equal([1, 2]);
    });

    it("should return empty array on empty iterator", () => {
      expect(fluentIterator([]).collect()).deep.equal([]);
    });
  });

  describe("map", () => {
    it("should apply function to all elements", () => {
      expect(fluentIterator([1, 2]).map(x => 2 * x).collect()).deep.equal([2, 4]);
    });
  });

  describe("first", () => {
    it("should return the first element", () => {
      expect(fluentIterator([1, 2]).first()).equal(1);
    });

    it("should return undefined on empty iterator.", () => {
      expect(fluentIterator([]).first()).to.be.undefined;
    });
  });

  describe("take", () => {
    it("should yield no elements if 0 is passed", () => {
      expect(fluentIterator(range(0, 100)).take(0).collect()).deep.equal([]);
    });
    it("should yield the exact number of elements more elements than required", () => {
      expect(fluentIterator(range(0, 100)).take(2).collect()).deep.equal([0, 1]);
    });
    it("should yield all elements if there are less elements than required", () => {
      expect(fluentIterator(range(0, 2)).take(1000).collect()).deep.equal([0, 1]);
    });
  });

  describe("skip", () => {
    it("should skip the exact number of elements if skip equals he number of elements", () => {
      expect(fluentIterator([1, 2]).skip(2).collect()).deep.equal([]);
    });
    it("should skip the exact number of elements if skip is less than the number of elements", () => {
      expect(fluentIterator([1, 2]).skip(1).collect()).deep.equal([2]);
    });
    it("should skip all elements if skip is greater than the number of elements", () => {
      expect(fluentIterator([1, 2]).skip(3).collect()).deep.equal([]);
    });
    it("should skip no elements if skip is 0", () => {
      expect(fluentIterator([1, 2]).skip(0).collect()).deep.equal([1, 2]);
    });
  });

  describe("filter", () => {
    it("should filter odd elements", () => {
      expect(fluentIterator<number>([1, 2]).filter(x => x % 2 === 0).collect()).deep.equal([2]);
    });
  });

  describe("zip", () => {
    it("should zip up to shortest iterator", () => {
      expect(fluentIterator([1, 2, 3]).zip(fluentIterator(["a", "b"])).collect()).deep.equal([[1, "a"], [2, "b"]]);
    });
  });

  describe("enumerate", () => {
    it("should enumerate all elements", () => {
      expect(fluentIterator(["a", "b"]).enumerate().collect()).deep.equal([["a", 0], ["b", 1]]);
    });
  });

  describe("find", () => {
    it("should return matching element if exists", () => {
      expect(fluentIterator(range(1, 7)).find(x => x % 3 === 0)).equal(3);
    });
    it("should return if no matching element", () => {
      expect(fluentIterator(range(1, 5)).find(x => x >= 5)).to.be.undefined;
    });
  });

  describe("contains", () => {
    it("should return true", () => {
      expect(fluentIterator(range(1, 7)).contains(x => x % 3 === 0)).equal(true);
    });
    it("should return false", () => {
      expect(fluentIterator(range(1, 5)).contains(x => x >= 5)).equal(false);
    });
  });

  describe("includes", () => {
    it("should return true", () => {
      expect(fluentIterator(range(1, 7)).includes(3)).equal(true);
    });
    it("should return false", () => {
      expect(fluentIterator(range(1, 5)).includes(6)).equal(false);
    });
  });

  describe("fold", () => {
    it("should add all elements to initial value", () => {
      expect(fluentIterator(range(1, 5)).fold((acc, x) => acc + x, 10)).equal(20);
    });
  });

  describe("reduce", () => {
    it("should add all elements to initial value", () => {
      expect(fluentIterator(range(1, 5)).reduce((acc, x) => acc + x, 10)).equal(20);
    });
    it("should add all elements", () => {
      expect(fluentIterator(range(1, 5)).reduce((acc, x) => acc + x)).equal(10);
    });
  });

  describe("tap", () => {
    it("should tap all elements", () => {
      let count = 0;
      let f = (x: number) => { count += x; };
      expect(fluentIterator(range(1, 5)).tap(f).collect()).deep.equal([1, 2, 3, 4]);
      expect(count).equal(10);
    });
  });

  describe("forEach", () => {
    it("should invokd function for all elements", () => {
      let count = 0;
      let f = (x: number) => { count += x; };
      expect(fluentIterator(range(1, 5)).forEach(f)).to.be.undefined;
      expect(count).equal(10);
    });
  });

  describe("append", () => {
    it("should append multiple elements", () => {
      expect(fluentIterator([1]).append([2, 3]).collect()).deep.equal([1, 2, 3]);
    });

    it("should append to empty iterator", () => {
      expect(fluentIterator(range()).append([1, 2]).collect()).deep.equal([1, 2]);
    });
    it("should append an empty array", () => {
      expect(fluentIterator([1, 2]).append([]).collect()).deep.equal([1, 2]);
    });
  });

  describe("prepend", () => {
    it("should prepend multiple elements", () => {
      expect(fluentIterator([1]).prepend([2, 3]).collect()).deep.equal([2, 3, 1]);
    });

    it("should prepend to empty iterator", () => {
      expect(fluentIterator(range()).prepend([1, 2]).collect()).deep.equal([1, 2]);
    });
    it("should prepend an empty array", () => {
      expect(fluentIterator([1, 2]).prepend([]).collect()).deep.equal([1, 2]);
    });
  });

  describe("concat", () => {
    it("should concat multiple elements", () => {
      expect(fluentIterator([1]).concat([2], [3]).collect()).deep.equal([1, 2, 3]);
    });

    it("should concat to empty iterator", () => {
      expect(fluentIterator(range()).concat([1, 2]).collect()).deep.equal([1, 2]);
    });
    it("should concat an empty array", () => {
      expect(fluentIterator([1, 2]).concat([]).collect()).deep.equal([1, 2]);
    });
    it("should concat argument-less", () => {
      expect(fluentIterator([1, 2]).concat().collect()).deep.equal([1, 2]);
    });
  });

  describe("takeWhile", () => {
    it("take up to 5", () => {
      expect(fluentIterator(range(1, 100)).takeWhile(x => x <= 2).collect()).deep.equal([1, 2]);
    });
    it("should return all elements", () => {
      expect(fluentIterator([1, 2, 3]).takeWhile((_ => true)).collect()).deep.equal([1, 2, 3]);
    });
    it("should return no elements", () => {
      expect(fluentIterator([1, 2, 3]).takeWhile((_ => false)).collect()).deep.equal([]);
    });
    it("should work on empty iterator", () => {
      expect(fluentIterator(range()).takeWhile(x => {
        throw new Error(`x = ${x}`);
      }).collect()).deep.equal([]);
    });
  });

  describe("skipWhile", () => {
    it("should yield skip 2 elements", () => {
      expect(fluentIterator([1, 10, 2, 11]).skipWhile(x => x != 10).collect()).deep.equal([10, 2, 11]);
    });
    it("should return no elements", () => {
      expect(fluentIterator([1, 2, 3]).skipWhile((x => x > 0)).collect()).deep.equal([]);
    });
    it("should return all elements", () => {
      expect(fluentIterator([1, 2, 3]).skipWhile((x => x % 2 === 0)).collect()).deep.equal([1, 2, 3]);
    });
    it("should work on empty iterator", () => {
      expect(fluentIterator(range()).skipWhile(x => {
        throw new Error(`x = ${x}`);
      }).collect()).deep.equal([]);
    });
  });

  describe("all", () => {
    it("should return true", () => {
      expect(fluentIterator([1, 10, 2, 11]).all(x => x > 0)).equal(true);
    });
    it("should return true if empty", () => {
      expect(fluentIterator(range()).all((x => x > 0))).equal(true);
    });
    it("should return false", () => {
      expect(fluentIterator([1, 2, 3, -1]).all(x => x > 0)).equal(false);
    });
  });

  describe("some", () => {
    it("should return true", () => {
      expect(fluentIterator([-1, 1]).some(x => x > 0)).equal(true);
    });
    it("should return false if empty", () => {
      expect(fluentIterator(range()).some((x => x > 0))).equal(false);
    });
    it("should return false", () => {
      expect(fluentIterator([-1, -2, -3]).some(x => x > 0)).equal(false);
    });
  });

  describe("sum", () => {
    it("should apply mapper", () => {
      expect(fluentIterator(["foo", "bar", "foobar"]).sum(x => x.length)).equal(12);
    });
    it("should sum numbers", () => {
      expect(fluentIterator([1, 2, 3]).sum()).equal(6);
    });
    it("should return 0 on empty iterators", () => {
      expect(fluentIterator(range()).sum()).equal(0);
    });
  });

  describe("avg", () => {
    it("should apply mapper", () => {
      expect(fluentIterator(["foo", "bar", "foobar"]).avg(x => x.length)).equal(4);
    });
    it("should avg numbers", () => {
      expect(fluentIterator([1, 2]).avg()).equal(1.5);
    });
    it("should return 0 on empty iterators", () => {
      expect(fluentIterator(range()).avg()).equal(0);
    });
  });

});
