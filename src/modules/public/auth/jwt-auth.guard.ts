import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    // const token = ExtractJwt.fromAuthHeaderAsBearerToken()(context.switchToHttp().getRequest());
    // const isTokenBlackList = await this.authService.isTokenBlacklist(token);

    // const request = context.switchToHttp().getRequest() as UserRequest;
    // const tenant = request.headers["tenant"];
    // const contextId = ContextIdFactory.getByRequest(request);
    // const authService = await this.moduleRef.resolve(AuthService, contextId);
    // await authService.useTenant(tenant);
    return super.canActivate(context) as boolean;
  }
}
