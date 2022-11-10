import { Injectable, NotFoundException } from '@nestjs/common';
import { SuccessResponse } from 'src/common/interfaces/response.interface';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationErrorException } from 'src/common/exceptions/validation-exception';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { like } from 'src/common/utils/orm';
import { ServerMessage } from 'src/common/interfaces/server-message.interface';
import { CreateHistoryDTO } from './history.dto';
import { History } from './history.entity';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { Product } from '../product/product.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History) private historyRepository: Repository<History>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createHistory(addHistory: CreateHistoryDTO, userRequest: UserRequest) {
    addHistory.userId = 1;
    const history = this.historyRepository.create(addHistory);

    if (addHistory.productIds) {
      history.product = await this.productRepository.findBy({
        id: In(addHistory.productIds),
      });
    }

    try {
      return {
        data: await history.save(),
        message: 'Successfully Create History',
      };
    } catch (err) {
      throw err;
    }
  }
}