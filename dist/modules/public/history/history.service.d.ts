import { Pagination } from 'nestjs-typeorm-paginate';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { SuccessResponse } from 'src/common/interfaces/response.interface';
import { Repository } from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { CreateHistoryDTO, HistoryQuery } from './history.dto';
import { History } from './history.entity';
export declare class HistoryService {
    private historyRepository;
    private productRepository;
    private userRepository;
    constructor(historyRepository: Repository<History>, productRepository: Repository<Product>, userRepository: Repository<User>);
    createHistory(addHistory: CreateHistoryDTO, userRequest: UserRequest): Promise<boolean>;
    getHistory(historyId: number): Promise<SuccessResponse<History>>;
    getHistoryByUser(historyQuery: HistoryQuery, userRequest: UserRequest): Promise<Pagination<History>>;
    getAllHistory(historyQuery: HistoryQuery): Promise<Pagination<History, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    applyProductDetail(history: History): Promise<void | boolean>;
}
