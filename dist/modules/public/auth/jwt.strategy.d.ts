import { JwtPayload } from './jwt.interface';
import { AuthService } from './auth.service';
import { AppConfigService } from 'src/modules/app/app-config.services';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    readonly appConfigService: AppConfigService;
    constructor(authService: AuthService, appConfigService: AppConfigService);
    validate(payload: JwtPayload): Promise<import("../user/user.entity").User>;
}
export {};
