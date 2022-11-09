import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export function createExceptionFactory(
  validationErrors: ValidationError[] = [],
) {
  const errors = {};
  for (const error of validationErrors) {
    validateChildren(error, errors);
  }
  const message = getMessage(errors);
  throw new BadRequestException({
    statusCode: 400,
    error: 'Validation Errors',
    message,
    validationErrors: errors,
  });
}

function validateChildren(error: ValidationError, objectError?) {
  objectError = objectError || {};
  if (!error.children || !error.children.length) {
    objectError[error.property] = Object.values(error.constraints);
    return objectError;
  }
  objectError[error.property] = {};
  for (const item of error.children) {
    validateChildren(item, objectError[error.property]);
  }
}

function getMessage(errors) {
  for (let [key, error] of Object.entries(errors)) {
    if (!(error instanceof Array)) {
      return getMessage(error);
    }
    return error[0];
  }
}
