import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { config } from "src/config";
import { AppConfigService } from "./app-config.services";


@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            expandVariables: true,
            load: config,
        }),
    ],
    providers: [
        AppConfigService
    ],
    exports: [
        AppConfigService,
    ]
})
export class GlobalModule {}