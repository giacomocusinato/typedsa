import { LinkedList } from '../LinkedList';
import { LinkedListNode } from '../LinkedListNode';

describe('LinkedList', () => {
  test('construct - empty', () => {
    const node = new LinkedListNode<number>(0);

    expect(node.value).toBe(0);
    expect(node.next).toBe(null);
  });

  test('construct - linked', () => {
    const node = new LinkedListNode<number>(1);
    const prev = new LinkedListNode<number>(0);
    const next = new LinkedListNode<number>(2);
    node.next = next;

    expect(node.next).toBeInstanceOf(LinkedListNode);
    expect(node.next.value).toBe(2);
  });

  test('clear', () => {
    const node = new LinkedListNode<number>(1);
    node.next = new LinkedListNode<number>(2);
    node.list = new LinkedList<number>();
    node.uncouple();

    expect(node.next).toBeNull();
    expect(node.list).toBeNull();
  });
});
