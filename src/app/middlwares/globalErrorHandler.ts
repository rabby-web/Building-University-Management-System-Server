import { path } from 'path';
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  type TErrorSource = {
    path: string | number;
    message: string;
    // error: any;
  }[];
  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
      // error: err,
    },
  ];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'zod error';
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    error: err,
  });
};

export default globalErrorHandler;
