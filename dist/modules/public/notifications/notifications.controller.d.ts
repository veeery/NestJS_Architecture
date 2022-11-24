import { NotificationsDTO } from './notifications.dto';
import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    send(NotificationDto: NotificationsDTO): Promise<void>;
}
