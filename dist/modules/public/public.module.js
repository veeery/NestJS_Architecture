"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const image_module_1 = require("../services/images/image.module");
const auth_module_1 = require("./auth/auth.module");
const hello_world_module_1 = require("./hello-world/hello-world.module");
const history_module_1 = require("./history/history.module");
const product_module_1 = require("./product/product.module");
const user_module_1 = require("./user/user.module");
let PublicModule = class PublicModule {
};
PublicModule = __decorate([
    (0, common_1.Module)({
        imports: [
            hello_world_module_1.default,
            user_module_1.UserModule,
            product_module_1.ProductModule,
            history_module_1.HistoryModule,
            auth_module_1.AuthModule,
            image_module_1.default,
        ],
    })
], PublicModule);
exports.default = PublicModule;
//# sourceMappingURL=public.module.js.map