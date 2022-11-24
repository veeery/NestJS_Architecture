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
exports.User = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const model_1 = require("../../../common/core/model");
const typeorm_1 = require("typeorm");
const history_entity_1 = require("../history/history.entity");
let User = class User extends model_1.Model {
    get passSalt() {
        return this.password.substr(0, 29);
    }
    get tokenSalt() {
        if (this.currentHashedRefreshToken === null) {
            throw new common_1.UnauthorizedException();
        }
        return this.currentHashedRefreshToken.substr(0, 29);
    }
    async hashPassword() {
        if (!this.password)
            return;
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    async validatePassword(password) {
        const hash = await bcrypt.hash(password, this.passSalt);
        return hash === this.password;
    }
    async hashRefreshToken() {
        if (!this.currentHashedRefreshToken)
            return;
        const salt = await bcrypt.genSalt();
        this.currentHashedRefreshToken = await bcrypt.hash(this.currentHashedRefreshToken, salt);
    }
    async validateRefreshToken(currentHashedRefreshToken) {
        const hash = await bcrypt.hash(currentHashedRefreshToken, this.tokenSalt);
        return hash === this.currentHashedRefreshToken;
    }
    toJson() {
        delete this.currentHashedRefreshToken;
        delete this.password;
        delete this.token;
        return this;
    }
};
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 35 }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "currentHashedRefreshToken", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => history_entity_1.History, (history) => history.user, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], User.prototype, "history", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashRefreshToken", null);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map