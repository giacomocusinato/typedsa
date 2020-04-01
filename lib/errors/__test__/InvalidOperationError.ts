import { InvalidOperationError } from '..';

describe('InvalidOperationError', () => {
  test('contructor', () => {
    const error = new InvalidOperationError('foo');
    expect(error.message.includes(InvalidOperationError.name)).toBeTruthy();
    expect(error.message.includes('foo')).toBeTruthy();
  });
});
