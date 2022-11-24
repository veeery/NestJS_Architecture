import { PaginationQuery } from 'src/common/core/pagination.query';
import { CreateHistoryDetailDTO } from '../history-detail/history-detail.dto';
export declare class CreateHistoryDTO {
    note: string;
    userId: number;
    historyDetail: CreateHistoryDetailDTO[];
}
export declare class GetHistoryDTO {
    note: string;
    userId: number;
    historyDetail: CreateHistoryDetailDTO[];
}
export declare class HistoryQuery extends PaginationQuery {
}
