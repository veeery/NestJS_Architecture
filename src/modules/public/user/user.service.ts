import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ValidationErrorException } from 'src/common/exceptions/validation-exception';
import { SuccessResponse } from 'src/common/interfaces/response.interface';
import { ServerMessage } from 'src/common/interfaces/server-message.interface';
import { like } from 'src/common/utils/orm';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserProfileDTO, UserQuery } from './user.dto';
import { User } from './user.entity';

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
        data: (await user.save()).toJson(),
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

    (await paginated).items.forEach((user) => user.toJson());

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

  async deleteAccount(id: number): Promise<ServerMessage> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {},
    });

    if (!user) throw new NotFoundException('User Not Found');

    try {
      await user.remove();
    } catch (err) {
      await user.softRemove();
    }

    return {
      message: 'Account Successfully Delete',
    };
  }

  // Utils Functions
  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where({ username })
      .getOne();

    if (!user) return null;
    return user;
  }
}
