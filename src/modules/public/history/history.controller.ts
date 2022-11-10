import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  ParseIntPipe,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { CreateHistoryDTO } from './history.dto';
import { HistoryService } from './history.service';

@Controller({ path: 'history' })
export class HistoryController {
  constructor(private readonly hisotryServices: HistoryService) {}

  @Post()
  createHistory(
    @Body() createHistoryDto: CreateHistoryDTO,
    @Req() userRequest: UserRequest,
  ) {
    return this.hisotryServices.createHistory(createHistoryDto, userRequest);
  }
}
