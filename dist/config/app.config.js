"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const config_1 = require("@nestjs/config");
exports.app = (0, config_1.registerAs)('app', () => ({
    name: process.env.APP_NAME,
    env: process.env.APP_ENV.toLowerCase() || 'development',
    url: process.env.APP_URL,
    port: +process.env.APP_PORT || 3000,
    lang: process.env.APP_LANG || 'id',
    isLogging: process.env.APP_LOG == 'TRUE'
}));
//# sourceMappingURL=app.config.js.map