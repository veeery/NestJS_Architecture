import { Model } from 'src/common/core/model';
import { History } from '../history/history.entity';
import { Product } from '../product/product.entity';
export declare class HistoryDetail extends Model {
    history: History;
    product: Product;
    historyId: number;
    productId: number;
    qty: number;
}
