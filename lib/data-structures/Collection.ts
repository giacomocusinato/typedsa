/**
 * Defines methods to manipulate generic collections.
 * @template T - Specifies the element type of the linked list.
 * @interface
 */
export interface Collection<T> {
  /**
   * The number of elements contained in the Collection<T>.
   */
  length: number;

  /**
   * Adds an item to the Collection<T>.
   * @param {T} item - The object to add to the Collection<T>.
   */
  add(item: T): void;

  /**
   * Removes all items from the Collection<T>
   */
  clear(): void;

  /**
   * Determines whether the Collection<T> contains a specific value.
   * @param item - The object to locate in the Collection<T>.
   * @returns {boolean} - true if item is found in the Collection<T>; otherwise, false.
   */
  contains(item: T): boolean;
}
