import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { error } from 'console';
import { NotificationsDTO } from './notifications.dto';
import { NotificationsService } from './notifications.service';

// var admin = require('firebase-admin');
// var fcm = require('fcm-notification');

// var serviceAccount = require('push-notifications.json');
// const certPath = admin.credential.cert(serviceAccount);
// var FCM = new fcm(certPath);

// exports.sendPushNotification = (req: { body: { fcm_token: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): any; new(): any; }; }; }, next: any) => {
//   try {
//     let message = {
//       notification: {
//         title: 'Test Notif',
//         body: 'Test Message',
//       },
//       token: req.body.fcm_token,
//     };

//     FCM.send(message, function (err, response) {
//       if (err) {
//         return res.status(500).send({
//           message: err,
//         });
//       } else {
//         return res.status(200).send({
//           message: 'Notifications Sent',
//         });
//       }
//     });
//   } catch (err) {
//     throw err;
//   }
// };

@Controller('push-notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async send(@Body() NotificationDto: NotificationsDTO) {
    return await this.notificationsService.sendPushNotification(
      NotificationDto,
    );
  }
}
