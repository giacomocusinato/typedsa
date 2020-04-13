import { Comparator } from '~/utils';

/**
 * Like Merge Sort, QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot.
 * @remarks
 * Worst-case performance	O(n^2)
 * Best-case performance	O(n*log(n))
 * Average performance	O(n*log(n))
 * Worst-case space complexity	О(1)
 */
export default function <T>(array: T[], compare: Comparator<T>) {
  const t = [...array];

  function quickSort(arr: T[], low: number, high: number) {
    if (low < high) {
      const pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
  }
  function partition(arr: T[], low: number, high: number) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; ++j) {
      if (compare.lte(arr[j], pivot)) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
  }

  quickSort(t, 0, t.length - 1);
  return t;
}
