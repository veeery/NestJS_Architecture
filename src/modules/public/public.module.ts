import { Module } from "@nestjs/common"
import HelloWorldModule from "./hello-world/hello-world.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [
        HelloWorldModule,
        UserModule
    ]
})
export default class PublicModule {}