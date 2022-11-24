"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToBoolean = void 0;
const class_transformer_1 = require("class-transformer");
function ToBoolean() {
    return (0, class_transformer_1.Transform)((v) => {
        const str = v.value;
        if (str == 'true' || str == '1')
            return true;
        return false;
    });
}
exports.ToBoolean = ToBoolean;
//# sourceMappingURL=to-boolean.js.map