import bind from 'bind-decorator';

/**
 * Defines methods to implements objects comparison.
 */
export class Comparator<T = any> {
  /**
   * @param compare - The comparator fuction.
   * The function parameters are two items of T type and must return:
   * 0 is the two items are equal;
   * more then 0 if the first item is greater then the second;
   * less then 0 if the first item is less then the second.
   */
  constructor(
    private compare: (a: T, b: T) => number = Comparator.defaultCompare
  ) {}

  private static defaultCompare<T>(a: T, b: T): number {
    if (a === b) {
      return 0;
    }
    return a > b ? 1 : -1;
  }

  @bind
  public eq(a: T, b: T): boolean {
    return this.compare(a, b) === 0;
  }

  @bind
  public gt(a: T, b: T) {
    return this.compare(a, b) > 0;
  }

  @bind
  public lt(a: T, b: T) {
    return this.compare(a, b) < 0;
  }

  @bind
  public gte(a: T, b: T) {
    return this.gt(a, b) || this.eq(a, b);
  }

  @bind
  public lte(a: T, b: T) {
    return this.lt(a, b) || this.eq(a, b);
  }
}
