"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const config_2 = require("../../config");
const app_config_services_1 = require("./app-config.services");
const typeorm_1 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
let GlobalModule = class GlobalModule {
};
GlobalModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
                expandVariables: true,
                load: config_2.config,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [app_config_services_1.AppConfigService],
                useFactory: (config) => config.orm,
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt', session: true }),
            jwt_1.JwtModule.registerAsync({
                inject: [app_config_services_1.AppConfigService],
                useFactory: (config) => config.jwt,
            }),
        ],
        providers: [app_config_services_1.AppConfigService],
        exports: [app_config_services_1.AppConfigService, passport_1.PassportModule, jwt_1.JwtModule],
    })
], GlobalModule);
exports.GlobalModule = GlobalModule;
//# sourceMappingURL=global.module.js.map