import { UserRequest } from 'src/common/interfaces/request.interface';
import { HistoryQuery } from './history.dto';
import { HistoryService } from './history.service';
export declare class HistoryController {
    private readonly historyService;
    constructor(historyService: HistoryService);
    getAllHistory(historyQuery: HistoryQuery): Promise<import("nestjs-typeorm-paginate").Pagination<import("./history.entity").History, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getHistoryByUser(userRequest: UserRequest, historyQuery: HistoryQuery): Promise<import("nestjs-typeorm-paginate").Pagination<import("./history.entity").History, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getHistory(id: number): Promise<import("../../../common/interfaces/response.interface").SuccessResponse<import("./history.entity").History>>;
}
