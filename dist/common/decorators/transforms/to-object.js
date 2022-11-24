"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToObject = void 0;
const class_transformer_1 = require("class-transformer");
function ToObject() {
    return (0, class_transformer_1.Transform)((v) => {
        if (v.value == 'object')
            return v;
        if (!v.value)
            return false;
        return JSON.parse(v.value);
    });
}
exports.ToObject = ToObject;
//# sourceMappingURL=to-object.js.map