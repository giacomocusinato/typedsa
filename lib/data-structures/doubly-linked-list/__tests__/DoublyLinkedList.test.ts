import { ArgumentNullError, InvalidOperationError } from '../../../errors';
import { DoublyLinkedList } from '../DoublyLinkedList';
import { DoublyLinkedListNode } from '../DoublyLinkedListNode';

describe('DoublyLinkedList', () => {
  let list: DoublyLinkedList<number>;
  let listCompare: DoublyLinkedList<number>;

  beforeEach(() => {
    list = new DoublyLinkedList<number>();
    listCompare = new DoublyLinkedList<number>();
  });

  test('contruct', () => {
    expect(list.length).toBe(0);
    expect(list.first).toBeNull();
    expect(list.last).toBeNull();
  });

  test('add', () => {
    let spy = jest.spyOn(list, 'addLast').mockReturnValueOnce();
    list.add(0);

    expect(spy).toBeCalledWith(new DoublyLinkedListNode(0));
  });

  test('addFirst - success', () => {
    const node1 = new DoublyLinkedListNode<number>(0);
    list.addFirst(node1);
    expect(list.first).toBe(node1);
    expect(list.last).toBe(node1);
    expect(list.length).toBe(1);

    const node2 = new DoublyLinkedListNode<number>(0);
    list.addFirst(node2);
    expect(list.first).toBe(node2);
    expect(list.last).toBe(node1);
    expect(list.length).toBe(2);

    const node3 = new DoublyLinkedListNode<number>(0);
    list.addFirst(node3);
    expect(list.first).toBe(node3);
    expect(list.last).toBe(node1);
    expect(list.length).toBe(3);
  });

  test('addFirst - throws ArgumentNullError', () => {
    const node = JSON.parse('null');
    expect(() => list.addFirst(node)).toThrow(ArgumentNullError);
  });

  test('addFirst - throws InvalidOperationError', () => {
    const node = new DoublyLinkedListNode<number>(0);
    listCompare.addFirst(node);

    expect(() => list.addFirst(node)).toThrow(InvalidOperationError);
  });

  test('addLast - success', () => {
    const node1 = new DoublyLinkedListNode<number>(0);
    list.addLast(node1);
    expect(list.first).toBe(node1);
    expect(list.last).toBe(node1);
    expect(list.length).toBe(1);

    const node2 = new DoublyLinkedListNode<number>(0);
    list.addLast(node2);
    expect(list.first).toBe(node1);
    expect(list.last).toBe(node2);
    expect(list.length).toBe(2);

    const node3 = new DoublyLinkedListNode<number>(0);
    list.addLast(node3);
    expect(list.first).toBe(node1);
    expect(list.last).toBe(node3);
    expect(list.length).toBe(3);
  });

  test('addLast - ArgumentNullError', () => {
    const node = JSON.parse('null');
    expect(() => list.addLast(node)).toThrow(ArgumentNullError);
  });

  test('addLast - InvalidOperationError', () => {
    const node = new DoublyLinkedListNode<number>(0);
    listCompare.addFirst(node);

    expect(() => list.addLast(node)).toThrow(InvalidOperationError);
  });

  test('add', () => {
    let spy = jest.spyOn(list, 'addLast').mockReturnValueOnce();
    const { add } = list; // @bind test
    add(0);

    expect(spy).toBeCalledWith(new DoublyLinkedListNode(0));
  });

  test('remove - success', () => {
    let nodes: DoublyLinkedListNode<number>[] = [];
    function makeList() {
      nodes = [
        new DoublyLinkedListNode<number>(1),
        new DoublyLinkedListNode<number>(3),
        new DoublyLinkedListNode<number>(5)
      ];
      list = new DoublyLinkedList<number>();
      list.addLast(nodes[0]);
      list.addLast(nodes[1]);
      list.addLast(nodes[2]);
      return nodes;
    }

    makeList();
    list.remove(nodes[0]);
    expect(list.toArray()).toMatchObject([3, 5]);
    expect(list.first).toBe(nodes[1]);
    expect(list.last).toBe(nodes[nodes.length - 1]);
    expect(list.length).toBe(nodes.length - 1);

    makeList();
    list.remove(nodes[1]);
    expect(list.toArray()).toMatchObject([1, 5]);
    expect(list.first).toBe(nodes[0]);
    expect(list.last).toBe(nodes[nodes.length - 1]);
    expect(list.length).toBe(nodes.length - 1);

    makeList();
    list.remove(nodes[2]);
    expect(list.toArray()).toMatchObject([1, 3]);
    expect(list.first).toBe(nodes[0]);
    expect(list.last).toBe(nodes[1]);
    expect(list.length).toBe(nodes.length - 1);

    makeList();
    list.remove(5);
    expect(list.toArray()).toMatchObject([1, 3]);
    expect(list.first).toBe(nodes[0]);
    expect(list.last).toBe(nodes[1]);
    expect(list.length).toBe(nodes.length - 1);

    makeList();
    list.remove(1);
    list.remove(3);
    list.remove(5);
    expect(list.first).toBeNull();
    expect(list.last).toBeNull;
  });

  test('remove - fail', () => {
    const node = new DoublyLinkedListNode<number>(0);
    list.addLast(node);
    node.list = null;

    expect(() => list.remove(node)).toThrow(InvalidOperationError);
    expect(() => list.remove(5)).toThrow(InvalidOperationError);
    expect(() => list.remove(JSON.parse('null'))).toThrow(ArgumentNullError);
  });

  test('removeFirst - success', () => {
    list.add(1);
    list.add(2);
    list.removeFirst();

    expect(list.toArray()).toMatchObject([2]);
    expect(list.first?.value).toBe(2);
    expect(list.last?.value).toBe(2);
    expect(list.length).toBe(1);

    list.removeFirst();
    expect(list.first).toBeNull();
    expect(list.last).toBeNull();
  });

  test('removeFirst - failure', () => {
    expect(() => list.removeFirst()).toThrow(InvalidOperationError);
  });

  test('removeLast - success', () => {
    list.add(1);
    list.add(2);
    list.removeLast();

    expect(list.toArray()).toMatchObject([1]);
    expect(list.first?.value).toBe(1);
    expect(list.last?.value).toBe(1);
    expect(list.length).toBe(1);

    list.removeLast();
    expect(list.first).toBeNull();
    expect(list.last).toBeNull();
  });

  test('removeLast - failure', () => {
    expect(() => list.removeLast()).toThrow(InvalidOperationError);
  });

  test('clear', () => {
    const nodes = [
      new DoublyLinkedListNode<number>(0),
      new DoublyLinkedListNode<number>(1),
      new DoublyLinkedListNode<number>(2)
    ];
    nodes.forEach(node => list.addLast(node));
    list.clear();

    expect(list.length).toBe(0);
    expect(list.first).toBeNull();
    expect(list.last).toBeNull();
    nodes.forEach(node => {
      expect(node.next).toBeNull();
      expect(node.prev).toBeNull();
      expect(node.list).toBeNull();
    });
  });

  test('contains', () => {
    list.add(0);
    list.add(2);

    expect(list.contains(0)).toBe(true);
    expect(list.contains(1)).toBe(false);
    expect(list.contains(2)).toBe(true);
    expect(list.first?.value).toBe(0);
    expect(listCompare.contains(0)).toBe(false);
  });

  test('find', () => {
    const values = [1, 2, 3];
    values.forEach(item => list.add(item));

    values.forEach(item => expect(list.find(item)?.value).toBe(item));
    expect(list.find(0)).toBeNull();
  });

  test('toArray', () => {
    const arr = [1, 2, 5];
    arr.forEach(item => {
      list.add(item);
    });

    expect(list.toArray()).toMatchObject(arr);
  });

  test('fromArray', () => {
    const arr = [1, 2, 5];
    list = DoublyLinkedList.fromArray<number>(arr);

    const arrCompare: number[] = [];
    for (const node of list) {
      if (node) {
        arrCompare.push(node.value);
      }
    }
    expect(arrCompare).toMatchObject(arr);
  });

  test('iterator', () => {
    function getArrayFromIteratedList(arr: number[]) {
      list = new DoublyLinkedList<number>();
      arr.forEach(item => list.add(item));
      const listArray = [];
      for (const node of list) {
        listArray.push(node?.value);
      }
      return listArray;
    }

    const array1: number[] = [];
    const array2: number[] = [1];
    const array3: number[] = [1, 2, 5];

    expect(getArrayFromIteratedList(array1)).toMatchObject(array1);
    expect(getArrayFromIteratedList(array2)).toMatchObject(array2);
    expect(getArrayFromIteratedList(array3)).toMatchObject(array3);
  });

  test('reverse', () => {
    list.reverse();

    const arr = [1, 2, 3, 4];
    list = DoublyLinkedList.fromArray(arr);
    list.reverse();

    expect(list.toArray()).toMatchObject(arr.reverse());
  });

  test('sort', () => {
    let arr = [];
    list.sort();
    expect(list.first).toBeNull;

    arr = [9, 7, 8, 1, 3, 2];
    list = DoublyLinkedList.fromArray(arr);
    list.sort();
    expect(list.toArray()).toMatchObject(arr.sort());

    arr = [1, 8, 1, 2];
    list = DoublyLinkedList.fromArray(arr);
    list.sort();
    expect(list.toArray()).toMatchObject(arr.sort());

    arr = [1, 8, 1, 2];
    list = DoublyLinkedList.fromArray(arr);
    list.sort((a, b) => {
      if (!a || !b) return a ? -1 : b ? 1 : 0;
      return b.value - a.value;
    });
    expect(list.toArray()).toMatchObject(arr.sort().reverse());

    arr = [1, null, 2];
    const anotherList = DoublyLinkedList.fromArray<number | null>(arr);
    anotherList.sort();
    expect(anotherList.toArray()).toMatchObject([1, 2, null]);
  });
});
