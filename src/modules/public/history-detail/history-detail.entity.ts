import { Model } from 'src/common/core/model';
import {
  Column, Entity, ManyToOne
} from 'typeorm';
import { History } from '../history/history.entity';
import { Product } from '../product/product.entity';

@Entity()
export class HistoryDetail extends Model {
  @ManyToOne(() => History, history => history.historyDetail)
  history: History;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  historyId: number;

  @Column()
  productId: number;

  @Column()
  qty: number;
}
