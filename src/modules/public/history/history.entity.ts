import { Model } from 'src/common/core/model';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Entity()
export class History extends Model {
  @Column({ nullable: true })
  note: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  userId: number;

  @ManyToMany(() => Product, (product) => product.id)
  @JoinTable()
  product: Product[];
}
