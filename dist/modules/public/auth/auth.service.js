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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const validation_exception_1 = require("../../../common/exceptions/validation-exception");
const app_config_services_1 = require("../../app/app-config.services");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(appConfigService, jwtService, userService, userRepository) {
        this.appConfigService = appConfigService;
        this.jwtService = jwtService;
        this.userService = userService;
        this.userRepository = userRepository;
    }
    async login(loginDto) {
        const user = await this.validateUserPassword(loginDto);
        const token = this.generateToken(user);
        const refreshToken = this.generateRefreshToken(user);
        await this.setCurrentRefreshToken(refreshToken, user.id);
        return { data: user.toJson(), token: token, refreshToken: refreshToken };
    }
    async register(registerDto) {
        const user = this.userRepository.create(registerDto);
        const token = this.generateToken(user);
        try {
            await user.save();
        }
        catch (err) {
            if (err.code == 'ER_DUP_ENTRY')
                throw new validation_exception_1.ValidationErrorException({
                    username: ['Username has been used'],
                });
            throw err;
        }
        return { data: user.toJson(), token: token };
    }
    async logout(request) {
        const user = request.user;
        console.log(request.user);
        await this.setCurrentRefreshToken(null, user.id);
        return { message: 'Successfully Logout' };
    }
    async refreshToken(request) {
        const { id } = request.user;
        const oldRefreshToken = request.headers['authorization'].split('Bearer ')[1];
        const user = await this.getUserIfRefreshTokenMatches(oldRefreshToken, id);
        const token = this.generateToken(user);
        const refreshToken = this.generateRefreshToken(user);
        await this.setCurrentRefreshToken(refreshToken, user.id);
        return { data: user.toJson(), token: token, refreshToken: refreshToken };
    }
    async changePassword(changePasswordDto, request) {
        const { oldPassword, newPassword } = changePasswordDto;
        const { username } = request.user;
        const user = await this.validateUserPassword({
            password: oldPassword,
            username,
        });
        user.password = newPassword;
        return (await user.save()).toJson();
    }
    async validateUserPassword(loginDto) {
        const { username, password } = loginDto;
        const user = await this.userService.getUserByUsername(username);
        if (!user)
            throw new common_1.BadRequestException('Username Not Found');
        if (!(await user.validatePassword(password)))
            throw new common_1.BadRequestException('Password Not Correct');
        return user;
    }
    generateToken(user) {
        const { id, username } = user;
        return this.jwtService.sign({ id, username });
    }
    generateRefreshToken(user) {
        const { id, username } = user;
        return this.jwtService.sign({ id, username }, {
            secret: this.appConfigService.jwtRefresh.secret,
            expiresIn: this.appConfigService.jwtRefresh.signOptions.expiresIn,
        });
    }
    async findOne(id) {
        const [user] = await this.userRepository.find({
            where: { id },
        });
        if (!user)
            throw new common_1.UnauthorizedException();
        return user.toJson();
    }
    async getUserIfRefreshTokenMatches(refreshToken, userId) {
        const [user] = await this.userRepository.find({
            where: { id: userId },
            relations: {
                history: true,
            },
        });
        if (!user)
            throw new common_1.BadRequestException('Username Not Found');
        if (!(await user.validateRefreshToken(refreshToken)))
            throw new common_1.BadRequestException('Failed Token Refresh');
        return user.toJson();
    }
    async setCurrentRefreshToken(refreshToken, id) {
        const user = await this.findOne(id);
        delete user.password;
        const updatedUser = this.userRepository.create(Object.assign(Object.assign({}, user), { currentHashedRefreshToken: refreshToken }));
        await updatedUser.save();
        return;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [app_config_services_1.AppConfigService,
        jwt_1.JwtService,
        user_service_1.UserService,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map