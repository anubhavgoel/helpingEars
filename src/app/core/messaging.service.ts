import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class MessagingService {
  private messaging = firebase.messaging();

  private messageSource = new Subject();
  currentMessage = this.messageSource.asObservable();

  constructor(private afs: AngularFirestore) {}

  // get permission to send messages
  getPermission(user) {
    this.messaging
      .requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token);
        this.saveToken(user, token);
      })
      .catch(err => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  // Listen for token refresh
  monitorRefresh(user) {
    this.messaging.onTokenRefresh(() => {
      this.messaging
        .getToken()
        .then(refreshedToken => {
          console.log('Token refreshed.');
          this.saveToken(user, refreshedToken);
        })
        .catch(err => console.log(err, 'Unable to retrieve new token'));
    });
  }

  // used to show message when app is open
  receiveMessages() {
    this.messaging.onMessage(payload => {
      console.log('Message received. ', payload);
      this.messageSource.next(payload);
    });
  }

  sendMessages(data) {
    const key =
      // tslint:disable-next-line:max-line-length
      'AAAAaxZYCNw:APA91bHtonI71HroEryVctJapKPvbQEgPW1hTxPoJl7Pv5YbO2MFTGqHR6eD2gCWU3FbRjeW3lo5Sg1fT6jszLGs1J7Xw7DoaKDoT3xBE3QPAeHP35m16Iranrk9a6O_vXbO0M8Yonz46y-Jw4dreTK9-Yo_Gd2GRg';
    const key2 =
      'AAAA9IJ1e0g:APA91bGpSM-L9qAaFQ5GPwJFzKcQA832pqQ3PwHfJnA2M_k75mYKqKHoU31bv2QPJxq8zmL9fHo58WzXNZekd3zglECDfy4ym6KWKOS5aYSDSwduJc3SppZ3P5vfFd4pnw5MHdJXFDvewpANlACFky4EMC2Z3voGkA';
    this.afs
      .collection('users')
      .valueChanges()
      .subscribe(users => {
        console.log(users);
        users.map((value: any, index, array) => {
          Object.keys(value.fcmTokens).map(token => {
            const notification = {
              title: 'Someone fall from the stairs',
              body: 'Please check',
              icon: 'assets/icons/icon-128x128.png',
              click_action: 'http://localhost:4200'
            };

            fetch('https://fcm.googleapis.com/fcm/send', {
              method: 'POST',
              headers: {
                Authorization: 'key=' + key2,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                notification: data,
                to: token
              })
            })
              .then(function(response) {
                console.log(response);
              })
              .catch(function(error) {
                console.error(error);
              });
          });
        });
      });
  }

  // save the permission token in firestore
  private saveToken(user, token): void {
    debugger;
    const currentTokens = user.fcmTokens || {};
    console.log(currentTokens, token);

    // If token does not exist in firestore, update db
    if (!currentTokens[token]) {
      const userRef = this.afs.collection('users').doc(user.uid);
      const tokens = { ...currentTokens, [token]: true };
      userRef.update({ fcmTokens: tokens });
    }
  }

  showAlert(data) {
    alert(data);
  }
}
