import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationErrorException extends HttpException {
  constructor(public validationErrors: object) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Validation Errors',
        message: validationErrors[Object.keys(validationErrors)[0]][0],
        validationErrors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
