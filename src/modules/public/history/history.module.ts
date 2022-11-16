import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryDetail } from '../history-detail/history-detail.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { HistoryController } from './history.controller';
import { History } from './history.entity';
import { HistoryService } from './history.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([History]),
    TypeOrmModule.forFeature([HistoryDetail]),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [TypeOrmModule, HistoryService],
})
export class HistoryModule {}
