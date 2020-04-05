import bind from 'bind-decorator';
import { ArgumentNullError, InvalidOperationError } from '../../errors';
import { Collection } from '../Collection';
import { LinkedListNode } from './LinkedListNode';

/**
 * Represents a doubly linked list.
 * @template T Specifies the element type of the linked list.
 * @implements {Collection<T>}
 */
export class LinkedList<T> implements Collection<T> {
  /**
   * Generates a LinkedList<T> from an array containing values of type T.
   * @param {T[]} array - An array containing elements of type T.
   * @returns {LinkedList[]} - The LinkedList<T> matching the array.
   */
  public static fromArray<E>(array: E[]): LinkedList<E> {
    const linkedList = new LinkedList<E>();
    array.forEach(item => {
      linkedList.add(item);
    });
    return linkedList;
  }

  /**
   * The number of nodes actually contained in the LinkedList<T>.
   */
  private _length: number = 0;
  public get length() {
    return this._length;
  }

  /**
   * The first node of the LinkedList<T>.
   */
  private _first: LinkedListNode<T> | null = null;
  public get first() {
    return this._first;
  }

  /**
   * The last node of the LinkedList<T>.
   */
  private _last: LinkedListNode<T> | null = null;
  public get last() {
    return this._last;
  }

  /**
   * Adds an item at the end of the LinkedList<T>.
   * @remarks Implements add() method from the Collection<T> interface. Invokes addLast methods from the same class.
   * @param {T} item - The object to add to the LinkedList<T>.
   */
  @bind
  public add(item: T): void {
    this.addLast(new LinkedListNode<T>(item));
  }

  /**
   * Adds the specified new node at the start of the LinkedList<T>.
   * @remarks If the LinkedList<T> is empty, the new node becomes the first and the last. This method is an O(1) operation.
   * @param {LinkedListNode<T>} node - The new LinkedListNode<T> to add at the start of the LinkedList<T>.
   * @throws {ArgumentNullError} - node is null.
   * @throws {InvalidOperationError} - node belongs to another list.
   */
  public addFirst(node: LinkedListNode<T>): void {
    if (!node) {
      throw new ArgumentNullError('node');
    }

    if (node.list !== null) {
      throw new InvalidOperationError(
        'node already belongs to another LinkedList<T>'
      );
    }

    if (this._first) {
      node.next = this._first;
      this._first = node;
    } else {
      this._first = node;
      this._last = node;
    }
    node.list = this;
    this._length++;
  }

