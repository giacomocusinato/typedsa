import { MaxHeap } from '~/ds';
import { InvalidOperationError } from '~/errors';

describe('Heap', () => {
  test('contructor', () => {});

  test('push', () => {
    const heap = new MaxHeap<number>();

    heap.push(0);
    expect(heap.length).toBe(1);
    expect(heap.toArray()).toMatchObject([0]);

    heap.push(1);
    expect(heap.toArray()).toMatchObject([1, 0]);

    heap.push(2);
    expect(heap.length).toBe(3);
    expect(heap.toArray()).toMatchObject([2, 0, 1]);

    heap.push(3);
    expect(heap.toArray()).toMatchObject([3, 2, 1, 0]);

    heap.push(2);
    heap.push(4);
    expect(heap.length).toBe(6);
    expect(heap.toArray()).toMatchObject([4, 2, 3, 0, 2, 1]);
  });

  test('pop', () => {
    const heap = new MaxHeap<number>();
    heap.push(5);
    heap.push(4);
    heap.push(3);
    heap.push(2);
    heap.push(3);
    heap.push(0);

    expect(heap.toArray()).toMatchObject([5, 4, 3, 2, 3, 0]);
    expect(heap.pop()).toBe(5);
    expect(heap.toArray()).toMatchObject([4, 3, 3, 2, 0]);
    expect(heap.pop()).toBe(4);
    expect(heap.toArray()).toMatchObject([3, 2, 3, 0]);
    expect(heap.pop()).toBe(3);
    expect(heap.toArray()).toMatchObject([3, 2, 0]);
    expect(heap.pop()).toBe(3);
    expect(heap.toArray()).toMatchObject([2, 0]);
    expect(heap.pop()).toBe(2);
    expect(heap.toArray()).toMatchObject([0]);
    expect(heap.pop()).toBe(0);
    expect(heap.toArray()).toMatchObject([]);
  });

  test('pop - failure', () => {
    const heap = new MaxHeap<number>();
    expect(heap.pop).toThrow(InvalidOperationError);
  });

  test('isComplete', () => {
    const heap = new MaxHeap<number>();

    heap.push(0);
    expect(heap.isComplete).toBe(true);

    heap.push(1);
    heap.push(2);
    expect(heap.isComplete).toBe(true);
  });
});
