import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: "",
      message: err?.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: err?.message,
    errorSources,
  };
};

export default handleDuplicateError;
