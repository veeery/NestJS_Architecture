export interface AppOptions {
    name: string;
    env: string;
    url: string;
    port: number;
    lang: string;
    isLogging: boolean;
}
export declare const app: (() => AppOptions) & import("@nestjs/config").ConfigFactoryKeyHost<AppOptions>;
