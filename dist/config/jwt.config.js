"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt = void 0;
const config_1 = require("@nestjs/config");
exports.jwt = (0, config_1.registerAs)('jwt', () => ({
    secret: process.env.JWT_SECRET,
    signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
}));
//# sourceMappingURL=jwt.config.js.map