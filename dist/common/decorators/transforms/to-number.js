"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToNumber = void 0;
const class_transformer_1 = require("class-transformer");
function ToNumber() {
    return (0, class_transformer_1.Transform)((v) => {
        let number = Number(v.value);
        if (isNaN(number))
            return v.value;
        return number;
    });
}
exports.ToNumber = ToNumber;
//# sourceMappingURL=to-number.js.map