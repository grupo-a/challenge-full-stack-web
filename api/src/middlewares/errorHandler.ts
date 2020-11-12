import { NextFunction, Request, Response } from 'express';

interface HttpException {
  status: number;
  message: string;
}

export default (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.name === 'ValidationError') {
    const renderedErrors = renderValidationErrors(error.inner);
    return response.status(422).json({ errors: renderedErrors });
  }

  console.error(error);
  return response.status(error.status || 500).json(error.message);
};

interface ValidationError {
  path: string;
  errors: string[];
}
const renderValidationErrors = (errors: ValidationError[]) => {
  return errors.map((error) => ({ input: error.path, errors: error.errors }));
};
