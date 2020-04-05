import { InvalidOperationError } from '../../../errors';
import { LinkedList } from '../../linked-list/LinkedList';
import { Stack } from '../Stack';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  test('contructor', () => {
    expect(stack.length).toBe(0);

    const list = LinkedList.fromArray<number>([0, 1]);
    stack = new Stack(list);
    expect(stack.length).toBe(2);
  });

  test('push', () => {
    stack.push(1);
    stack.push(2);

    expect(stack.length).toBe(2);
    expect(stack.peek()).toBe(2);
  });

  test('peek', () => {
    stack.push(1);

    expect(stack.peek()).toBe(1);
  });

  test('peek - failure', () => {
    expect(() => stack.peek()).toThrow(InvalidOperationError);
  });

  test('pop', () => {
    stack.push(1);

    expect(stack.pop()).toBe(1);
    expect(stack.length).toBe(0);
  });

  test('peek - failure', () => {
    expect(() => stack.pop()).toThrow(InvalidOperationError);
  });

  test('clear', () => {
    stack.push(0);
    stack.push(1);
    stack.clear();

    expect(stack.length).toBe(0);
  });

  test('contains', () => {
    stack.push(0);
    stack.push(1);

    expect(stack.contains(0)).toBe(true);
    expect(stack.contains(1)).toBe(true);
    expect(stack.contains(2)).toBe(false);
  });

  test('toArray', () => {
    expect(stack.toArray()).toMatchObject([]);
    stack.push(0);
    stack.push(1);
    stack.push(2);
    expect(stack.toArray()).toMatchObject([2, 1, 0]);
  });
});
