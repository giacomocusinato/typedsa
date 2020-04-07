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
export default function <T>(array: T[]) {
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
    const ordered: T[] = new Array(leftArray.length + rightArray.length);
    let leftIndex = 0;
    let rightIndex = 0;
    for (let i = 0; i < ordered.length; ++i) {
      if (
        rightIndex === rightArray.length ||
        leftArray[leftIndex] <= rightArray[rightIndex]
      ) {
        ordered[i] = leftArray[leftIndex];
        leftIndex++;
      } else {
        ordered[i] = rightArray[rightIndex];
        rightIndex++;
      }
    }
    return ordered;
  }

  return mergeSort(arr);
}
