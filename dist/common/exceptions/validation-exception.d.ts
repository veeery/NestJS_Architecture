import { HttpException } from '@nestjs/common';
export declare class ValidationErrorException extends HttpException {
    validationErrors: object;
    constructor(validationErrors: object);
}
