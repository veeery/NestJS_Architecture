import { Injectable, NotFoundException } from '@nestjs/common';
import { SuccessResponse } from 'src/common/interfaces/response.interface';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDTO, UpdateUserProfileDTO, UserQuery } from './user.dto';
import { ValidationErrorException } from 'src/common/exceptions/validation-exception';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { like } from 'src/common/utils/orm';

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
        data: await (await user.save()).toJson(),
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
    return { data: user.toJson() };
  }

  async getAllUser(userQuery: UserQuery): Promise<Pagination<User>> {
    const { limit, page, search, orderBy, sortBy } = userQuery;
    const query = this.userRepository.createQueryBuilder('user');
    // getAllUser With Options Search by Name
    if (search) query.where(like('user.name', search));
    // getAllUser With Options orderBy & sortBy
    if (orderBy && sortBy) query.orderBy(`user.${orderBy}`, sortBy);

    const paginated = paginate<User>(query, { limit, page });

    (await paginated).items.forEach((user) => user);

    return paginated;
  }

  async updateUserProfile(
    id: number,
    updateUserProfileDto: UpdateUserProfileDTO,
  ): Promise<SuccessResponse<User>> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    const updatedUser = this.userRepository.create({
      ...user,
      ...updateUserProfileDto,
    });

    return {
      data: (await updatedUser.save()).toJson(),
      message: 'Succesfully Update User Profile',
    };
  }
}
