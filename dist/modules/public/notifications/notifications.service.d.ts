import { NotificationsDTO } from './notifications.dto';
export declare class NotificationsService {
    constructor();
    sendPushNotification(notificationsDto: NotificationsDTO): Promise<void>;
}
