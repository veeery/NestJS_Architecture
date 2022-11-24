"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorException = void 0;
const common_1 = require("@nestjs/common");
class ValidationErrorException extends common_1.HttpException {
    constructor(validationErrors) {
        super({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            error: 'Validation Errors',
            message: validationErrors[Object.keys(validationErrors)[0]][0],
            validationErrors,
        }, common_1.HttpStatus.BAD_REQUEST);
        this.validationErrors = validationErrors;
    }
}
exports.ValidationErrorException = ValidationErrorException;
//# sourceMappingURL=validation-exception.js.map