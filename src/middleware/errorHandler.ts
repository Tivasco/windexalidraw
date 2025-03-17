import { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logging/logger';
import { ApiError } from '../services/api/apiClient';

export interface ErrorResponse {
  status: number;
  message: string;
  timestamp: string;
  path: string;
  details?: any;
}

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = 500;
  let message = 'Internal Server Error';
  let details: any = undefined;

  // Handle specific error types
  if (err instanceof HttpError) {
    status = err.status;
    message = err.message;
    details = err.details;
  } else if (err instanceof ApiError) {
    status = err.status;
    message = err.message;
    details = err.data;
  }

  // Log the error
  logger.error(message, {
    status,
    path: req.path,
    method: req.method,
    details,
    stack: err.stack
  });

  // Create error response
  const errorResponse: ErrorResponse = {
    status,
    message,
    timestamp: new Date().toISOString(),
    path: req.path,
    details
  };

  // Send error response
  res.status(status).json(errorResponse);
};

// Middleware to handle 404 errors
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError(404, `Route ${req.path} not found`);
  next(error);
};

// Middleware to handle validation errors
export const validationErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err?.name === 'ValidationError') {
    return res.status(400).json({
      status: 400,
      message: 'Validation Error',
      timestamp: new Date().toISOString(),
      path: req.path,
      details: err.details
    });
  }
  next(err);
};

// Rate limiting error handler
export const rateLimitErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err?.name === 'RateLimitError') {
    return res.status(429).json({
      status: 429,
      message: 'Too Many Requests',
      timestamp: new Date().toISOString(),
      path: req.path,
      details: {
        retryAfter: err.retryAfter
      }
    });
  }
  next(err);
}; 