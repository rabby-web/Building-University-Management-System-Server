import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {

  // Map through each validation error and extract path and message
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {

      // Return an object containing the path of the invalid field and the corresponding error message
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = 400;

  // Return a formatted error response
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
