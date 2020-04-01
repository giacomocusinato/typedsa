import { Collection } from '../Collection';
import { DoublyLinkedListNode } from './DoublyLinkedListNode';
import { ArgumentNullError, InvalidOperationError } from '../../errors';

/**
 * Represents a doubly linked list.
 * @template T Specifies the element type of the linked list.
 * @implements {Collection<T>}
 */
export class DoublyLinkedList<T> implements Collection<T> {
  /**
   * Generates a DoublyLinkedList<T> from an array containing values of type T.
   * @param {T[]} array - An array containing elements of type T.
   * @returns {DoublyLinkedList[]} - The DoublyLinkedList<T> matching the array.
   */
  public static fromArray<E>(array: E[]): DoublyLinkedList<E> {
    const doublyLinkedList = new DoublyLinkedList<E>();
    array.forEach(item => {
      doublyLinkedList.add(item);
    });
    return doublyLinkedList;
  }

  /**
   * The number of nodes actually contained in the DoublyLinkedList<T>.
   */
  private _length: number = 0;
  public get length() {
    return this._length;
  }

  /**
   * The first node of the DoublyLinkedList<T>.
   */
  private _first: DoublyLinkedListNode<T> | null = null;
  public get first() {
    return this._first;
  }

  /**
   * The last node of the DoublyLinkedList<T>.
   */
  private _last: DoublyLinkedListNode<T> | null = null;
  public get last() {
    return this._last;
  }

  /**
   * Adds the specified new node at the start of the DoublyLinkedList<T>.
   * @param {DoublyLinkedListNode<T>} node - The new DoublyLinkedListNode<T> to add at the start of the DoublyLinkedList<T>.
   * @throws {ArgumentNullError} - node is null.
   * @throws {InvalidOperationError} - node belongs to another list.
   */
  public addFirst(node: DoublyLinkedListNode<T>): void {
    if (!node) {
      throw new ArgumentNullError('node');
    }

    if (node.list !== null) {
      throw new InvalidOperationError(
        'node already belongs to another DoublyLinkedList<T>'
      );
    }

    if (this._first) {
      node.next = this._first;
      this._first.prev = node;
      this._first = node;
    } else {
      this._first = node;
      this._last = node;
    }
    node.list = this;
    this._length++;
  }

  /**
   * Adds the specified new node at the end of the DoublyLinkedList<T>.
   * @param {DoublyLinkedListNode<T>} node - The new DoublyLinkedListNode<T> to add at the start of the DoublyLinkedList<T>.
   * @throws {ArgumentNullError} - node is null.
   * @throws {InvalidOperationError} - node belongs to another list.
   */
  public addLast(node: DoublyLinkedListNode<T>): void {
    if (!node) {
      throw new ArgumentNullError('node');
    }

    if (node.list !== null) {
      throw new InvalidOperationError(
        'node already belongs to another DoublyLinkedList<T>'
      );
    }

    if (this._last) {
      node.prev = this._last;
      this._last.next = node;
      this._last = node;
    } else {
      this._first = node;
      this._last = node;
    }
    node.list = this;
    this._length++;
  }

  /**
   * Adds an item at the end of the DoublyLinkedList<T>.
   *
   * @remarks
   * Implements add() method from the Collection<T> interface.
   *
   * @param {T} item - The object to add to the DoublyLinkedList<T>.
   */
  public add(item: T): void {
    this.addLast(new DoublyLinkedListNode<T>(item));
  }

  /**
   * Removes the node at the start of the DoublyLinkedList<T>.
   * @throws {InvalidOperationError} - The DoublyLinkedList<T> is empty.
   */
  public removeFirst(): void {
    if (this._first) {
      const prevFirst = this._first;
      if (this._first.next) {
        this._first = this._first.next;
        this._first.prev = null;
      } else {
        this._first = null;
        this._last = null;
      }
      prevFirst.next = null;
      prevFirst.list = null;
      this._length--;
    } else {
      throw new InvalidOperationError('List is empty');
    }
  }

  /**
   * Removes the node at the end of the DoublyLinkedList<T>.
   * @throws {InvalidOperationError} - The DoublyLinkedList<T> is empty.
   */
  public removeLast(): void {
    if (this._last) {
      const prevLast = this._last;
      if (this._last.prev) {
        this._last = this._last.prev;
        this._last.next = null;
      } else {
        this._last = null;
        this._first = null;
      }
      prevLast.prev = null;
      prevLast.list = null;
      this._length--;
    } else {
      throw new InvalidOperationError('List is empty');
    }
  }

