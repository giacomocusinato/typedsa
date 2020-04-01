/**
 * Base class for errors throughout the system.
 * @extends {Error}
 */
export class BaseError extends Error {
  /**
   * @constructor
   * @param {string} name - The name of the error (children class name if inherited)
   * @param {string} message - Optional error message
   */
  // prettier-ignore
  constructor(name: string, message?: string) {
    super();
    
    this.message = message ? `${name}: "${message}"` : name;

    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
