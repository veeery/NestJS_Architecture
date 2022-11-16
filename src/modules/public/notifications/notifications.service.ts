import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import * as serviceAccount from 'push-notifications.json';
import { ServiceAccount } from 'firebase-admin';
import { NotificationsDTO } from './notifications.dto';

@Injectable()
export class NotificationsService {
  constructor() {
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount as ServiceAccount),
    });
  }

  async send(notificationsDto: NotificationsDTO) {
    const { title, body, token } = notificationsDto;

    console.log(notificationsDto);

    const payload = {
      notification: {
        title,
        body,
      },
    };

    // return firebase.messaging().sendToDevice(token, payload);

    return Promise.all([
      await firebase.messaging().sendToDevice(token, payload),
    ]);
    // console.log(`${this.send.name} executed with notification payload`);
  }
}
