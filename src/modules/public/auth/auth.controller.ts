import {
  Body,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Req,
  Patch,
  Controller,
} from '@nestjs/common';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { LoginDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller({ path: `auth` })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }
}
