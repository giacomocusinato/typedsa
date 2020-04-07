import { Comparator } from '../../utils/comparator/Comparator';
import sortingAlgorithms from './sorting-algorithms';
import { ArgumentNullError } from '../../errors';

export enum SORTING_TYPES {
  INSERTION_SORT,
  MERGE_SORT,
}

export class Sorter {
  /**
   * Sorts a typed array gived a sorting algorithm.
   * @param {T[]} array - The typed array to sort.
   * @param {SORTING_TYPES} sortingType - The algorithm type to perform the sorting.
   * @param {Comparator} comparator - The comparator logic to compare array elements.
   */
  static sort<T>(
    array: T[],
    sortingType: SORTING_TYPES,
    comparator: Comparator = new Comparator()
  ) {
    return Sorter.getSortingAlgorithm(sortingType)(array, comparator);
  }

  private static getSortingAlgorithm(sortingType: SORTING_TYPES) {
    switch (sortingType) {
      case SORTING_TYPES.INSERTION_SORT:
        return sortingAlgorithms.insertionSort;
      case SORTING_TYPES.MERGE_SORT:
        return sortingAlgorithms.mergeSort;
      default:
        throw new ArgumentNullError('sortingType');
    }
  }
}
