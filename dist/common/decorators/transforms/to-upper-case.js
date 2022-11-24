"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToUpperCase = void 0;
const class_transformer_1 = require("class-transformer");
function ToUpperCase() {
    return (0, class_transformer_1.Transform)((v) => {
        if (!v.value)
            return null;
        return v.value.toUpperCase();
    });
}
exports.ToUpperCase = ToUpperCase;
//# sourceMappingURL=to-upper-case.js.map