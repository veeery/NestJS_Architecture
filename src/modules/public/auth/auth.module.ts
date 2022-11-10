import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshTokenStrategy } from './jwt-refresh.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [JwtStrategy, JwtRefreshTokenStrategy, AuthService],
  exports: [JwtStrategy, JwtRefreshTokenStrategy, AuthService],
})
export class AuthModule {}
