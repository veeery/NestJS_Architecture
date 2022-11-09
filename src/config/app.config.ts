import { registerAs } from '@nestjs/config';

export interface AppOptions {
    name: string;
    env: string;
    url: string;
    port: number;
    lang: string;
    isLogging: boolean;
}

export const app = registerAs('app', (): AppOptions => ({
    name: process.env.APP_NAME,
    env: process.env.APP_ENV.toLowerCase() || 'development',
    url: process.env.APP_URL,
    port: +process.env.APP_PORT || 3000,
    lang: process.env.APP_LANG || 'id',
    isLogging: process.env.APP_LOG == 'TRUE'
}),
);