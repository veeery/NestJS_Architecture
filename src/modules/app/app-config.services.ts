import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppOptions } from 'src/config/app.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class AppConfigService extends ConfigService {
    
  get app(): AppOptions {
    return this.get('app');
  }

  get orm(): TypeOrmModuleOptions {
    return this.get('orm');
  }

  get isProduction(): boolean {
    return this.app.env == 'production';
  }

  get isDevelopment(): boolean {
    return this.app.env == 'development';
  }

  get isLogging(): boolean {
    return this.app.isLogging;
  }
}
