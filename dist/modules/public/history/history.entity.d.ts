import { Model } from 'src/common/core/model';
import { User } from '../user/user.entity';
import { HistoryDetail } from '../history-detail/history-detail.entity';
export declare class History extends Model {
    note: string;
    user: User;
    userId: number;
    historyDetail: HistoryDetail[];
}
