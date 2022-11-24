import { PaginationQuery } from 'src/common/core/pagination.query';
export declare class BaseUserDto {
    name: string;
}
export declare class CreateUserDTO extends BaseUserDto {
    name: string;
    username: string;
    password: string;
}
export declare class GetUserDTO extends BaseUserDto {
    name: string;
    username: string;
}
export declare class UpdateUserProfileDTO extends BaseUserDto {
    name: string;
    password: string;
}
export declare class UserQuery extends PaginationQuery {
}
