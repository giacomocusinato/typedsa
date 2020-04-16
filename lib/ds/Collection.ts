import { Comparator } from '~/utils';

/**
 * Defines methods to manipulate generic collections.
 * @template T - Specifies the element type of the collection.
 */
export class Collection<T> {
  constructor(private compare = new Comparator()) {}
}
