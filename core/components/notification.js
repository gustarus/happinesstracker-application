'use strict';

import {Alert, Keyboard, PushNotificationIOS} from 'react-native';
import {Component} from './base';
import {app} from '@core/instances';
import moment from 'moment';

export default class Notification extends Component {

  info(message) {
    return new Promise(resolve => {
      if (app.keyboard.visible) {
        Keyboard.dismiss();
        const listener = Keyboard.addListener('keyboardDidHide', e => {
          listener.remove();
          this.alert(message, resolve);
        });
      } else {
        this.alert(message, resolve);
      }
    });
  }

  alert(message, callback) {
    Alert.alert(message, null, [{text: 'Ок', onPress: callback}]);
  }

  confirm(message) {
    return new Promise((resolve, reject) => {
      Alert.alert(message, null, [
        {text: 'Ок', onPress: resolve},
        {text: 'Отмена', onPress: reject}
      ]);
    });
  }

  clean() {
    PushNotificationIOS.removeAllDeliveredNotifications();
  }

  request() {
    return new Promise((resolve, reject) => {
      return PushNotificationIOS.requestPermissions().then(state => {
        if (!state.alert && !state.sound && !state.badge) {
          const message = app.t('Please, enable notifications for the app in settings');
          this.info(message).then(reject);
        } else {
          resolve();
        }
      });
    });
  }

  local(fireDateTime, message, data, counter, repeatInterval) {
    let timestamp = fireDateTime;
    PushNotificationIOS.scheduleLocalNotification({
      fireDate: timestamp.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      alertBody: message,
      userInfo: data,
      applicationIconBadgeNumber: counter,
      repeatInterval
    });
  }

  cancel(info = null) {
    if (info) {
      PushNotificationIOS.cancelLocalNotifications(info);
    } else {
      PushNotificationIOS.cancelAllLocalNotifications();
    }
  }

  receive() {
    return PushNotificationIOS.getInitialNotification().then(notification => {
      if (!notification) {
        throw notification;
      }

      return notification._data;
    });
  }

  listen(callback) {
    PushNotificationIOS.addEventListener('localNotification', notification => {
      callback(notification._data);
    });
  }
  
  checkPermissions() {
    return new Promise((resolve, reject) => {
      PushNotificationIOS.checkPermissions(state => {
        state.alert || state.badge || state.sound
          ? resolve(state) : reject(state);
      });
    });
  }

  badge(count) {
    PushNotificationIOS.setApplicationIconBadgeNumber(count);
  }
}
