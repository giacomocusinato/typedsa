import { DoublyLinkedListNode } from '../DoublyLinkedListNode';
import { DoublyLinkedList } from '../DoublyLinkedList';

describe('DoublyLinkedList', () => {
  test('construct - empty', () => {
    const node = new DoublyLinkedListNode<number>(0);

    expect(node.value).toBe(0);
    expect(node.next).toBe(null);
    expect(node.prev).toBe(null);
  });

  test('construct - linked', () => {
    const node = new DoublyLinkedListNode<number>(1);
    const prev = new DoublyLinkedListNode<number>(0);
    const next = new DoublyLinkedListNode<number>(2);
    node.prev = prev;
    node.next = next;

    expect(node.next).toBeInstanceOf(DoublyLinkedListNode);
    expect(node.prev).toBeInstanceOf(DoublyLinkedListNode);
    expect(node.next.value).toBe(2);
    expect(node.prev.value).toBe(0);
  });

  test('clear', () => {
    const node = new DoublyLinkedListNode<number>(1);
    node.prev = new DoublyLinkedListNode<number>(0);
    node.next = new DoublyLinkedListNode<number>(2);
    node.list = new DoublyLinkedList<number>();
    node.uncouple();

    expect(node.prev).toBeNull();
    expect(node.next).toBeNull();
    expect(node.list).toBeNull();
  });
});
