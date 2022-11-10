import { Model } from 'src/common/core/model';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@Entity()
export class Product extends Model {
  @Column()
  name: string;

  @Column({ unique: true })
  scanCode: string;

  @Column({ default: 0 })
  qty: number;

  @Column()
  unit: string;

  toJson() {
    return this;
  }
}
