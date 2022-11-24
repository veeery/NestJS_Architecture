"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExceptionFactory = void 0;
const common_1 = require("@nestjs/common");
function createExceptionFactory(validationErrors = []) {
    const errors = {};
    for (const error of validationErrors) {
        validateChildren(error, errors);
    }
    const message = getMessage(errors);
    throw new common_1.BadRequestException({
        statusCode: 400,
        error: 'Validation Errors',
        message,
        validationErrors: errors,
    });
}
exports.createExceptionFactory = createExceptionFactory;
function validateChildren(error, objectError) {
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
//# sourceMappingURL=exception-factory.js.map