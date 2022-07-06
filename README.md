# Typescript Fluent Iterators

Provides [fluent api](https://en.wikipedia.org/wiki/Fluent_interface)
operations on iterators, async iterators and promise iterators.

## Description

The library provides the common transformation, filtering and
aggregation operations on iterators, async iterators and promise iterators. Supported operations include:

- Item-by-item transformations:
  - [map](docs/iterators/fluent_iterator.md#map)
  - [enumerate](docs/iterators/fluent_iterator.md#enumerate)

- Group transformations like
  - [partition](docs/iterators/fluent_iterator.md#partition)
  - [sort](docs/iterators/fluent_iterator.md#sort)

- Extending operations like
  - [append](docs/iterators/fluent_iterator.md#append)
  - [prepend](docs/iterators/fluent_iterator.md#prepend)
  - [concat](docs/iterators/fluent_iterator.md#concat)

- Narrowing operations like
  - [filter](docs/iterators/fluent_iterator.md#filter)
  - [take](docs/iterators/fluent_iterator.md#take)
  - [skip](docs/iterators/fluent_iterator.md#skip)
  - [distinct](docs/iterators/fluent_iterator.md#distinct)
  - [first](docs/iterators/fluent_iterator.md#first)
  - [last](docs/iterators/fluent_iterator.md#last)

- Aggregating operations:
  - [collect](docs/iterators/fluent_iterator.md#collect)
  - [collectSorted](docs/iterators/fluent_iterator.md#collectsorted)
  - [collectToMap](docs/iterators/fluent_iterator.md#collecttomap)
  - [fold](docs/iterators/fluent_iterator.md#fold)
  - [reduce](docs/iterators/fluent_iterator.md#reduce)
  - [join](docs/iterators/fluent_iterator.md#join)
  - [count](docs/iterators/fluent_iterator.md#count)
  - [max](docs/iterators/fluent_iterator.md#max)
  - [min](docs/iterators/fluent_iterator.md#min)
  - [sum](docs/iterators/fluent_iterator.md#sum)
  - [avg](docs/iterators/fluent_iterator.md#avg)

- Logical aggregating operations:
  - [all](docs/iterators/fluent_iterator.md#all)
  - [some](docs/iterators/fluent_iterator.md#some)
  - [contains](docs/iterators/fluent_iterator.md#contains)
  - [includes](docs/iterators/fluent_iterator.md#includes)

- Execution operations:
  - [tap](docs/iterators/fluent_iterator.md#tap)
  - [forEach](docs/iterators/fluent_iterator.md#foreach)

- Promise specific operations:
  - [flatMap](docs/iterators/promise_iterator.md#flatmap)
  - [allSettled](docs/iterators/promise_iterator.md#allsettled)
  - [race](docs/iterators/promise_iterator.md#race)
  - [any](docs/iterators/promise_iterator.md#any)

## Quick start guide

Install from [Node Package Manager](https://www.npmjs.com/): `npm i ts-fluent-iterators`

Add the following code to your index file (ts example):

```typescript
import { iterator } from 'ts-fluent-iterators;

const numbers = [3, 1, 8, 6, 9, 2];
const iter = iterator(numbers);

console.log(`The largest even number is: ${iter.filter(n => n % 2 === 0).max()}`);


function* fibonacci(): Iterable<number> {
  let x = 0;
  let y = 1;

  yield x;
  yield y;

  while (true) {
    const z = y;
    y = x + y;
    x = z;
    yield y;
  }
}

const fibonacciIterator = iterator(fibonacci());

console.log(`The fifth fibonacci number is ${fibonacciIterator.take(5).last()}`);
```

## Usage

Click here for the [Full API Reference](docs/index.md).

## License

Licensed under [MIT](https://en.wikipedia.org/wiki/MIT_License).
