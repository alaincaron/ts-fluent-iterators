Provides [fluent api](https://en.wikipedia.org/wiki/Fluent_interface)
operations on iterators, async iterators and promise iterators.

## Description

The library provides the common transformation, filtering and
aggregation operations on iterators, async iterators and promise iterators. Supported operations include:

- Item-by-item transformations:
  - map,
  - enumerate

- Group transformations like
  - partition
  - sort

- Extending operations like
  - append
  - prepend
  - concat

- Narrowing operations like
  - filter
  - take
  - skip
  - distinct
  - first
  - last

- Aggregating operations:
  - collect
  - collectSorted
  - collectToMap
  - fold
  - reduce
  - join

- Numeric aggregating operations:
  - count
  - max
  - min
  - sum
  - avg

- Logical aggregating operations:
  - all
  - some
  - contains
  - includes

- Execution operations:
  - tap
  - forEach

- Promise specific operations:
  - flatMap
  - allSettled
  - race
  - any

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

Click here for the [Full API Reference](./docs/README.md).

## License

Licensed under [MIT](https://en.wikipedia.org/wiki/MIT_License).
