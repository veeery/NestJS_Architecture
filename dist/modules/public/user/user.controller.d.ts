import { CreateUserDTO, UpdateUserProfileDTO, UserQuery } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createAccount(createUserDto: CreateUserDTO): Promise<{
        data: import("./user.entity").User;
        message: string;
    }>;
    getAllUser(userQuery: UserQuery): Promise<import("nestjs-typeorm-paginate").Pagination<import("./user.entity").User, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getUser(id: number): Promise<import("../../../common/interfaces/response.interface").SuccessResponse<import("./user.entity").User>>;
    updateUserProfile(id: number, UpdateUserProfileDto: UpdateUserProfileDTO): Promise<import("../../../common/interfaces/response.interface").SuccessResponse<import("./user.entity").User>>;
    deleteAccount(id: number): Promise<import("../../../common/interfaces/server-message.interface").ServerMessage>;
}
