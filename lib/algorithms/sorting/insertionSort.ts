import { Comparator } from '../../../utils/comparator/Comparator';

/**
 * Insertion sort is a simple sorting algorithm that builds the final sorted array (or list) one item at a time.
 * @remarks
 * Best-case performance	O(n) comparisons, O(1) swaps;
 * Worst-case performance	О(n^2) comparisons and swaps;
 * Average performance	О(n^2) comparisons and swaps;
 * Space complexity	О(1). (Example is O(n) since we don't want to mutete the original array)
 */
export default function <T>(array: T[], compare: Comparator<T>): T[] {
  const arr = [...array];

  for (let j = 1; j < arr.length; ++j) {
    const key = arr[j];
    let i = j - 1;
    while (i >= 0 && compare.gt(arr[i], key)) {
      arr[i + 1] = arr[i];
      i--;
    }
    arr[i + 1] = key;
  }

  return arr;
}
