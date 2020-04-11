import { MinHeap } from '../MinHeap';

describe('MinHeap', () => {
  test('contructor', () => {
    const heap = new MinHeap([2, 3, 1]);
    expect(heap.toArray()).toMatchObject([1, 3, 2]);
  });
});
