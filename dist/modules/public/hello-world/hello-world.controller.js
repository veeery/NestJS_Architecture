"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloWorldController = void 0;
const common_1 = require("@nestjs/common");
const hello_world_service_1 = require("./hello-world.service");
let HelloWorldController = class HelloWorldController {
    constructor(hantu) {
        this.hantu = hantu;
    }
    helloWorld() {
        return this.hantu.helloWorld();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HelloWorldController.prototype, "helloWorld", null);
HelloWorldController = __decorate([
    (0, common_1.Controller)({ path: 'hello-world' }),
    __metadata("design:paramtypes", [hello_world_service_1.HelloWorldService])
], HelloWorldController);
exports.HelloWorldController = HelloWorldController;
//# sourceMappingURL=hello-world.controller.js.map