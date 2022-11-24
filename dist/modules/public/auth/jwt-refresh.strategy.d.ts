import { Request } from 'express';
import { JwtPayload } from './jwt.interface';
import { AuthService } from './auth.service';
import { AppConfigService } from 'src/modules/app/app-config.services';
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => any;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    private readonly authService;
    readonly appConfigService: AppConfigService;
    constructor(authService: AuthService, appConfigService: AppConfigService);
    validate(request: Request, payload: JwtPayload): Promise<import("../user/user.entity").User>;
}
export {};
