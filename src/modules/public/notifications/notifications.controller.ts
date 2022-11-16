import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsDTO } from './notifications.dto';
import { NotificationsService } from './notifications.service';

@Controller('push-notifications')
export class notificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async send(@Body() NotificationDto: NotificationsDTO) {
    return await this.notificationsService.send(NotificationDto);
  }

  

}
