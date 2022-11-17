import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { CreateHistoryDTO, HistoryQuery } from './history.dto';
import { HistoryService } from './history.service';

@Controller({ path: 'history' })
@UseGuards(AuthGuard())
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  createHistory(
    @Body() createHistoryDto: CreateHistoryDTO,
    @Req() userRequest: UserRequest,
  ) {
    return this.historyService.createHistory(createHistoryDto, userRequest);
  }

  @Get('user')
  getHistoryByUser(
    @Req() userRequest: UserRequest,
    @Query() historyQuery: HistoryQuery,
  ) {
    return this.historyService.getHistoryByUser(historyQuery, userRequest);
  }

  @Get(':id')
  getHistory(@Param('id', ParseIntPipe) id: number) {
    return this.historyService.getHistory(id);
  }
}
