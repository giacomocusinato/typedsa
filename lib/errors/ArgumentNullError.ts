import { BaseError } from './BaseError';

/**
 * The error that is thrown when a null reference is passed to a method that does not accept it as a valid argument.
 * @extends {BaseError}
 */
export class ArgumentNullError extends BaseError {
  /**
   * @constructor
   * @param param - The name of the parameter that caused the error.
   */
  constructor(param: string | null = null) {
    super(ArgumentNullError.name);

    this.message =
      param === null
        ? `${this.message}: "Value cannot be null."`
        : `${this.message}: "Value cannot be null. Parameter name: ${param}"`;

    Object.setPrototypeOf(this, ArgumentNullError.prototype);
  }
}
