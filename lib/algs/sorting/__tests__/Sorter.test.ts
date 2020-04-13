import { Sorter, SORTING_TYPES } from '~/algs';
import { Comparator } from '~/utils';
import { ArgumentNullError } from '~/errors';

describe('Sorter', () => {
  function testWithDefaultComparator(algorithm: SORTING_TYPES) {
    const array = [9, 7, 2, 2, 5, 1];
    const sortedArray = [...array].sort();
    const result = Sorter.sort<number>(array, algorithm);
    expect(result).toMatchObject(sortedArray);
  }

  function testWithCustomComparator(algorithm: SORTING_TYPES) {
    const compareFn = (a: string, b: string): number => {
      if (a.length === b.length) {
        return 0;
      }
      return a.length > b.length ? 1 : -1;
    };
    const array = ['go', 'java', 'typescript', 'rust', 'python'];
    const sortedArray = [...array].sort(compareFn);
    const result = Sorter.sort(array, algorithm, new Comparator(compareFn));
    expect(result).toMatchObject(sortedArray);
  }

  test('error', () => {
    expect(() => {
      Sorter.sort([], JSON.parse('null'));
    }).toThrow(ArgumentNullError);
  });

  test('array.length < 2', () => {
    const empty = Sorter.sort([], SORTING_TYPES.INSERTION_SORT);
    const one = Sorter.sort([1], SORTING_TYPES.INSERTION_SORT);

    expect(empty).toMatchObject([]);
    expect(one).toMatchObject([1]);
  });

  test('insertion sort', () => {
    testWithDefaultComparator(SORTING_TYPES.INSERTION_SORT);
    testWithCustomComparator(SORTING_TYPES.INSERTION_SORT);
  });

  test('bubble sort', () => {
    testWithDefaultComparator(SORTING_TYPES.BUBBLE_SORT);
    testWithCustomComparator(SORTING_TYPES.BUBBLE_SORT);
  });

  test('merge sort', () => {
    testWithDefaultComparator(SORTING_TYPES.MERGE_SORT);
    testWithCustomComparator(SORTING_TYPES.MERGE_SORT);
  });

  test('quick sort', () => {
    testWithDefaultComparator(SORTING_TYPES.QUICK_SORT);
    testWithCustomComparator(SORTING_TYPES.QUICK_SORT);
  });

  test('heap sort', () => {
    testWithDefaultComparator(SORTING_TYPES.HEAP_SORT);
    testWithCustomComparator(SORTING_TYPES.HEAP_SORT);
  });
});
