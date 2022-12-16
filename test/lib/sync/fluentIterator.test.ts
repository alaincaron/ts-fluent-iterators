import { range } from "../../../src/lib/sync/generators";
import { iterator } from "../../../src/lib/sync/fluentIterator";
import { lengthComparator } from "../../../src/lib/functions";

import { expect } from "chai";

describe("SyncFluentIterator", () => {

  describe("collect", () => {

    it("should collect all elements", () => {
      expect([1, 2].iterator().collect()).to.deep.equal([1, 2]);
    });

    it("should return empty array on empty iterator", () => {
      expect(iterator([]).collect()).deep.equal([]);
    });
  });

  describe("map", () => {
    it("should apply function to all elements", () => {
      expect(iterator([1, 2]).map(x => 2 * x).collect()).deep.equal([2, 4]);
    });
  });

  describe("first", () => {
    it("should return the first element", () => {
      expect(iterator([1, 2]).first()).equal(1);
    });

    it("should return undefined on empty iterator.", () => {
      expect(iterator([]).first()).to.be.undefined;
    });
    it("should return matching element if exists", () => {
      expect(iterator(range(1, 7)).first(x => x % 3 === 0)).equal(3);
    });
    it("should return if no matching element", () => {
      expect(iterator(range(1, 5)).first(x => x >= 5)).to.be.undefined;
    });
  });

  describe("take", () => {
    it("should yield no elements if 0 is passed", () => {
      expect(iterator(range(0, 100)).take(0).collect()).deep.equal([]);
    });
    it("should yield the exact number of elements more elements than required", () => {
      expect(iterator(range(0, 100)).take(2).collect()).deep.equal([0, 1]);
    });
    it("should yield all elements if there are less elements than required", () => {
      expect(iterator(range(0, 2)).take(1000).collect()).deep.equal([0, 1]);
    });
  });

  describe("skip", () => {
    it("should skip the exact number of elements if skip equals he number of elements", () => {
      expect(iterator([1, 2]).skip(2).collect()).deep.equal([]);
    });
    it("should skip the exact number of elements if skip is less than the number of elements", () => {
      expect(iterator([1, 2]).skip(1).collect()).deep.equal([2]);
    });
    it("should skip all elements if skip is greater than the number of elements", () => {
      expect(iterator([1, 2]).skip(3).collect()).deep.equal([]);
    });
    it("should skip no elements if skip is 0", () => {
      expect(iterator([1, 2]).skip(0).collect()).deep.equal([1, 2]);
    });
  });

  describe("filter", () => {
    it("should filter odd elements", () => {
      expect(iterator<number>([1, 2]).filter(x => x % 2 === 0).collect()).deep.equal([2]);
    });
  });

  describe("zip", () => {
    it("should zip up to shortest iterator with a FluentIterator", () => {
      expect(iterator([1, 2, 3]).zip(iterator(["a", "b"])).collect()).deep.equal([[1, "a"], [2, "b"]]);
    });
    it("should zip up to shortest iterator with an array", () => {
      expect(iterator([1, 2, 3]).zip(["a", "b"]).collect()).deep.equal([[1, "a"], [2, "b"]]);
    });
  });

  describe("enumerate", () => {
    it("should enumerate all elements starting at 0", () => {
      expect(iterator(["a", "b"]).enumerate().collect()).deep.equal([["a", 0], ["b", 1]]);
    });
    it("should enumerate all elements with start value", () => {
      expect(iterator(["a", "b"]).enumerate(10).collect()).deep.equal([["a", 10], ["b", 11]]);
    });
  });

  describe("contains", () => {
    it("should return true", () => {
      expect(iterator(range(1, 7)).contains(x => x % 3 === 0)).equal(true);
    });
    it("should return false", () => {
      expect(iterator(range(1, 5)).contains(x => x >= 5)).equal(false);
    });
  });

  describe("includes", () => {
    it("should return true", () => {
      expect(iterator(range(1, 7)).includes(3)).equal(true);
    });
    it("should return false", () => {
      expect(iterator(range(1, 5)).includes(6)).equal(false);
    });
  });

  describe("fold", () => {
    it("should add all elements to initial value", () => {
      expect(iterator(range(1, 5)).fold((acc, x) => acc + x, 10)).equal(20);
    });
  });

  describe("reduce", () => {
    it("should add all elements to initial value", () => {
      expect(iterator(range(1, 5)).reduce((acc, x) => acc + x, 10)).equal(20);
    });
    it("should add all elements", () => {
      expect(iterator(range(1, 5)).reduce((acc, x) => acc + x)).equal(10);
    });
  });

  describe("tap", () => {
    it("should tap all elements", () => {
      let count = 0;
      let f = (x: number) => { count += x; };
      expect(iterator(range(1, 5)).tap(f).collect()).deep.equal([1, 2, 3, 4]);
      expect(count).equal(10);
    });
  });

  describe("forEach", () => {
    it("should invokd function for all elements", () => {
      let count = 0;
      let f = (x: number) => { count += x; };
      expect(iterator(range(1, 5)).forEach(f)).to.be.undefined;
      expect(count).equal(10);
    });
  });

  describe("append", () => {
    it("should append multiple elements", () => {
      expect(iterator([1]).append([2, 3]).collect()).deep.equal([1, 2, 3]);
    });

    it("should append to empty iterator", () => {
      expect(iterator(range(0, 0)).append([1, 2]).collect()).deep.equal([1, 2]);
    });
    it("should append an empty array", () => {
      expect(iterator([1, 2]).append([]).collect()).deep.equal([1, 2]);
    });
  });

  describe("prepend", () => {
    it("should prepend multiple elements", () => {
      expect(iterator([1]).prepend([2, 3]).collect()).deep.equal([2, 3, 1]);
    });

    it("should prepend to empty iterator", () => {
      expect(iterator(range(0, 0)).prepend([1, 2]).collect()).deep.equal([1, 2]);
    });
    it("should prepend an empty array", () => {
      expect(iterator([1, 2]).prepend([]).collect()).deep.equal([1, 2]);
    });
  });

  describe("concat", () => {
    it("should concat multiple elements", () => {
      expect(iterator([1]).concat([2], [3]).collect()).deep.equal([1, 2, 3]);
    });

    it("should concat to empty iterator", () => {
      expect(iterator(range(0, 0)).concat([1, 2]).collect()).deep.equal([1, 2]);
    });
    it("should concat an empty array", () => {
      expect(iterator([1, 2]).concat([]).collect()).deep.equal([1, 2]);
    });
    it("should concat argument-less", () => {
      expect(iterator([1, 2]).concat().collect()).deep.equal([1, 2]);
    });
  });

  describe("takeWhile", () => {
    it("take up to 5", () => {
      expect(iterator(range(1, 100)).takeWhile(x => x <= 2).collect()).deep.equal([1, 2]);
    });
    it("should return all elements", () => {
      expect(iterator([1, 2, 3]).takeWhile((_ => true)).collect()).deep.equal([1, 2, 3]);
    });
    it("should return no elements", () => {
      expect(iterator([1, 2, 3]).takeWhile((_ => false)).collect()).deep.equal([]);
    });
    it("should work on empty iterator", () => {
      expect(iterator([]).takeWhile(x => {
        throw new Error(`x = ${x}`);
      }).collect()).deep.equal([]);
    });
  });

  describe("skipWhile", () => {
    it("should yield skip 2 elements", () => {
      expect(iterator([1, 10, 2, 11]).skipWhile(x => x != 10).collect()).deep.equal([10, 2, 11]);
    });
    it("should return no elements", () => {
      expect(iterator([1, 2, 3]).skipWhile((x => x > 0)).collect()).deep.equal([]);
    });
    it("should return all elements", () => {
      expect(iterator([1, 2, 3]).skipWhile((x => x % 2 === 0)).collect()).deep.equal([1, 2, 3]);
    });
    it("should work on empty iterator", () => {
      expect(iterator([]).skipWhile(x => {
        throw new Error(`x = ${x}`);
      }).collect()).deep.equal([]);
    });
  });

  describe("distinct", () => {
    it("should eliminate duplicates", () => {
      expect(iterator([1, 2, 5, 2, 1, 0]).distinct().collect()).deep.equal([1, 2, 5, 0]);
    });
    it("should only yield one odd and one even number", () => {
      expect(iterator([1, 2, 5, 2, 1, 0]).distinct(x => x % 2).collect()).deep.equal([1, 2]);
    });
  });

  describe("all", () => {
    it("should return true", () => {
      expect(iterator([1, 10, 2, 11]).all(x => x > 0)).equal(true);
    });
    it("should return true if empty", () => {
      expect(iterator([]).all((x => x > 0))).equal(true);
    });
    it("should return false", () => {
      expect(iterator([1, 2, 3, -1]).all(x => x > 0)).equal(false);
    });
  });

  describe("some", () => {
    it("should return true", () => {
      expect(iterator([-1, 1]).some(x => x > 0)).equal(true);
    });
    it("should return false if empty", () => {
      expect(iterator([]).some((x => x > 0))).equal(false);
    });
    it("should return false", () => {
      expect(iterator([-1, -2, -3]).some(x => x > 0)).equal(false);
    });
  });

  describe("sum", () => {
    it("should apply mapper", () => {
      expect(iterator(["foo", "bar", "foobar"]).sum(x => x.length)).equal(12);
    });
    it("should sum numbers", () => {
      expect(iterator([1, 2, 3]).sum()).equal(6);
    });
    it("should return 0 on empty iterators", () => {
      expect(iterator([]).sum()).equal(0);
    });
  });

  describe("avg", () => {
    it("should apply mapper", () => {
      expect(iterator(["foo", "bar", "foobar"]).avg(x => x.length)).equal(4);
    });
    it("should avg numbers", () => {
      expect(iterator([1, 2]).avg()).equal(1.5);
    });
    it("should return 0 on empty iterators", () => {
      expect(iterator([]).avg()).equal(0);
    });
  });

  describe("min", () => {
    it("should return the shortest string", () => {
      expect(iterator(["foo", "bar", "x", "foobar"]).min(lengthComparator)).equal("x");
    });
    it("should return lexicographically smallest string", () => {
      expect(iterator(["foo", "bar", "x", "foobar"]).min()).equal("bar");
    });
  });

  describe("max", () => {
    it("should return the longest string", () => {
      expect(
        iterator(["foo", "bar", "x", "foobar"]).max(lengthComparator)).equal("foobar");
    });
    it("should return lexicographically largest string", () => {
      expect(iterator(["foo", "bar", "x", "foobar"]).max()).equal("x");
    });
  });

  describe("minmax", () => {
    it("should return the longest and shortest strings", () => {
      expect(
        iterator(["foo", "bar", "x", "foobar"]).minmax(lengthComparator)).deep.equal({ min: "x", max: "foobar" });
    });
    it("should return lexicographically smallest and largest strings", () => {
      expect(iterator(["foo", "bar", "x", "foobar"]).minmax()).deep.equal({ min: "bar", max: "x" });
    });
  });

  describe("last", () => {
    it("should return the last string", () => {
      expect(
        iterator(["foo", "bar", "x", "foobar"]).last())
        .equal("foobar");
    });
    it("should return the last string of length 3", () => {
      expect(iterator(["foo", "bar", "x", "foobar"]).last(s => s.length === 3)).equal("bar");
    });
    it("should return undefined", () => {
      expect(iterator(["foo", "bar", "x", "foobar"]).last(s => s.length > 10)).to.be.undefined;
    });
  });

  describe("count", () => {
    it("should use predicate", () => {
      expect(iterator([1, 2, 3]).count(x => x % 2 === 0)).equal(1);
    });
    it("should use default true predicate", () => {
      expect(iterator([1, 2, 3]).count()).equal(3);
    });
  });

  describe("join", () => {
    it("should use separator", () => {
      expect(iterator([1, 2, 3]).join('-')).equal('1-2-3');
    });
    it("should use default separator", () => {
      expect(iterator([1, 2, 3]).join()).equal('1,2,3');
    });
    it('should return empty string', () => {
      expect(iterator([]).join()).equal('');
    });
  });

  describe("groupBy", () => {
    it("should group numbers according to their last bit", () => {
      const actual = iterator([2, 5, 4, 3, 1]).groupBy(x => x % 2);
      const expected = new Map().set(0, [2, 4]).set(1, [5, 3, 1]);
      expect(actual).deep.equal(expected);
    });
  });

  describe("collectToSet", () => {
    it("should return set of numbers", () => {
      const actual = iterator([2, 5, 4, 2, 5]).collectToSet();
      const expected = new Set([2, 4, 5]);
      expect(actual).deep.equal(expected);
    });
  });

  describe("partition", () => {
    it("should split iterator based on partition size", () => {
      const actual = iterator([2, 5, 4, 3, 1]).partition(2).collect();
      const expected = [[2, 5], [4, 3], [1]];
      expect(actual).deep.equal(expected);
    });
  });

  describe("tally", () => {
    it("should count event and odd numbers", () => {
      const actual = iterator([2, 5, 4, 3, 1]).tally(x => x % 2);
      const expected = new Map().set(0, 2).set(1, 3);
      expect(actual).deep.equal(expected);
    });
    it("should count all words", () => {
      const actual = iterator(["foo", "bar", "foobar", "foo"]).tally();
      const expected = new Map().set("foo", 2).set("bar", 1).set("foobar", 1);
      expect(actual).deep.equal(expected);
    });
  });

});
