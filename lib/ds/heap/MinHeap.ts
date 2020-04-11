import { Heap } from '~/ds';

/**
 * Represents a max heap.
 * @template T Specifies the element type of the max heap.
 */
export class MinHeap<T> extends Heap<T> {
  protected isCorrectOrder(item: T, itemCompare: T): boolean {
    return item <= itemCompare;
  }
}
