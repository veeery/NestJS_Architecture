"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orm = void 0;
const config_1 = require("@nestjs/config");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
exports.orm = (0, config_1.registerAs)('orm', () => ({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: process.env.DB_SYNC == 'TRUE',
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    extra: {
        decimalNumbers: true,
    },
    autoLoadEntities: true,
}));
//# sourceMappingURL=orm.config.js.map