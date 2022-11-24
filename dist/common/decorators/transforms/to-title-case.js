"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToTitleCase = void 0;
const class_transformer_1 = require("class-transformer");
function ToTitleCase() {
    return (0, class_transformer_1.Transform)((v) => {
        if (!v.value)
            return null;
        let str = v.value.split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1).toLowerCase();
        }
        return str.join(' ');
    });
}
exports.ToTitleCase = ToTitleCase;
//# sourceMappingURL=to-title-case.js.map