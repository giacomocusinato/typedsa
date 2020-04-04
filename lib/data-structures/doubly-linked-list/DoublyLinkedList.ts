import bind from 'bind-decorator';
import { ArgumentNullError, InvalidOperationError } from '../../errors';
import { Collection } from '../Collection';
import { DoublyLinkedListNode } from './DoublyLinkedListNode';

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
   * Adds an item at the end of the DoublyLinkedList<T>.
   * @remarks Implements add() method from the Collection<T> interface. Invokes addLast methods from the same class.
   * @param {T} item - The object to add to the DoublyLinkedList<T>.
   */
  @bind
  public add(item: T): void {
    this.addLast(new DoublyLinkedListNode<T>(item));
  }

  /**
   * Adds the specified new node at the start of the DoublyLinkedList<T>.
   * @remarks If the LinkedList<T> is empty, the new node becomes the first and the last. This method is an O(1) operation.
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
   * @remarks If the LinkedList<T> is empty, the new node becomes the first and the last. This method is an O(1) operation.
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
   * Adds the specified new node or value T after the specified existing node in the DoublyLinkedList<T>.
   * @remarks This method is an O(1) operation.
   * @param {DoublyLinkedListNode<T> | T} newItem - The new LinkedListNode<T> or T to add to the LinkedList<T>.
   * @param {DoublyLinkedListNode<T>} node - The LinkedListNode<T> after which to insert newItem.
   * @throws {InvalidOperationError} - node is not in the current list -or- newItem belongs to another list.
   */
  public addAfter(
    newItem: DoublyLinkedListNode<T>,
    node: DoublyLinkedListNode<T>
  ): void;
  public addAfter(newItem: T, node: DoublyLinkedListNode<T>): void;
  public addAfter(newItem: any, node: DoublyLinkedListNode<T>): void {
    if (newItem instanceof DoublyLinkedListNode && newItem.list) {
      throw new InvalidOperationError(
        'node already belongs to another DoublyLinkedList<T>'
      );
    }
    if (node.list !== this || this._length === 0) {
      throw new InvalidOperationError('node is not in the list');
    }

    const newNode =
      newItem instanceof DoublyLinkedListNode
        ? newItem
        : new DoublyLinkedListNode<T>(newItem);
    const temp = node.next;
    node.next = newNode;
    newNode.prev = node;
    newNode.next = temp;
    newNode.list = this;
    this._length++;
    if (newNode.next === null) {
      this._last = newNode;
    }
  }

  /**
   * Adds the specified new node or value T before the specified existing node in the DoublyLinkedList<T>.
   * @remarks This method is an O(1) operation.
   * @param {DoublyLinkedListNode<T> | T} newItem - The new LinkedListNode<T> or T to add to the LinkedList<T>.
   * @param {DoublyLinkedListNode<T>} node - The LinkedListNode<T> before which to insert newItem.
   * @throws {InvalidOperationError} - node is not in the current list -or- newItem belongs to another list.
   */
  public addBefore(
    newItem: DoublyLinkedListNode<T>,
    node: DoublyLinkedListNode<T>
  ): void;
  public addBefore(newItem: T, node: DoublyLinkedListNode<T>): void;
  public addBefore(newItem: any, node: DoublyLinkedListNode<T>): void {
    if (newItem instanceof DoublyLinkedListNode && newItem.list) {
      throw new InvalidOperationError(
        'node already belongs to another DoublyLinkedList<T>'
      );
    }
    if (node.list !== this || this._length === 0) {
      throw new InvalidOperationError('node is not in the list');
    }

    const newNode =
      newItem instanceof DoublyLinkedListNode
        ? newItem
        : new DoublyLinkedListNode<T>(newItem);
    const temp = node.prev;
    node.prev = newNode;
    newNode.next = node;
    newNode.prev = temp;
    newNode.list = this;
    this._length++;
    if (newNode.prev === null) {
      this._first = newNode;
    }
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
   * Sorts the elements of the DoublyLinkedList<T>.
   * @param compareFn Specifies a function that defines the sort order.
   * Defaults to JavaScript equals, grater than and less then operators on node.value.
   * @param {DoublyLinkedListNode<E>} compareFn.firstEl - First element to compare.
   * @param {DoublyLinkedListNode<E>} compareFn.secondEl - Second element to compare.
   */
  @bind
  public sort(compareFn = this.defaultCompareFn): void {
    function mergeSort(
      head: DoublyLinkedListNode<T> | null
    ): DoublyLinkedListNode<T> | null {
      if (!head || !head.next) {
        return head;
      }
      let second = split(head);
      head = mergeSort(head);
      second = mergeSort(second);
      return merge(head, second);
    }
    function merge(
      first: DoublyLinkedListNode<T> | null,
      second: DoublyLinkedListNode<T> | null
    ): DoublyLinkedListNode<T> | null {
      if (!first) {
        return second;
      }
      if (!second) {
        return first;
      }

      if (compareFn(first, second) < 0) {
        first.next = merge(first.next, second);
        if (first.next) first.next.prev = first;
        first.prev = null;
        return first;
      } else {
        second.next = merge(first, second.next);
        if (second.next) second.next.prev = second;
        second.prev = null;
        return second;
      }
    }
    function split(head: DoublyLinkedListNode<T>) {
      let fast = head;
      let slow = head;
      while (fast.next && fast.next.next && slow.next) {
        fast = fast.next.next;
        slow = slow.next;
      }
      const temp = slow.next;
      slow.next = null;
      return temp;
    }

    this._first = mergeSort(this._first);
    let curr = this._first;
    while (curr) {
      if (curr.next == null) {
        this._last = curr;
      }
      curr = curr.next;
    }
  }

  /**
   * Compare two nodes based on the value propery.
   * @remarks Same implementation as Array.prototype.sort() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
   * @param {DoublyLinkedListNode<E>} firstEl - First element to compare.
   * @param {DoublyLinkedListNode<E>} secondEl - Second element to compare.
   * @returns less than 0, sort firstEl to an index lower than secondEl, returns 0, leave both unchanged with respect to each other,
   * returns greater than 0, sort firstEl to an index lower than secondEl
   */
  private defaultCompareFn(
    firstEl: DoublyLinkedListNode<T> | null,
    secondEl: DoublyLinkedListNode<T> | null
  ): number {
    if (firstEl == null || firstEl.value == null) return 1;
    if (secondEl == null || secondEl.value == null) return -1;
    if (firstEl.value === secondEl.value) return 0;
    return firstEl.value < secondEl.value ? -1 : +1;
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
