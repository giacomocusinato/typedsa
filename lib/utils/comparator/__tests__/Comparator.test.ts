import { Comparator } from '../Comparator';

describe('Comparator', () => {
  test('default compare', () => {
    const compare = new Comparator();

    expect(compare.eq(1, 1)).toBe(true);
    expect(compare.eq('foo', 'foo')).toBe(true);
    expect(compare.eq(1, 2)).toBe(false);

    expect(compare.gt(2, 1)).toBe(true);
    expect(compare.gt(1, 2)).toBe(false);

    expect(compare.lt(1, 2)).toBe(true);
    expect(compare.lt(2, 1)).toBe(false);

    expect(compare.gte(1, 1)).toBe(true);
    expect(compare.gte(2, 1)).toBe(true);
    expect(compare.gte(1, 2)).toBe(false);
    expect(compare.gte('a', 'c')).toBe(false);

    expect(compare.lte(1, 1)).toBe(true);
    expect(compare.lte(1, 2)).toBe(true);
    expect(compare.lte(2, 1)).toBe(false);
    expect(compare.lte('a', 'c')).toBe(true);
  });

  test('custom compare', () => {
    const compare = new Comparator<string>((a, b) => {
      if (a.length === b.length) {
        return 0;
      }
      return a.length - b.length;
    });

    expect(compare.eq('foo', 'bar')).toBe(true);
    expect(compare.eq('foo', 'spam')).toBe(false);

    expect(compare.gt('spam', 'foo')).toBe(true);
    expect(compare.gt('foo', 'bar')).toBe(false);

    expect(compare.lt('foo', 'grault')).toBe(true);
    expect(compare.lt('spam', 'bar')).toBe(false);

    expect(compare.gte('foo', 'bar')).toBe(true);
    expect(compare.gte('spam', 'baz')).toBe(true);
    expect(compare.gte('foo', 'spam')).toBe(false);

    expect(compare.lte('bar', 'baz')).toBe(true);
    expect(compare.lte('foo', 'spam')).toBe(true);
    expect(compare.lte('spam', 'foo')).toBe(false);
  });
});
