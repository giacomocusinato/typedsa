import bind from 'bind-decorator';
import { DoublyLinkedList, LinkedList, LinkedListNode } from '~/ds';
import { InvalidOperationError } from '~/errors';

/**
 * Represents a simple last-in-first-out (LIFO) non-generic collection of objects.
 */
export class Stack<T> {
  private linkedList = new LinkedList<T>();

  /**
   * The number of elements actually contained in the Stack<T>.
   */
  public get length() {
    return this.linkedList.length;
  }

  constructor(list: LinkedList<T> | DoublyLinkedList<T> | null = null) {
    if (list && list.length) {
      let curr = list.first;
      while (curr) {
        this.linkedList.add(curr.value);
        curr = curr.next;
      }
    }
  }

  /**
   * Inserts an object at the top of the Stack<T>.
   * @params {T} item - The object oush on the Stack<T>.
   * @remarks This method is an O(1) operation.
   */
  @bind
  public push(item: T): void {
    this.linkedList.addFirst(new LinkedListNode(item));
  }

  /**
   * Returns the element at the top of the Stack<T> without removing it.
   * @returns The element at the top of the Stack<T>.
   * @throws {InvalidOperationError} - The Stack<T> is empty.
   * @remarks This method is similar to the Pop method, but Peek does not modify the Stack<T>.
   * This method is an O(1) operation.
   */
  @bind
  public peek(): T {
    if (this.linkedList.first) {
      return this.linkedList.first.value;
    }
    throw new InvalidOperationError('Stack is empty');
  }

  /**
   * Removes and returns the first element of the Stack<T>.
   * @remarks This method is an O(1) operation.
   */
  @bind
  public pop(): T {
    if (this.linkedList.first) {
      const element = this.linkedList.first.value;
      this.linkedList.removeFirst();
      return element;
    }
    throw new InvalidOperationError('Stack is empty');
  }

  /**
   * Removes all the elements from the Stack<T>.
   * @remarks This operation is a O(n) operation where n is the length of the Stack<T>.
   */
  @bind
  public clear(): void {
    this.linkedList.clear();
  }

  /**
   * Determines whether a value is in the Stack<T>.
   * @param {T} item - The value to locate in the Stack<T>.
   * @returns {boolean} - true if value is found in the Stack<T>; otherwise, false.
   * @remarks This operation is a O(n) operation where n is the length of the Stack<T>.
   */
  @bind
  public contains(item: T): boolean {
    return this.linkedList.contains(item);
  }

  /**
   * Copies the Stack<T> to an array.
   * @returns {T[]} - An array matching the Stack<T>.
   * @remarks This operation is a O(n) operation where n is the length of the Stack<T>.
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
