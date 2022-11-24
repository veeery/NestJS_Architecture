import { ConfigService } from '@nestjs/config';
import { AppOptions } from 'src/config/app.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';
export declare class AppConfigService extends ConfigService {
    get app(): AppOptions;
    get orm(): TypeOrmModuleOptions;
    get isProduction(): boolean;
    get isDevelopment(): boolean;
    get jwt(): JwtModuleOptions;
    get jwtRefresh(): JwtModuleOptions;
    get isLogging(): boolean;
}
