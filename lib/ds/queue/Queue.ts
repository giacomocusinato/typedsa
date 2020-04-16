import bind from 'bind-decorator';
import { InvalidOperationError } from 'typedsa/errors';
import { LinkedList, LinkedListNode } from '..';

/**
 * Represents a first-in, first-out collection of objects.
 */
export class Queue<T> {
  private linkedList = new LinkedList<T>();

  /**
   * The number of elements actually contained in the Queue<T>.
   */
  public get length() {
    return this.linkedList.length;
  }

  /**
   * Add an element at the end of the Queue<T>.
   * @params {T} item - The element to add to the Queue<T>.
   * @remarks This method is an O(1) operation.
   */
  @bind
  public enqueue(item: T): void {
    this.linkedList.addLast(new LinkedListNode(item));
  }

  /**
   * Returns the first element of the Queue<T> without removing it.
   * @returns The first element of the Queue<T>.
   * @throws {InvalidOperationError} - The Queue<T> is empty.
   * @remarks This method is similar to the pop method, but peek does not modify the Queue<T>.
   * This method is an O(1) operation.
   */
  @bind
  public peek(): T {
    if (this.linkedList.first) {
      return this.linkedList.first.value;
    }
    throw new InvalidOperationError('Queue is empty');
  }

  /**
   * Removes and returns the element at the beginning Queue<T>.
   * @params {T} item - The object that is removed from the Queue<T>.
   * @remarks This method is an O(1) operation.
   */
  @bind
  public dequeue(): T {
    if (this.linkedList.first) {
      const element = this.linkedList.first.value;
      this.linkedList.removeFirst();
      return element;
    }
    throw new InvalidOperationError('Queue is empty');
  }

  /**
   * Removes all the elements from the Queue<T>.
   * @remarks This operation is a O(n) operation where n is the length of the Queue<T>.
   */
  @bind
  public clear(): void {
    this.linkedList.clear();
  }

  /**
   * Determines whether a value is in the Queue<T>.
   * @param {T} item - The value to locate in the Queue<T>.
   * @returns {boolean} - true if value is found in the Queue<T>; otherwise, false.
   * @remarks This operation is a O(n) operation where n is the length of the Queue<T>.
   */
  @bind
  public contains(item: T): boolean {
    return this.linkedList.contains(item);
  }

  /**
   * Copies the Queue<T> to an array.
   * @returns {T[]} - An array matching the Queue<T>.
   * @remarks This operation is a O(n) operation where n is the length of the Queue<T>.
   */
  @bind
  public toArray(): T[] {
    const array: T[] = [];
    for (const node of this.linkedList) {
      array.push(node.value);
    }
    return array;
  }
}
