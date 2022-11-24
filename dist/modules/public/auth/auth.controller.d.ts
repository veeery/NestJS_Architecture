import { UserRequest } from 'src/common/interfaces/request.interface';
import { ChangePasswordDTO, LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDTO): Promise<import("../../../common/interfaces/response.interface").AuthSuccess<Partial<import("../user/user.entity").User>>>;
    logout(request: UserRequest): Promise<import("../../../common/interfaces/server-message.interface").ServerMessage>;
    register(registerDto: RegisterDTO): Promise<import("../../../common/interfaces/response.interface").AuthSuccess<Partial<import("../user/user.entity").User>>>;
    changePassword(changePasswordDto: ChangePasswordDTO, request: UserRequest): Promise<import("../user/user.entity").User>;
    refresh(request: UserRequest): Promise<import("../../../common/interfaces/response.interface").AuthSuccess<Partial<import("../user/user.entity").User>>>;
}
