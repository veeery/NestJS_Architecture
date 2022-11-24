"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNotBlank = void 0;
const class_validator_1 = require("class-validator");
function IsNotBlank(attribute, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isNotBlank',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    return typeof value === 'string' && value.trim().length > 0;
                },
                defaultMessage(args) {
                    const [relatedPropertyName] = args.constraints;
                    const name = attribute.name ? attribute.name : relatedPropertyName;
                    return `${name} tidak boleh kosong`;
                },
            },
        });
    };
}
exports.IsNotBlank = IsNotBlank;
//# sourceMappingURL=is-not-blank.js.map