import {
  Body, Controller, HttpCode, Patch, Post, Req, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { ChangePasswordDTO, LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './jwt-refresh.guard';

@Controller({ path: `auth` })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  logout(@Req() request: UserRequest) {
    return this.authService.logout(request);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDTO) {
    return this.authService.register(registerDto);
  }

  @Patch('change-password')
  @UseGuards(AuthGuard())
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDTO,
    @Req() request: UserRequest,
  ) {
    return this.authService.changePassword(changePasswordDto, request);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(200)
  refresh(@Req() request: UserRequest) {
    return this.authService.refreshToken(request);
  }
}
