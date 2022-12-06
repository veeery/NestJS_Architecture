import { Module } from "@nestjs/common";
import { ProductModule } from "../product/product.module";
import { UserModule } from "../user/user.module";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";

@Module({
  imports: [ProductModule, UserModule],
  controllers: [DashboardController],
  providers:[DashboardService]
})

export class DashboardModule {}