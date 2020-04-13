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
  const arr = [...array];

  function maxHeapify(arr: T[], n: number, i: number) {
    let toSwap = i;
    const left = i * 2 + 1;
    const right = i * 2 + 2;
    if (left < n && compare.gt(arr[left], arr[toSwap])) {
      toSwap = left;
    }

    if (right < n && compare.gt(arr[right], arr[toSwap])) {
      toSwap = right;
    }

    if (toSwap !== i) {
      const temp = arr[i];
      arr[i] = arr[toSwap];
      arr[toSwap] = temp;
      maxHeapify(arr, n, toSwap);
    }
  }

  function buildMaxHeap(arr: T[]) {
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; --i) {
      maxHeapify(arr, arr.length, i);
    }
  }

  buildMaxHeap(arr);

  for (let i = arr.length - 1; i > 0; --i) {
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    maxHeapify(arr, i, 0);
  }

  return arr;
}
