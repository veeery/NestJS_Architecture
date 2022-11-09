import { Injectable, NotFoundException } from '@nestjs/common';
import { SuccessResponse } from 'src/common/interfaces/response.interface';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './user.dto';
import { ValidationErrorException } from 'src/common/exceptions/validation-exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createAccount(createUserDto: CreateUserDTO) {
    const user = this.userRepository.create(createUserDto);

    // if (createUserDto.)

    try {
      return {
        data: await user.save(),
        message: 'Account Successfully Create',
      };
    } catch (err) {
      if (err.code == 'ER_DUP_ENTRY')
        throw new ValidationErrorException({
          code: ['Username has been used'],
        });
      throw err;
    }
  }

  async getUser(id: number): Promise<SuccessResponse<User>> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {},
    });
    if (!user) throw new NotFoundException('User Not Found');
    return { data: user };
  }
}