  /**
   * Removes the first occurrence of a node or value from the DoublyLinkedList<T>.
   * @param {T | DoublyLinkedListNode<T>} item - The new item to add at the start of the DoublyLinkedList<T>.
   * @throws {ArgumentNullError} - item is null.
   * @throws {InvalidOperationError} - item is not in the current DoublyLinkedList<T>.
   */
  public remove(item: T): void;
  public remove(item: DoublyLinkedListNode<T>): void;
  public remove(item: any): void {
    if (item == null) {
      throw new ArgumentNullError('item');
    }

    let curr = this._first;
    while (curr) {
      if (item instanceof DoublyLinkedListNode) {
        if (item.value == curr.value) {
          return this.removeNode(curr);
        }
      } else {
        if (item == curr.value) {
          return this.removeNode(curr);
        }
      }
      curr = curr.next;
    }

    throw new InvalidOperationError('Item not found');
  }

  /**
   * Removes all nodes from the DoublyLinkedList<T>.
   * Implements add() method from the Collection<T> interface.
   */
  public clear(): void {
    let curr = this._first;
    while (curr) {
      const node = curr;
      curr = curr.next;
      node.uncouple();
    }

    this._first = null;
    this._last = null;
    this._length = 0;
  }

  /**
   * Determines whether a value is in the DoublyLinkedList<T>.
   * Implements contains() method from the Collection<T> interface.
   * @param {T} item - The value to locate in the DoublyLinkedList<T>.
   * @returns {boolean} - true if value is found in the DoublyLinkedList<T>; otherwise, false.
   */
  public contains(item: T): boolean {
    let curr = this._first;
    while (curr) {
      if (curr.value == item) {
        return true;
      }
      curr = curr.next;
    }
    return false;
  }

  /**
   * Finds the first node that contains the specified value.
   * @param {T} item - The value to locate in the DoublyLinkedList<T>.
   * @returns {DoublyLinkedListNode<T>} - The first DoublyLinkedListNode<T> that contains the specified value, if found; otherwise, null.
   */
  public find(item: T): DoublyLinkedListNode<T> | null {
    let curr = this._first;
    while (curr) {
      if (curr.value == item) {
        return curr;
      }
      curr = curr.next;
    }
    return null;
  }

  /**
   * Returns an array containing all of the nodes values in the DoublyLinkedList<T> in proper sequence.
   * @returns {T[]} - The array containing all the nodes values.
   */
  public toArray(): T[] {
    const array = [];
    let curr = this._first;
    while (curr) {
      array.push(curr.value);
      curr = curr.next;
    }
    return array;
  }

  /**
   * Reverses the sequence of nodes in the DoublyLinkedList<T>
   */
  public reverse(): void {
    if (this._length > 1) {
      let curr = this._first;
      let temp: DoublyLinkedListNode<T> | null = null;
      while (curr) {
        temp = curr.prev;
        curr.prev = curr.next;
        curr.next = temp;
        curr = curr.prev;
      }
      temp = this._first;
      this._first = this._last;
      this._last = temp;
    }
  }

  /**
   * Implements the iteration behavior for the DoublyLinkedList<T>;
   */
  [Symbol.iterator]() {
    let nextNode: DoublyLinkedListNode<T> | null = this._first;
    return {
      next() {
        if (nextNode == null) return { done: true };

        const value = nextNode;
        nextNode = nextNode.next;

        return { value, done: false };
      }
    };
  }

  /**
   * Removes a node from the DoublyLinkedList<T>
   * @param {DoublyLinkedListNode<T>} node - The node to remove from the DoublyLinkedList<T>.
   */
  private removeNode(node: DoublyLinkedListNode<T>): void {
    if (!node.list) {
      throw new InvalidOperationError('Node does not belong to any list.');
    }
    if (node.prev && node.next) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    } else if (node.next) {
      node.next.prev = null;
      this._first = node.next;
    } else if (node.prev) {
      node.prev.next = null;
      this._last = node.prev;
    } else {
      this._first = null;
      this._last = null;
    }
    node.next = null;
    node.prev = null;
    node.list = null;
    this._length--;
  }
}
