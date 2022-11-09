import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const orm = registerAs(
  'orm',
  (): TypeOrmModuleOptions => ({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: process.env.DB_SYNC == 'TRUE',
    namingStrategy: new SnakeNamingStrategy(),
    extra: {
      decimalNumbers: true,
    },
    autoLoadEntities: true,
  }),
);
