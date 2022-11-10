import { Module } from "@nestjs/common"
import HelloWorldModule from "./hello-world/hello-world.module";
import { HistoryModule } from "./history/history.module";
import { ProductModule } from "./product/product.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [
        HelloWorldModule,
        UserModule,
        ProductModule,
        HistoryModule
    ]
})
export default class PublicModule {}