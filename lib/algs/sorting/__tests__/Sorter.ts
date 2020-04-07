import { Sorter, SORTING_TYPES } from '../Sorter';
import { ArgumentNullError } from '../../../errors';

describe('Sorter', () => {
  let array = [9, 7, 2, 5, 1];
  let sortedArray = [...array].sort();

  test('error', () => {
    expect(() => {
      Sorter.sort([], JSON.parse('null'));
    }).toThrow(ArgumentNullError);
  });

  test('insertion sort', () => {
    const empty = Sorter.sort([], SORTING_TYPES.INSERTION_SORT);
    expect(empty).toMatchObject([]);

    const result = Sorter.sort(array, SORTING_TYPES.INSERTION_SORT);
    expect(result).toMatchObject(sortedArray);
  });

  test('merge sort', () => {
    const empty = Sorter.sort([], SORTING_TYPES.MERGE_SORT);
    expect(empty).toMatchObject([]);

    const result = Sorter.sort(array, SORTING_TYPES.MERGE_SORT);
    expect(result).toMatchObject(sortedArray);
  });
});
