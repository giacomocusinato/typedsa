import { Comparator } from '~/utils';

/**
 * Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list,
 * compares adjacent elements and swaps them if they are in the wrong order.
 * @remarks
 * Worst-case performance	O(n^2) comparisons, O(n^2) swaps
 * Best-case performance	O(n) comparisons, O(1) swaps
 * Average performance	O(n^2) comparisons, O(n^2) swaps
 * Worst-case space complexity O(1)
 */
export default function <T>(array: T[], compare: Comparator<T>) {
  const arr = [...array];

  for (let i = 0; i < arr.length - 1; ++i) {
    for (let j = 0; j < arr.length - i - 1; ++j) {
      if (compare.gt(arr[j], arr[j + 1])) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}
