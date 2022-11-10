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
import { UpdateDateColumn } from 'typeorm';
import { CreateUserDTO, UpdateUserProfileDTO, UserQuery } from './user.dto';
import { UserService } from './user.service';

@Controller({ path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createAccount(@Body() createUserDto: CreateUserDTO) {
    return this.userService.createAccount(createUserDto);
  }

  @Get()
  getAllUser(@Query() userQuery: UserQuery) {
    return this.userService.getAllUser(userQuery);
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(+id);
  }

  @Patch(':id')
  updateUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateUserProfileDto: UpdateUserProfileDTO,
  ) {
    return this.userService.updateUserProfile(+id, UpdateUserProfileDto);
  }

  @Delete(':id')
  deleteAccount(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteAccount(+id);
  }
}
