
// Define StatusCode as a constant enum
enum StatusCode {
  FORBIDDEN = 403,
  CONFLICT = 409
}

// Define ReasonStatusCode as a constant enum
enum ReasonStatusCode {
  FORBIDDEN = 'Bad request error',
  CONFLICT = 'Conflict error'
}

// Define the ErrorResponse class
class ErrorResponse extends Error {
  status: StatusCode;

  constructor(message: string, status: StatusCode) {
    super(message);
    this.status = status;
  }
}

// Define the ConflictRequestError class
class ConflictRequestError extends ErrorResponse {
  constructor(message: string = ReasonStatusCode.CONFLICT, status: StatusCode = StatusCode.CONFLICT) {
    super(message, status);
  }
}

// Define the BadRequestError class
class BadRequestError extends ErrorResponse {
  constructor(message: string = ReasonStatusCode.FORBIDDEN, status: StatusCode = StatusCode.FORBIDDEN) {
    super(message, status);
  }
}

// Export the error classes
export {
  ConflictRequestError,
  BadRequestError
}

