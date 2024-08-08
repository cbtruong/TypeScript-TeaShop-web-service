
import { Response } from 'express';

// Define the StatusCode enum
enum StatusCode {
  OK = 200,
  CREATED = 201
}

// Define the ReasonStatusCode enum
enum ReasonStatusCode {
  CREATED = 'Created',
  OK = 'Success'
}

// Define the interface for the SuccessResponse constructor parameters
interface SuccessResponseParams {
  message?: string;
  statusCode?: StatusCode;
  reasonStatusCode?: ReasonStatusCode;
  metadata?: Record<string, any>;
}

// Define the SuccessResponse class
class SuccessResponse {
  message: string;
  status: StatusCode;
  metadata: Record<string, any>;

  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {}
  }: SuccessResponseParams) {
    this.message = message ?? reasonStatusCode;
    this.status = statusCode;
    this.metadata = metadata;
  }

  async send(res: Response, header: Record<string, string> = {}) {
    return res.status(this.status).json(this);
  }
}

// Define the OK class extending SuccessResponse
class OK extends SuccessResponse {
  constructor({ message, metadata }: { message?: string; metadata?: Record<string, any> }) {
    super({ message, metadata });
  }
}

// Define the CREATED class extending SuccessResponse
class CREATED extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    metadata
  }: SuccessResponseParams) {
    super({ message, statusCode, reasonStatusCode, metadata });
  }
}

// Export the classes
export {
  OK,
  CREATED
};
