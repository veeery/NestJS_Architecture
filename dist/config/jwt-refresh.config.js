"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtRefresh = void 0;
const config_1 = require("@nestjs/config");
exports.jwtRefresh = (0, config_1.registerAs)('jwt-refresh', () => ({
    secret: process.env.JWT_REFRESH_SECRET,
    signOptions: {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
}));
//# sourceMappingURL=jwt-refresh.config.js.map