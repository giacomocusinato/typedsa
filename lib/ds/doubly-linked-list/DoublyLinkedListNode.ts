import { DoublyLinkedList } from '~/ds';

/**
 * Represents a node in a DoublyLinkedList<T>. This class cannot be inherited.
 * @template T Specifies the element type of the linked list.
 */
export class DoublyLinkedListNode<T> {
  /**
   * The next node in the DoublyLinkedList<T>.
   * @field
   */
  public next: DoublyLinkedListNode<T> | null = null;

  /**
   * The previous node in the DoublyLinkedList<T>.
   * @field
   */
  public prev: DoublyLinkedListNode<T> | null = null;

  /**
   * The DoublyLinkedList<T> the node belongs to.
   */
  public list: DoublyLinkedList<T> | null = null;

  /**
   * The number of nodes actually contained in the DoublyLinkedList<T>.
   * @constructor
   * @param {T} value - The value contained in the node.
   */
  constructor(public value: T) {}

  /**
   * Clear all DoublyLinkedListNode<T> external dependencies.
   */
  public uncouple(): void {
    this.next = null;
    this.prev = null;
    this.list = null;
  }
}
