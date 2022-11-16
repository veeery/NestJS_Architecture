import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { SuccessResponse } from 'src/common/interfaces/response.interface';
import { equal, like } from 'src/common/utils/orm';
import { In, Repository } from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { CreateHistoryDTO, HistoryQuery } from './history.dto';
import { History } from './history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History) private historyRepository: Repository<History>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createHistory(
    addHistory: CreateHistoryDTO,
    userRequest: UserRequest,
  ): Promise<SuccessResponse<History>> {
    const history = this.historyRepository.create(addHistory);

    history.userId = userRequest.user.id;
    await this.applyProductDetail(history);

    try {
      return {
        data: await history.save(),
        message: 'Successfully Create History',
      };
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async getHistory(historyId: number): Promise<SuccessResponse<History>> {
    const history = await this.historyRepository.findOne({
      where: { id: historyId },
      relations: {
        historyDetail: {
          product: true,
        },
      },
    });
    return { data: history };
  }

  async getHistoryByUser(
    historyQuery: HistoryQuery,
    userRequest: UserRequest,
  ): Promise<Pagination<History>> {
    const { limit, page, search, orderBy, sortBy } = historyQuery;
    const query = this.historyRepository.createQueryBuilder('history');

    query.where(equal('history.userId', userRequest.user.id));

    query.orderBy(`history.createdAt`, 'DESC');

    const paginated = paginate<History>(query, { limit, page });

    return paginated;
  }

  async applyProductDetail(history: History): Promise<void> {
    const productIds = [];
    for (const historyDetail of history.historyDetail) {
      const product = await this.productRepository.findOne({
        where: {
          id: historyDetail.productId,
        },
      });

      if (product) {
        productIds.push(historyDetail.productId);
      }
      if (!product) {
        throw new BadRequestException('Ada id Produk yang salah.');
      }
    }

    const products = await this.productRepository.findBy({
      id: In(productIds),
    });

    for (const historyDetail of history.historyDetail) {
      const product = products.find(
        (product) => product.id == historyDetail.productId,
      );

      if (product.qty < historyDetail.qty) {
        throw new BadRequestException('Qty Product Not Enough');
      }
      product.qty -= historyDetail.qty;

      try {
        await product.save();
      } catch (err) {
        throw err;
      }
    }
  }
}
