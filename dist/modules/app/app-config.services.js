"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppConfigService = class AppConfigService extends config_1.ConfigService {
    get app() {
        return this.get('app');
    }
    get orm() {
        return this.get('orm');
    }
    get isProduction() {
        return this.app.env == 'production';
    }
    get isDevelopment() {
        return this.app.env == 'development';
    }
    get jwt() {
        return this.get('jwt');
    }
    get jwtRefresh() {
        return this.get('jwt-refresh');
    }
    get isLogging() {
        return this.app.isLogging;
    }
};
AppConfigService = __decorate([
    (0, common_1.Injectable)()
], AppConfigService);
exports.AppConfigService = AppConfigService;
//# sourceMappingURL=app-config.services.js.map