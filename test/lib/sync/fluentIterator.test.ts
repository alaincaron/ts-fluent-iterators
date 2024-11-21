import { expect } from 'chai';
import { FlattenCollector } from '../../../src/lib/collectors';
import * as Comparators from '../../../src/lib/comparators';
import { emptyIterator, iterator, singletonIterator } from '../../../src/lib/sync/fluentIterator';
import { range } from '../../../src/lib/sync/generators';
import { first, map, toIterator } from '../../../src/lib/sync/iterators';
import { CollisionHandlers } from '../../../src/lib/utils/collisionHandlers';
import { predicateError } from '../helpers';

describe('SyncFluentIterator', () => {
  describe('collect', () => {
    it('should collect all elements', () => {
      expect([1, 2].iterator().collect()).to.deep.equal([1, 2]);
    });

    it('should return empty array on empty iterator', () => {
      expect(emptyIterator().collect()).deep.equal([]);
    });
  });

  describe('use of ArrayGenerator', () => {
    it('should use the seed function', () => {
      expect(iterator({ length: 5, seed: i => i }).collect()).deep.equal([0, 1, 2, 3, 4]);
    });
  });

  describe('map', () => {
    it('should apply function to all elements', () => {
      expect(
        iterator([1, 2])
          .map(x => 2 * x)
          .collect()
      ).deep.equal([2, 4]);
    });
  });

  describe('filterMap', () => {
    it('should apply function to all elements', () => {
      expect(
        iterator([1, 2])
          .map(x => 2 * x)
          .collect()
      ).deep.equal([2, 4]);
    });
    it('should filter elements that return null or undefined', () => {
      expect(
        iterator([1, 2])
          .filterMap(x => (x % 2 === 0 ? 2 * x : undefined))
          .collect()
      ).deep.equal([4]);
    });
  });

  describe('transform', () => {
    it('should return a new iterator', () => {
      expect(
        iterator([1, 2])
          .transform(it => map(it, x => 2 * x))
          .collect()
      ).deep.equal([2, 4]);
    });
  });

  describe('apply', () => {
    it('apply should return the first element', () => {
      expect(iterator([1, 2, 3]).apply(first)).equal(1);
    });
  });

  describe('first', () => {
    it('should return the first element', () => {
      expect(iterator([1, 2]).first()).equal(1);
    });

    it('should return undefined on empty iterator.', () => {
      expect(emptyIterator().first()).to.be.undefined;
    });
    it('should return matching element if exists', () => {
      expect(
        iterator(range(1, 7))
          .filter(x => x % 3 === 0)
          .first()
      ).equal(3);
    });
    it('should return if no matching element', () => {
      expect(
        iterator(range(1, 5))
          .filter(x => x >= 5)
          .first()
      ).to.be.undefined;
    });
  });

  describe('take', () => {
    it('should yield no elements if 0 is passed', () => {
      expect(iterator(range(0, 100)).take(0).collect()).deep.equal([]);
    });
    it('should yield the exact number of elements more elements than required', () => {
      expect(iterator(range(0, 100)).take(2).collect()).deep.equal([0, 1]);
    });
    it('should yield all elements if there are less elements than required', () => {
      expect(iterator(range(0, 2)).take(1000).collect()).deep.equal([0, 1]);
    });
  });

  describe('skip', () => {
    it('should skip the exact number of elements if skip equals he number of elements', () => {
      expect(iterator([1, 2]).skip(2).collect()).deep.equal([]);
    });
    it('should skip the exact number of elements if skip is less than the number of elements', () => {
      expect(iterator([1, 2]).skip(1).collect()).deep.equal([2]);
    });
    it('should skip all elements if skip is greater than the number of elements', () => {
      expect(iterator([1, 2]).skip(3).collect()).deep.equal([]);
    });
    it('should skip no elements if skip is 0', () => {
      expect(iterator([1, 2]).skip(0).collect()).deep.equal([1, 2]);
    });
  });

  describe('filter', () => {
    it('should filter odd elements', () => {
      expect(
        iterator<number>([1, 2])
          .filter(x => x % 2 === 0)
          .collect()
      ).deep.equal([2]);
    });
  });

  describe('removeNull', () => {
    it('should remove null or undefined', () => {
      expect(iterator([1, null, undefined, 2]).removeNull().collect()).deep.equal([1, 2]);
    });
  });

  describe('zip', () => {
    it('should zip up to shortest iterator with a FluentIterator', () => {
      expect(
        iterator([1, 2, 3])
          .zip(iterator(['a', 'b']))
          .collect()
      ).deep.equal([
        [1, 'a'],
        [2, 'b'],
      ]);
    });
    it('should zip up to shortest iterator with an array', () => {
      expect(iterator([1, 2, 3]).zip(['a', 'b']).collect()).deep.equal([
        [1, 'a'],
        [2, 'b'],
      ]);
    });
  });

  describe('enumerate', () => {
    it('should enumerate all elements starting at 0', () => {
      expect(iterator(['a', 'b']).enumerate().collect()).deep.equal([
        ['a', 0],
        ['b', 1],
      ]);
    });
    it('should enumerate all elements with start value', () => {
      expect(iterator(['a', 'b']).enumerate(10).collect()).deep.equal([
        ['a', 10],
        ['b', 11],
      ]);
    });
  });

  describe('contains', () => {
    it('should return true', () => {
      expect(iterator(range(1, 7)).contains(x => x % 3 === 0)).equal(true);
    });
    it('should return false', () => {
      expect(iterator(range(1, 5)).contains(x => x >= 5)).equal(false);
    });
  });

  describe('includes', () => {
    it('should return true', () => {
      expect(iterator(range(1, 7)).includes(3)).equal(true);
    });
    it('should return false', () => {
      expect(iterator(range(1, 5)).includes(6)).equal(false);
    });
  });

  describe('fold', () => {
    it('should add all elements to initial value', () => {
      expect(iterator(range(1, 5)).fold((acc, x) => acc + x, 10)).equal(20);
    });
  });

  describe('reduce', () => {
    it('should add all elements to initial value', () => {
      expect(iterator(range(1, 5)).reduce((acc, x) => acc + x, 10)).equal(20);
    });
    it('should add all elements', () => {
      expect(iterator(range(1, 5)).reduce((acc, x) => acc + x)).equal(10);
    });
    it('should return undefined if iterator is empty and no initial value is provided', () => {
      expect(emptyIterator<number>().reduce((acc, x) => acc + x)).to.be.undefined;
    });

    describe('tap', () => {
      it('should tap all elements', () => {
        let count = 0;
        const f = (x: number) => {
          count += x;
        };
        expect(iterator(range(1, 5)).tap(f).collect()).deep.equal([1, 2, 3, 4]);
        expect(count).equal(10);
      });
    });
  });

  describe('forEach', () => {
    it('should invokd function for all elements', () => {
      let count = 0;
      const f = (x: number) => {
        count += x;
      };
      expect(iterator(range(1, 5)).forEach(f)).to.be.undefined;
      expect(count).equal(10);
    });
  });

  describe('append', () => {
    it('should append multiple elements', () => {
      expect(iterator([1]).append([2, 3]).collect()).deep.equal([1, 2, 3]);
    });

    it('should append to empty iterator', () => {
      expect(emptyIterator<number>().append([1, 2]).collect()).deep.equal([1, 2]);
    });
    it('should append an empty array', () => {
      expect(iterator([1, 2]).append([]).collect()).deep.equal([1, 2]);
    });
  });

  describe('prepend', () => {
    it('should prepend multiple elements', () => {
      expect(iterator([1]).prepend([2, 3]).collect()).deep.equal([2, 3, 1]);
    });

    it('should prepend to empty iterator', () => {
      expect(emptyIterator<number>().prepend([1, 2]).collect()).deep.equal([1, 2]);
    });
    it('should prepend an empty array', () => {
      expect(iterator([1, 2]).prepend([]).collect()).deep.equal([1, 2]);
    });
  });

  describe('concat', () => {
    it('should concat multiple elements', () => {
      expect(iterator([1]).concat([2], [3]).collect()).deep.equal([1, 2, 3]);
    });

    it('should concat to empty iterator', () => {
      expect(emptyIterator<number>().concat([1, 2]).collect()).deep.equal([1, 2]);
    });
    it('should concat an empty array', () => {
      expect(iterator([1, 2]).concat([]).collect()).deep.equal([1, 2]);
    });
    it('should concat argument-less', () => {
      expect(iterator([1, 2]).concat().collect()).deep.equal([1, 2]);
    });
  });

  describe('takeWhile', () => {
    it('take up to 5', () => {
      expect(
        iterator(range(1, 100))
          .takeWhile(x => x <= 2)
          .collect()
      ).deep.equal([1, 2]);
    });
    it('should return all elements', () => {
      expect(
        iterator([1, 2, 3])
          .takeWhile(_ => true)
          .collect()
      ).deep.equal([1, 2, 3]);
    });
    it('should return no elements', () => {
      expect(
        iterator([1, 2, 3])
          .takeWhile(_ => false)
          .collect()
      ).deep.equal([]);
    });
    it('should work on empty iterator', () => {
      expect(emptyIterator().takeWhile(predicateError()).collect()).deep.equal([]);
    });
  });

  describe('skipWhile', () => {
    it('should yield skip 2 elements', () => {
      expect(
        iterator([1, 10, 2, 11])
          .skipWhile(x => x != 10)
          .collect()
      ).deep.equal([10, 2, 11]);
    });
    it('should return no elements', () => {
      expect(
        iterator([1, 2, 3])
          .skipWhile(x => x > 0)
          .collect()
      ).deep.equal([]);
    });
    it('should return all elements', () => {
      expect(
        iterator([1, 2, 3])
          .skipWhile(x => x % 2 === 0)
          .collect()
      ).deep.equal([1, 2, 3]);
    });
    it('should work on empty iterator', () => {
      expect(emptyIterator().skipWhile(predicateError()).collect()).deep.equal([]);
    });
  });

  describe('all', () => {
    it('should return true', () => {
      expect(iterator([1, 10, 2, 11]).all(x => x > 0)).equal(true);
    });
    it('should return true if empty', () => {
      expect(iterator([]).all(x => x > 0)).equal(true);
    });
    it('should return false', () => {
      expect(iterator([1, 2, 3, -1]).all(x => x > 0)).equal(false);
    });
  });

  describe('some', () => {
    it('should return true', () => {
      expect(iterator([-1, 1]).some(x => x > 0)).equal(true);
    });
    it('should return false if empty', () => {
      expect(iterator([]).some(x => x > 0)).equal(false);
    });
    it('should return false', () => {
      expect(iterator([-1, -2, -3]).some(x => x > 0)).equal(false);
    });
  });

  describe('min', () => {
    it('should return the shortest string', () => {
      expect(iterator(['foo', 'bar', 'x', 'foobar']).min(Comparators.byMapper(s => s.length))).equal('x');
    });
    it('should return lexicographically smallest string', () => {
      expect(iterator(['foo', 'bar', 'x', 'foobar']).min()).equal('bar');
    });
  });

  describe('max', () => {
    it('should return the longest string', () => {
      expect(iterator(['foo', 'bar', 'x', 'foobar']).max(Comparators.byMapper(s => s.length))).equal('foobar');
    });
    it('should return lexicographically largest string', () => {
      expect(iterator(['foo', 'bar', 'x', 'foobar']).max()).equal('x');
    });
  });

  describe('minmax', () => {
    it('should return the longest and shortest strings', () => {
      expect(iterator(['foo', 'bar', 'x', 'foobar']).minmax(Comparators.byMapper(s => s.length))).deep.equal({
        min: 'x',
        max: 'foobar',
      });
    });
    it('should return lexicographically smallest and largest strings', () => {
      expect(iterator(['foo', 'bar', 'x', 'foobar']).minmax()).deep.equal({ min: 'bar', max: 'x' });
    });
    it('should return return undefined on empty iterator', () => {
      expect(emptyIterator().minmax()).to.be.undefined;
    });
  });

  describe('last', () => {
    it('should return the last string', () => {
      expect(iterator(['foo', 'bar', 'x', 'foobar']).last()).equal('foobar');
    });
    it('should return the last string of length 3', () => {
      expect(
        iterator(['foo', 'bar', 'x', 'foobar'])
          .filter(s => s.length === 3)
          .last()
      ).equal('bar');
    });
    it('should return undefined', () => {
      expect(
        iterator(['foo', 'bar', 'x', 'foobar'])
          .filter(s => s.length > 10)
          .last()
      ).to.be.undefined;
    });
  });

  describe('count', () => {
    it('should count elements', () => {
      expect(iterator([1, 2, 3]).count()).equal(3);
    });
  });

  describe('join', () => {
    it('should use separator', () => {
      expect(iterator([1, 2, 3]).join('-')).equal('1-2-3');
    });
    it('should use default separator', () => {
      expect(iterator([1, 2, 3]).join()).equal('1,2,3');
    });
    it('should return empty string', () => {
      expect(iterator([]).join()).equal('');
    });
    it('should use prefix and suffix', () => {
      expect(iterator([1, 2, 3]).join(',', '[', ']')).equal('[1,2,3]');
    });
    it('should use prefix and suffix on empty iterator', () => {
      expect(iterator([]).join(',', '[', ']')).equal('[]');
    });
  });

  describe('groupBy', () => {
    it('should group numbers according to their last bit', () => {
      const actual = iterator([2, 5, 4, 3, 1]).groupBy(x => x % 2);
      const expected = new Map().set(0, [2, 4]).set(1, [5, 3, 1]);
      expect(actual).deep.equal(expected);
    });
  });

  describe('collectToMap', () => {
    it('should return the last even and odd number', () => {
      const actual = iterator([2, 5, 4, 3, 1]).collectToMap(x => x % 2, CollisionHandlers.overwrite);
      const expected = new Map().set(0, 4).set(1, 1);
      expect(actual).deep.equal(expected);
    });
    it('should return the first even and odd number', () => {
      const actual = iterator([2, 5, 4, 3, 1]).collectToMap(x => x % 2, CollisionHandlers.ignore);
      const expected = new Map().set(0, 2).set(1, 5);
      expect(actual).deep.equal(expected);
    });
    it('should throw an Error when there is a collision', () => {
      expect(() => iterator([2, 4]).collectToMap(x => x % 2, CollisionHandlers.reject)).to.throw(Error);
    });
    it('should not throw if no collision', () => {
      const actual = iterator([2, 5]).collectToMap(x => x % 2, CollisionHandlers.reject);
      const expected = new Map().set(0, 2).set(1, 5);
      expect(actual).deep.equal(expected);
    });
  });

  describe('collectToObject', () => {
    interface Data {
      key: string;
      value: number;
    }

    const mapper = (data: Data) => data.key;

    it('should return the last occurences of key', () => {
      const actual = iterator([
        { key: 'a', value: 1 },
        { key: 'a', value: 2 },
        { key: 'b', value: 3 },
        { key: 'b', value: 4 },
      ]).collectToObject(mapper);
      const expected = { a: { key: 'a', value: 2 }, b: { key: 'b', value: 4 } };
      expect(actual).deep.equal(expected);
    });
    it('should return the first occurences of key', () => {
      const actual = iterator([
        { key: 'a', value: 1 },
        { key: 'a', value: 2 },
        { key: 'b', value: 3 },
        { key: 'b', value: 4 },
      ]).collectToObject(mapper, CollisionHandlers.ignore);
      const expected = { a: { key: 'a', value: 1 }, b: { key: 'b', value: 3 } };
      expect(actual).deep.equal(expected);
    });
  });

  describe('collectToObject2', () => {
    interface Data {
      key: string;
      value: number;
    }

    const mapper = (data: Data): [string, number] => [data.key, data.value];

    it('should return the last occurences of key', () => {
      const actual = iterator([
        { key: 'a', value: 1 },
        { key: 'a', value: 2 },
        { key: 'b', value: 3 },
        { key: 'b', value: 4 },
      ]).collectToObject2(mapper);
      const expected = { a: 2, b: 4 };
      expect(actual).deep.equal(expected);
    });
    it('should return the first occurences of key', () => {
      const actual = iterator([
        { key: 'a', value: 1 },
        { key: 'a', value: 2 },
        { key: 'b', value: 3 },
        { key: 'b', value: 4 },
      ]).collectToObject2(mapper, CollisionHandlers.ignore);
      const expected = { a: 1, b: 3 };
      expect(actual).deep.equal(expected);
    });
  });

  describe('collectTo with FlattenCollector', () => {
    it('should return flattened list of numbers', () => {
      const actual = iterator([
        [2, 5],
        [4, 2, 5],
      ])
        .collectTo(new FlattenCollector())
        .collect();
      const expected = [2, 5, 4, 2, 5];
      expect(actual).deep.equal(expected);
    });
    it('should return flattened set of numbers', () => {
      const actual = iterator([
        [2, 5],
        [4, 2, 5],
      ])
        .collectTo(new FlattenCollector())
        .collectToSet();
      const expected = new Set([2, 4, 5]);
      expect(actual).deep.equal(expected);
    });
  });

  describe('collectToSet', () => {
    it('should return set of numbers', () => {
      const actual = iterator([2, 5, 4, 2, 5]).collectToSet();
      const expected = new Set([2, 4, 5]);
      expect(actual).deep.equal(expected);
    });
  });

  describe('partition', () => {
    it('should split iterator based on partition size', () => {
      const actual = iterator([2, 5, 4, 3, 1]).partition(2).collect();
      const expected = [[2, 5], [4, 3], [1]];
      expect(actual).deep.equal(expected);
    });
    it('should throw on partition size smaller than 1', () => {
      expect(() => emptyIterator().partition(0)).to.throw;
    });
    it('should throw on non-integer values', () => {
      expect(() => emptyIterator().partition(0.5)).to.throw;
    });
  });

  describe('distinct', () => {
    it('should keep only distinct elements', () => {
      const actual = iterator([1, 1, 2, 3, 2, 3, 4, 1, 4]).distinct().collect();
      const expected = [1, 2, 3, 4];
      expect(actual).deep.equal(expected);
    });
    it('should only keep the first odd and first even numbers', () => {
      const actual = iterator([1, 1, 2, 3, 2, 3, 4, 1, 4])
        .distinct(x => x % 2)
        .collect();
      const expected = [1, 2];
      expect(actual).deep.equal(expected);
    });
  });

  describe('tally', () => {
    it('should count event and odd numbers', () => {
      const actual = iterator([2, 5, 4, 3, 1])
        .map(x => x % 2)
        .tally();
      const expected = new Map().set(0, 2).set(1, 3);
      expect(actual).deep.equal(expected);
    });
    it('should count all words', () => {
      const actual = iterator(['foo', 'bar', 'foobar', 'foo']).tally();
      const expected = new Map().set('foo', 2).set('bar', 1).set('foobar', 1);
      expect(actual).deep.equal(expected);
    });
  });

  describe('Symbol', () => {
    it('should be usable as a native iterator', () => {
      const expected = [1, 2];
      const iter = expected.iterator();
      const actual = [];
      for (const c of iter) {
        actual.push(c);
      }
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('String iterator', () => {
    it('should create an iterator from a string', () => {
      const str = 'foobar';
      const actual = iterator(str).join('');
      expect(actual).to.equal(str);
    });
    it('should add iterator to String prototype', () => {
      const str = 'foobar';
      const actual = str.iterator().join('');
      expect(actual).to.equal(str);
    });
  });

  describe('Set iterator', () => {
    it('should add iterator to Set prototype', () => {
      const expected = new Set().add(1).add(2);
      const actual = expected.iterator().collectToSet();
      expect(actual).to.deep.equal(expected);
    });
  });
  describe('Map iterator', () => {
    it('should add iterator to Map prototype', () => {
      const map = new Map().set('a', 2).set('b', 3);
      const actual = map.iterator().collect();
      expect(actual).to.deep.equal([
        ['a', 2],
        ['b', 3],
      ]);
    });
  });
  describe('Map key iterator', () => {
    it('should add keyIterator to Map prototype', () => {
      const map = new Map().set('a', 2).set('b', 3);
      const actual = map.keyIterator().collect();
      expect(actual).to.deep.equal(['a', 'b']);
    });
  });
  describe('Map value iterator', () => {
    it('should add valueIterator to Map prototype', () => {
      const map = new Map().set('a', 2).set('b', 3);
      const actual = map.valueIterator().collect();
      expect(actual).to.deep.equal([2, 3]);
    });
  });
  describe('toIterator', () => {
    it('should throw non iterable input', () => {
      expect(() => toIterator(2 as unknown as Iterable<unknown>)).to.throw();
    });
  });

  describe('singleton', () => {
    it('should yield a single element', () => {
      expect(singletonIterator(2).collect()).to.deep.equal([2]);
    });
  });
});
