import { BaseError } from '..';

describe('BaseError', () => {
  test('with param', () => {
    const error = new BaseError('foo');
    expect(error.message.includes('foo')).toBeTruthy();
  });
});
