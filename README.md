# typedsa

> A collection of algorithms and data structures written in TypeScript.

Collection interfaces are mostly inspired by a subset of the [`System.Collection.Generics`](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic) namespace from the .NET framework.
For more information about each algorithm and data structueres, including complexity, check the TSDoc style documentation on each file.

## Installing

```
npm install --save typedsa
```

## Project Structure

The library is divided in 4 main submodules: `ds`, `algs`, `utils` and `errors`.

```
|_lib
|___algs
|_____sorting
|_______mergeSort.ts
|_______quickSort.ts
|_______...
|_______Sorter.ts
|___ds
|_____linked-list
|_____queue
|_____stack
|_____...
|_____Collection.ts
|___utils
|_____comparator
|_______Comparator.ts
|___errors
|_______BaseError.ts
|_______ArgumentNullError.ts
|_______....
```

## Usage

```typescript
import { LinkedList, DoubleLinkedList, Queue, Stack } from 'typedsa/ds';
import { Sorter } from 'typedsa/algs';
import { Comparator } from 'typedsa/utils';
import {
  BaseError,
  ArgumentNullError,
  IvalidOperationError,
} from 'typedsa/errors';

const linkedList = new LinkedList<string>();
linkedList.add('foo');
linkedList.add('bar');
linkedList.add('spam');

const stringComparator = new Comparator<string>((a: string, b: string) => {
  return a.length - b.length;
});

linkedList.sort(stringComparator);

const sortedAgain: string[] = Sorter.sort(
  linkedList.toArray(),
  SORTING_TYPES.MERGE_SORT,
  stringComparator
);
```

## Contrubuting

Althow this project has been created mostly for studying purposes, I'd love some contrubutions. Just try to be consistent with the project structure, testing, and tsdocs conventions.

### Testing

```bash
npm install

npm test
# or
npm run test:watch
# or
npm run test:coverage
```
