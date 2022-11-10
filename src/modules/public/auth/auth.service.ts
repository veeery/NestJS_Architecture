import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationErrorException } from 'src/common/exceptions/validation-exception';
import { UserRequest } from 'src/common/interfaces/request.interface';
import {
  AuthSuccess,
  SuccessResponse,
} from 'src/common/interfaces/response.interface';
import { ServerMessage } from 'src/common/interfaces/server-message.interface';
import { AppConfigService } from 'src/modules/app/app-config.services';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LoginDTO } from './auth.dto';

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
      relations: {
        history: true,
      },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const [user] = await this.userRepository.find({
      where: { id: userId },
      relations: {
        history: true,
      },
    });
    if (!user) throw new BadRequestException('Username tidak ditemukan');
    if (!(await user.validateRefreshToken(refreshToken)))
      throw new BadRequestException('Refresh Token Gagal');
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
