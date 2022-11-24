"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const app_config_1 = require("./app.config");
const orm_config_1 = require("./orm.config");
const jwt_config_1 = require("./jwt.config");
const jwt_refresh_config_1 = require("./jwt-refresh.config");
exports.config = [app_config_1.app, orm_config_1.orm, jwt_config_1.jwt, jwt_refresh_config_1.jwtRefresh];
//# sourceMappingURL=index.js.map