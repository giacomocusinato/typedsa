import { LinkedList } from './LinkedList';

/**
 * Represents a node in a LinkedList<T>. This class cannot be inherited.
 * @template T Specifies the element type of the linked list.
 */
export class LinkedListNode<T> {
  /**
   * The next node in the LinkedList<T>.
   * @field
   */
  public next: LinkedListNode<T> | null = null;

  /**
   * The LinkedList<T> the node belongs to.
   */
  public list: LinkedList<T> | null = null;

  /**
   * The number of nodes actually contained in the LinkedList<T>.
   * @constructor
   * @param {T} value - The value contained in the node.
   */
  constructor(public value: T) {}

  /**
   * Clear all LinkedListNode<T> external dependencies.
   */
  public uncouple(): void {
    this.next = null;
    this.list = null;
  }
}
