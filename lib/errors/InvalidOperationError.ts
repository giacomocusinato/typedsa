import { BaseError } from './BaseError';

/**
 * The errror that is thrown when a method call is invalid for the object's current state.
 */
export class InvalidOperationError extends BaseError {
  constructor(message?: string) {
    super(InvalidOperationError.name, message);

    Object.setPrototypeOf(this, InvalidOperationError.prototype);
  }
}
