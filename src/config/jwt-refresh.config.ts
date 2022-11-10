import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces';

export const jwtRefresh = registerAs(
  'jwt-refresh',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_REFRESH_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
  }),
);
