import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DashboardService } from "./dashboard.service";

@Controller({path: 'dashboard'})
@UseGuards(AuthGuard())
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

    @Get()
    getDashoardInfo(){
      return this.dashboardService.getDashoardInfo();
    }
}