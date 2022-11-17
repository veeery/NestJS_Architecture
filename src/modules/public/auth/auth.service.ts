import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationErrorException } from 'src/common/exceptions/validation-exception';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { AuthSuccess } from 'src/common/interfaces/response.interface';
import { ServerMessage } from 'src/common/interfaces/server-message.interface';
import { AppConfigService } from 'src/modules/app/app-config.services';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { ChangePasswordDTO, LoginDTO, RegisterDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    readonly appConfigService: AppConfigService,
    private jwtService: JwtService,
    private userService: UserService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDTO): Promise<AuthSuccess<Partial<User>>> {
    const user = await this.validateUserPassword(loginDto);
    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);
    await this.setCurrentRefreshToken(refreshToken, user.id);
    return { data: user.toJson(), token: token, refreshToken: refreshToken };
  }

  async register(
    registerDto: RegisterDTO,
  ): Promise<AuthSuccess<Partial<User>>> {
    const user = this.userRepository.create(registerDto);
    const token = this.generateToken(user);
    try {
      await user.save();
    } catch (err) {
      if (err.code == 'ER_DUP_ENTRY')
        throw new ValidationErrorException({
          username: ['Username has been used'],
        });
      throw err;
    }
    return { data: user.toJson(), token: token };
  }

  async logout(request: UserRequest): Promise<ServerMessage> {
    const user = request.user;
    console.log(request.user);
    await this.setCurrentRefreshToken(null, user.id);
    return { message: 'Successfully Logout' };
  }

  async refreshToken(
    request: UserRequest,
  ): Promise<AuthSuccess<Partial<User>>> {
    const { id } = request.user;
    const oldRefreshToken =
      request.headers['authorization'].split('Bearer ')[1];
    const user = await this.getUserIfRefreshTokenMatches(oldRefreshToken, id);
    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);
    await this.setCurrentRefreshToken(refreshToken, user.id);
    return { data: user.toJson(), token: token, refreshToken: refreshToken };
  }

  async changePassword(
    changePasswordDto: ChangePasswordDTO,
    request: UserRequest,
  ): Promise<User> {
    const { oldPassword, newPassword } = changePasswordDto;
    const { username } = request.user;
    const user = await this.validateUserPassword({
      password: oldPassword,
      username,
    });
    user.password = newPassword;

    return (await user.save()).toJson();
  }

  //Utils to help Auth Functions
  async validateUserPassword(loginDto: LoginDTO): Promise<User> {
    const { username, password } = loginDto;
    const user = await this.userService.getUserByUsername(username);
    if (!user) throw new BadRequestException('Username Not Found');
    if (!(await user.validatePassword(password)))
      throw new BadRequestException('Password Not Correct');
    return user;
  }

  generateToken(user: User): string {
    const { id, username } = user;
    return this.jwtService.sign({ id, username });
  }

  generateRefreshToken(user: User): string {
    const { id, username } = user;
    return this.jwtService.sign(
      { id, username },
      {
        secret: this.appConfigService.jwtRefresh.secret,
        expiresIn: this.appConfigService.jwtRefresh.signOptions.expiresIn,
      },
    );
  }

  async findOne(id: number): Promise<User> {
    const [user] = await this.userRepository.find({
      where: { id },
    });
    if (!user) throw new UnauthorizedException();
    return user.toJson();
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const [user] = await this.userRepository.find({
      where: { id: userId },
      relations: {
        history: true,
      },
    });
    if (!user) throw new BadRequestException('Username Not Found');
    if (!(await user.validateRefreshToken(refreshToken)))
      throw new BadRequestException('Failed Token Refresh');
    return user.toJson();
  }

  async setCurrentRefreshToken(refreshToken: string, id: number) {
    const user = await this.findOne(id);
    delete user.password;
    const updatedUser = this.userRepository.create({
      ...user,
      ...{ currentHashedRefreshToken: refreshToken },
    });
    await updatedUser.save();
    return;
  }
}
