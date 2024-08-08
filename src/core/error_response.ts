import ReasonPhrases from "../untils/http_status_Code/reason_phrases";
import StatusCodes from "../untils/http_status_Code/status_codes";

// Define the ErrorResponse class
class ErrorResponse extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// Define the ConflictRequestError class
class ConflictRequestError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.CONFLICT, status: number = StatusCodes.CONFLICT) {
    super(message, status);
  }
}

// Define the BadRequestError class
class BadRequestError extends ErrorResponse {
  constructor(message: string = ReasonPhrases.FORBIDDEN, status: number = StatusCodes.FORBIDDEN) {
    super(message, status);
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(message = ReasonPhrases.UNAUTHORIZED, status: number = StatusCodes.UNAUTHORIZED) {
    super(message, status)
  }
}
// Export the error classes
export {
  AuthFailureError,
  ConflictRequestError,
  BadRequestError
}