  /**
   * Adds the specified new node at the end of the LinkedList<T>.
   * @remarks If the LinkedList<T> is empty, the new node becomes the first and the last. This method is an O(1) operation.
   * @param {LinkedListNode<T>} node - The new LinkedListNode<T> to add at the start of the LinkedList<T>.
   * @throws {ArgumentNullError} - node is null.
   * @throws {InvalidOperationError} - node belongs to another list.
   */
  public addLast(node: LinkedListNode<T>): void {
    if (!node) {
      throw new ArgumentNullError('node');
    }

    if (node.list !== null) {
      throw new InvalidOperationError(
        'node already belongs to another LinkedList<T>'
      );
    }

    if (this._last) {
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
   * Adds the specified new node or value T after the specified existing node in the LinkedList<T>.
   * @remarks This method is an O(1) operation.
   * @param {LinkedListNode<T> | T} newItem - The new LinkedListNode<T> or T to add to the LinkedList<T>.
   * @param {LinkedListNode<T>} node - The LinkedListNode<T> after which to insert newItem.
   * @throws {InvalidOperationError} - newItem belongs to another list.
   */
  public addAfter(newItem: LinkedListNode<T>, node: LinkedListNode<T>): void;
  public addAfter(newItem: T, node: LinkedListNode<T>): void;
  public addAfter(newItem: any, node: LinkedListNode<T>): void {
    if (newItem instanceof LinkedListNode && newItem.list) {
      throw new InvalidOperationError(
        'node already belongs to another DoublyLinkedList<T>'
      );
    }
    if (node.list !== this || this._length === 0) {
      throw new InvalidOperationError('node is not in the list');
    }

    const newNode =
      newItem instanceof LinkedListNode
        ? newItem
        : new LinkedListNode<T>(newItem);
    const temp = node.next;
    node.next = newNode;
    newNode.next = temp;
    newNode.list = this;
    this._length++;
    if (newNode.next === null) {
      this._last = newNode;
    }
  }

  /**
   * Removes the node at the start of the LinkedList<T>.
   * @remarks This method is an O(1) operation.
   * @throws {InvalidOperationError} - The LinkedList<T> is empty.
   */
  public removeFirst(): void {
    if (this._first) {
      const prevFirst = this._first;
      if (this._first.next) {
        this._first = this._first.next;
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
   * Removes the node at the end of the LinkedList<T>.
   * @remarks This method is an O(n) operation where n is length.
   * @throws {InvalidOperationError} - The LinkedList<T> is empty.
   */
  public removeLast(): void {
    if (this._first && this._last) {
      this._last.list = null;
      this._length--;

      if (this._first.next === null) {
        this._first = null;
        this._last = null;
      } else {
        let curr = this._first;
        while (curr.next?.next) {
          curr = curr.next;
        }
        curr.next = null;
        this._last = curr;
      }
    } else {
      throw new InvalidOperationError('List is empty');
    }
  }

  /**
   * Removes the first occurrence of a node or value from the LinkedList<T>.
   * @remarks This method is an O(n) operation where n is length.
   * @param {T | LinkedListNode<T>} item - The new item to add at the start of the LinkedList<T>.
   * @throws {ArgumentNullError} - item is null.
   * @throws {InvalidOperationError} - item is not in the current LinkedList<T>.
   */
  public remove(item: T): void;
  public remove(item: LinkedListNode<T>): void;
  public remove(item: any): void {
    if (item == null) {
      throw new ArgumentNullError('item');
    }

    let curr = this._first;
    let currPrev: LinkedListNode<T> | null = null;
    while (curr) {
      if (item instanceof LinkedListNode) {
        if (item === curr) {
          return this.removeNode(curr, currPrev);
        }
      } else {
        if (item === curr.value) {
          return this.removeNode(curr, currPrev);
        }
      }
      currPrev = curr;
      curr = curr.next;
    }

    throw new InvalidOperationError('Item not found');
  }

  /**
   * Removes all nodes from the DoublyLinkedList<T>.
   * @remarks Length is set to zero, all node are uncupled from the list. first and last are set to null.
   * This method is an O(n) operation, where n is Count.
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
   * Determines whether a value is in the LinkedList<T>.
   * @remarks This method is an O(n) operation, where n is length.
   * @param {T} item - The value to locate in the LinkedList<T>.
   * @returns {boolean} - true if value is found in the LinkedList<T>; otherwise, false.
   */
  public contains(item: T): boolean {
    let curr = this._first;
    while (curr) {
      if (curr.value === item) {
        return true;
      }
      curr = curr.next;
    }
    return false;
  }

  /**
   * Finds the first node that contains the specified value.
   * @remarks This method is an O(n) operation, where n is length.
   * @param {T} item - The value to locate in the LinkedList<T>.
   * @returns {LinkedListNode<T>} - The first LinkedListNode<T> that contains the specified value, if found; otherwise, null.
   */
  public find(item: T): LinkedListNode<T> | null {
    let curr = this._first;
    while (curr) {
      if (curr.value === item) {
        return curr;
      }
      curr = curr.next;
    }
    return null;
  }

  /**
   * Returns an array containing all of the nodes values in the LinkedList<T> in proper sequence.
   * @remarks This method is an O(n) operation, where n is the array length.
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
   * Reverses the sequence of nodes in the LinkedList<T>
   */
  public reverse(): void {
    if (this._first?.next) {
      let curr: LinkedListNode<T> | null = this._first.next;
      this._first.next = null; // initial first becomes last
      while (curr) {
        let nextCurr: LinkedListNode<T> | null = curr.next;
        let prevFirst = this._first;
        this._first = curr;
        this._first.next = prevFirst;
        curr = nextCurr;
      }
    }
  }

  /**
   * Sorts the elements of the LinkedList<T>.
   * @param compareFn Specifies a function that defines the sort order.
   * Defaults to JavaScript equals, grater than and less then operators on node.value.
   * @param {LinkedListNode<E>} compareFn.firstEl - First element to compare.
   * @param {LinkedListNode<E>} compareFn.secondEl - Second element to compare.
   */
  @bind
  public sort(compareFn = this.defaultCompareFn): void {
    function mergeSort(
      head: LinkedListNode<T> | null
    ): LinkedListNode<T> | null {
      if (!head || !head.next) {
        return head;
      }
      let second = split(head);
      head = mergeSort(head);
      second = mergeSort(second);
      return merge(head, second);
    }
    function merge(
      first: LinkedListNode<T> | null,
      second: LinkedListNode<T> | null
    ): LinkedListNode<T> | null {
      if (!first) {
        return second;
      }
      if (!second) {
        return first;
      }

      if (compareFn(first, second) < 0) {
        first.next = merge(first.next, second);
        return first;
      } else {
        second.next = merge(first, second.next);
        return second;
      }
    }
    function split(head: LinkedListNode<T>) {
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
   * @param {LinkedListNode<E>} firstEl - First element to compare.
   * @param {LinkedListNode<E>} secondEl - Second element to compare.
   * @returns less than 0, sort firstEl to an index lower than secondEl, returns 0, leave both unchanged with respect to each other,
   * returns greater than 0, sort firstEl to an index lower than secondEl
   */
  private defaultCompareFn(
    firstEl: LinkedListNode<T> | null,
    secondEl: LinkedListNode<T> | null
  ): number {
    if (firstEl == null || firstEl.value == null) return 1;
    if (secondEl == null || secondEl.value == null) return -1;
    if (firstEl.value === secondEl.value) return 0;
    return firstEl.value < secondEl.value ? -1 : +1;
  }

  /**
   * Implements the iteration behavior for the LinkedList<T>;
   */
  [Symbol.iterator]() {
    let nextNode: LinkedListNode<T> | null = this._first;
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
   * Removes a node from the LinkedList<T>
   * @param {LinkedListNode<T>} node - The node to remove from the LinkedList<T>.
   * @param {LinkedListNode<T>} prevNode - The node before the one to remove from the LinkedList<T>.
   */
  private removeNode(
    node: LinkedListNode<T>,
    prevNode: LinkedListNode<T> | null
  ): void {
    if (node.list === null) {
      throw new InvalidOperationError('Node does not belong to any list.');
    }
    if (prevNode && node.next) {
      prevNode.next = node.next;
    } else if (prevNode && node.next === null) {
      this._last = prevNode;
      prevNode.next = null;
    } else if (prevNode === null && node.next) {
      this._first = node.next;
    } else if (prevNode === null && node.next === null) {
      this._first = null;
      this._last = null;
    }
    node.next = null;
    node.list = null;
    this._length--;
  }
}
