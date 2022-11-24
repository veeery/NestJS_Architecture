import { Model } from 'src/common/core/model';
import { History } from '../history/history.entity';
export declare class User extends Model {
    name: string;
    username: string;
    password: string;
    currentHashedRefreshToken: string;
    history: History[];
    token?: string;
    get passSalt(): string;
    get tokenSalt(): string;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    hashRefreshToken(): Promise<void>;
    validateRefreshToken(currentHashedRefreshToken: string): Promise<boolean>;
    toJson(): this;
}
