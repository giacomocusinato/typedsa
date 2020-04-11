import bind from 'bind-decorator';
import { InvalidOperationError } from '~/errors';

/**
 * Represents a heap.
 * @template T Specifies the element type of the heap.
 */
export abstract class Heap<T> {
  private _heap: T[] = [];

  /**
   * The number of nodes actually contained in the Heap<T>.
   */
  public get length() {
    /**
     * The heap items container.
     */
    return this._heap.length;
  }

  /**
   * Checks weather the Heap is a Complete Binary Tree.
   */
  public get isComplete(): boolean {
    const heapHeight = Math.floor(Math.log2(this._heap.length + 1));
    return Math.log2(this._heap.length + 1) === heapHeight;
  }

  /**
   * @remarks
   * This method is an O(n*log(n)) operation if an optional array of length n is provided.
   */
  constructor(arr: T[] = []) {
    if (arr.length > 1) {
      arr.forEach((item) => {
        this.push(item);
      });
    }
  }

  /**
   * Adds the specified new node on the ordered Heap<T>.
   * @remarks
   * Once the item has been pushed, it's ordered based on the logic specified
   * on the isCorrectOrder method. This method is an O(log(n)) operation.
   * @param {T} item - The new item to add to the heap.
   */
  @bind
  public push(item: T): void {
    this._heap.push(item);
    this.heapifyUp(this._heap.length - 1);
  }

  /**
   * Gets and removes the root item (first-in-line) on the Heap<T>.
   * @remarks
   * Once the item has been removed, the it's re-ordered based on the logic specified
   * on the isCorrectOrder method. This method is an O(log(n)) operation.
   * @returns {T} item - The root of the Heap<T>.
   * @throws {InvalidOperationError} - The heap is empty.
   */
  @bind
  public pop(): T {
    if (this._heap.length === 0) {
      throw new InvalidOperationError('The heap is empty');
    }
    const root = this._heap[0];
    this.swap(0, this._heap.length - 1);
    this._heap.pop();

    if (this._heap.length) {
      this.heapifyDown(0);
    }

    return root;
  }

  /**
   * Converts the binary tree in a heap checking that each level of the tree
   * satisfy the heap-order property, bottom to top.
   * @remarks This method is an O(log(n)) operation.
   */
  private heapifyUp(index: number) {
    const parentIndex = this.getParent(index);

    if (
      parentIndex >= 0 &&
      !this.isCorrectOrder(this._heap[parentIndex], this._heap[index])
    ) {
      this.swap(index, parentIndex);
      this.heapifyUp(parentIndex);
    }
  }

  /**
   * Same priciples as hepifyUp, but operating top to bottom.
   * @remarks This method is an O(log(n)) operation.
   */
  private heapifyDown(index: number) {
    let indexToSwap = index;

    const leftIndex = this.getLeft(index);
    const rightIndex = this.getRight(index);

    if (
      leftIndex < this._heap.length &&
      !this.isCorrectOrder(this._heap[indexToSwap], this._heap[leftIndex])
    ) {
      indexToSwap = leftIndex;
    }

    if (
      rightIndex < this._heap.length &&
      !this.isCorrectOrder(this._heap[indexToSwap], this._heap[rightIndex])
    ) {
      indexToSwap = rightIndex;
    }

    if (indexToSwap !== index) {
      this.swap(index, indexToSwap);
      this.heapifyDown(indexToSwap);
    }
  }

  protected abstract isCorrectOrder(item: T, itemCompare: T): boolean;

  /**
   * Gets the left child index.
   * @remarks Returned index needs to be validated afterwards.
   */
  private getLeft(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  /**
   * Gets the right child index.
   * @remarks Returned index needs to be validated afterwards.
   */
  private getRight(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  /**
   * Gets the parent index.
   * @remarks Returned index needs to be validated afterwards.
   */
  private getParent(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * Swaps two items, given their indexes, in the Heap<T>.
   * @remarks This method is an O(1) operation.
   */
  private swap(firstIndex: number, secondIndex: number) {
    const temp = this._heap[firstIndex];
    this._heap[firstIndex] = this._heap[secondIndex];
    this._heap[secondIndex] = temp;
  }

  /**
   * Returns the heap-like array that matched the Heap<T>.
   * @remarks This method is an O(1) operation.
   */
  public toArray(): T[] {
    return [...this._heap];
  }
}
