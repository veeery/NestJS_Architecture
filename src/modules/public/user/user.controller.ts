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
} from '@nestjs/common';
import { create } from 'domain';
import { CreateUserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller({ path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createAccount(@Body() createUserDto: CreateUserDTO) {
    return this.userService.createAccount(createUserDto);
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(+id);
  }
}
