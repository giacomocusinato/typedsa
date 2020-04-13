import { Comparator } from '~/utils';

/**
 * Merge sort is an efficient, general-purpose, comparison-based sorting algorithm based on the divide and conquer paradigm.
 * @remarks
 * Worst-case performance	O(n*log(n))
 * Best-case performance	O(n*log(n)) typical, O(n) natural variant
 * Average performance	O(n*log(n))
 * Worst-case space complexity	О(n) an arrays, O(1) with linked lists.
 *
 * See lib/data-structures/linked-list/LinkedList.sort for a LinkedList implementation of merge sort.
 */
export default function <T>(array: T[], compare: Comparator<T>) {
  const arr = [...array];

  function mergeSort(array: T[]): T[] {
    if (array.length < 2) {
      return array;
    }
    const left = mergeSort(array.splice(0, array.length / 2));
    const right = mergeSort(array);
    return merge(left, right);
  }

  function merge(leftArray: T[], rightArray: T[]): T[] {
    const ordered: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex + rightIndex < leftArray.length + rightArray.length) {
      const leftItem = leftArray[leftIndex];
      const rightItem = rightArray[rightIndex];
      if (leftItem == null) {
        ordered.push(rightItem);
        rightIndex++;
      } else if (rightItem == null) {
        ordered.push(leftItem);
        leftIndex++;
      } else if (compare.lte(leftItem, rightItem)) {
        ordered.push(leftItem);
        leftIndex++;
      } else {
        ordered.push(rightItem);
        rightIndex++;
      }
    }

    return ordered;
  }
  return mergeSort(arr);
}
