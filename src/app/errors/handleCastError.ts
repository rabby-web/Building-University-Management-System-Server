import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';


// Function to handle Mongoose CastError
const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {

  //constructing error sources caseError
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;  // Setting HTTP status code for invalid ID

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

// Exporting the error handler function as default
export default handleCastError;
