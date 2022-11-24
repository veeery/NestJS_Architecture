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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const validation_exception_1 = require("../../../common/exceptions/validation-exception");
const orm_1 = require("../../../common/utils/orm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createAccount(createUserDto) {
        const user = this.userRepository.create(createUserDto);
        try {
            return {
                data: (await user.save()).toJson(),
                message: 'Account Successfully Create',
            };
        }
        catch (err) {
            if (err.code == 'ER_DUP_ENTRY')
                throw new validation_exception_1.ValidationErrorException({
                    code: ['Username has been used'],
                });
            throw err;
        }
    }
    async getUser(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: {},
        });
        if (!user)
            throw new common_1.NotFoundException('User Not Found');
        return { data: user.toJson() };
    }
    async getAllUser(userQuery) {
        const { limit, page, search, orderBy, sortBy } = userQuery;
        const query = this.userRepository.createQueryBuilder('user');
        if (search)
            query.where((0, orm_1.like)('user.name', search));
        if (orderBy && sortBy)
            query.orderBy(`user.${orderBy}`, sortBy);
        const paginated = (0, nestjs_typeorm_paginate_1.paginate)(query, { limit, page });
        (await paginated).items.forEach((user) => user.toJson());
        return paginated;
    }
    async updateUserProfile(id, updateUserProfileDto) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        const updatedUser = this.userRepository.create(Object.assign(Object.assign({}, user), updateUserProfileDto));
        return {
            data: (await updatedUser.save()).toJson(),
            message: 'Succesfully Update User Profile',
        };
    }
    async deleteAccount(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: {},
        });
        if (!user)
            throw new common_1.NotFoundException('User Not Found');
        try {
            await user.remove();
        }
        catch (err) {
            await user.softRemove();
        }
        return {
            message: 'Account Successfully Delete',
        };
    }
    async getUserByUsername(username) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where({ username })
            .getOne();
        if (!user)
            return null;
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map