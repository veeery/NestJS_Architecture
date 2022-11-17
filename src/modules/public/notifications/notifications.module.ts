import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { notificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [],
  controllers: [notificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
