import { Pagination } from 'nestjs-typeorm-paginate';
import { SuccessResponse } from 'src/common/interfaces/response.interface';
import { ServerMessage } from 'src/common/interfaces/server-message.interface';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserProfileDTO, UserQuery } from './user.dto';
import { User } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createAccount(createUserDto: CreateUserDTO): Promise<{
        data: User;
        message: string;
    }>;
    getUser(id: number): Promise<SuccessResponse<User>>;
    getAllUser(userQuery: UserQuery): Promise<Pagination<User>>;
    updateUserProfile(id: number, updateUserProfileDto: UpdateUserProfileDTO): Promise<SuccessResponse<User>>;
    deleteAccount(id: number): Promise<ServerMessage>;
    getUserByUsername(username: string): Promise<User>;
}
