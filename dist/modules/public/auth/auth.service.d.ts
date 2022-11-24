import { JwtService } from '@nestjs/jwt';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { AuthSuccess } from 'src/common/interfaces/response.interface';
import { ServerMessage } from 'src/common/interfaces/server-message.interface';
import { AppConfigService } from 'src/modules/app/app-config.services';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { ChangePasswordDTO, LoginDTO, RegisterDTO } from './auth.dto';
export declare class AuthService {
    readonly appConfigService: AppConfigService;
    private jwtService;
    private userService;
    private userRepository;
    constructor(appConfigService: AppConfigService, jwtService: JwtService, userService: UserService, userRepository: Repository<User>);
    login(loginDto: LoginDTO): Promise<AuthSuccess<Partial<User>>>;
    register(registerDto: RegisterDTO): Promise<AuthSuccess<Partial<User>>>;
    logout(request: UserRequest): Promise<ServerMessage>;
    refreshToken(request: UserRequest): Promise<AuthSuccess<Partial<User>>>;
    changePassword(changePasswordDto: ChangePasswordDTO, request: UserRequest): Promise<User>;
    validateUserPassword(loginDto: LoginDTO): Promise<User>;
    generateToken(user: User): string;
    generateRefreshToken(user: User): string;
    findOne(id: number): Promise<User>;
    getUserIfRefreshTokenMatches(refreshToken: string, userId: number): Promise<User>;
    setCurrentRefreshToken(refreshToken: string, id: number): Promise<void>;
}
