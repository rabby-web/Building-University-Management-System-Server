/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import path from 'path';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handelValidationError from '../errors/handleValidationError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
      // error: err,
    },
  ];

  if (err instanceof ZodError) {
    const simpleFieldError = handleZodError(err);
    statusCode = simpleFieldError?.statusCode;
    message = simpleFieldError?.message;
    errorSources = simpleFieldError?.errorSources;
    // console.log(simpleFieldError);
  } else if (err?.name === 'ValidationError') {
    const simpleFieldError = handelValidationError(err);
    statusCode = simpleFieldError?.statusCode;
    message = simpleFieldError?.message;
    errorSources = simpleFieldError?.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    err,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
