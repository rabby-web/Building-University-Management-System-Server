// Custom Error class to handle application-specific errors with an HTTP status code.
class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Custom error class to include an HTTP status code with error messages.
export default AppError;
