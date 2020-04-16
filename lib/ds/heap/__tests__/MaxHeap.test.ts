import { MaxHeap } from 'typedsa/ds';

describe('MaxHeap', () => {
  test('contructor', () => {
    const heap = new MaxHeap([2, 3, 1]);
    expect(heap.toArray()).toMatchObject([3, 2, 1]);
  });
});
