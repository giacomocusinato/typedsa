import { InvalidOperationError } from '../../../errors';
import { LinkedList } from '../../linked-list/LinkedList';
import { Queue } from '../Queue';

describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  test('contructor', () => {
    expect(Queue.length).toBe(0);
  });

  test('enqueue', () => {
    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.length).toBe(2);
    expect(queue.peek()).toBe(1);
  });

  test('peek', () => {
    queue.enqueue(1);

    expect(queue.peek()).toBe(1);
  });

  test('peek - failure', () => {
    expect(() => queue.peek()).toThrow(InvalidOperationError);
  });

  test('pop', () => {
    queue.enqueue(1);

    expect(queue.dequeue()).toBe(1);
    expect(queue.length).toBe(0);
  });

  test('peek - failure', () => {
    expect(() => queue.dequeue()).toThrow(InvalidOperationError);
  });

  test('clear', () => {
    queue.enqueue(0);
    queue.enqueue(1);
    queue.clear();

    expect(queue.length).toBe(0);
  });

  test('contains', () => {
    queue.enqueue(0);
    queue.enqueue(1);

    expect(queue.contains(0)).toBe(true);
    expect(queue.contains(1)).toBe(true);
    expect(queue.contains(2)).toBe(false);
  });

  test('toArray', () => {
    expect(queue.toArray()).toMatchObject([]);
    queue.enqueue(0);
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.toArray()).toMatchObject([0, 1, 2]);
  });
});
