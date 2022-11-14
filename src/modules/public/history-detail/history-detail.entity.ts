import { Model } from 'src/common/core/model';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { History } from '../history/history.entity';
import { Product } from '../product/product.entity';

@Entity()
export class HistoryDetail extends Model {
  @ManyToOne(() => History)
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
