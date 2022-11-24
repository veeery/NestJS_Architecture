"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullToZero = void 0;
const class_transformer_1 = require("class-transformer");
function NullToZero() {
    return (0, class_transformer_1.Transform)((v) => {
        if (v.value == null)
            return 0;
        return v.value;
    });
}
exports.NullToZero = NullToZero;
//# sourceMappingURL=null-to-zero.js.map