import { Module } from "@nestjs/common"
import HelloWorldModule from "./hello-world/hello-world.module";

@Module({
    imports: [
        HelloWorldModule
    ]
})
export default class PublicModule {}