import { ArgumentNullError } from '..';

describe('ArgumentNullError', () => {
  test('contructor', () => {
    const error = new ArgumentNullError('foo');
    expect(error.message.includes(ArgumentNullError.name)).toBeTruthy();
    expect(error.message.includes('foo')).toBeTruthy();
  });

  test('contructor without param', () => {
    const error = new ArgumentNullError();
    expect(error.message.includes(ArgumentNullError.name)).toBeTruthy();
  });
});
