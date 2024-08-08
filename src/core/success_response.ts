
import { Response } from 'express';
import StatusCodes from '../untils/http_status_Code/status_codes';
import ReasonPhrases from '../untils/http_status_Code/reason_phrases';

// Define the interface for the SuccessResponse constructor parameters
interface SuccessResponseParams {
  message?: string;
  statusCode?: number;
  reasonStatusCode?: string;
  metadata?: Record<string, any>;
}

// Define the SuccessResponse class
class SuccessResponse {
  message: string;
  status: number;
  metadata: Record<string, any>;

  constructor({
    message,
    statusCode = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
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
    statusCode = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.OK,
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
