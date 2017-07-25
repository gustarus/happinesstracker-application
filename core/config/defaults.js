'use strict';

import {Navigator, PushNotificationIOS} from 'react-native';
import moment from 'moment';

import SplashScene from '@core/story/1-splash';
import MeetScene from '@core/story/2-meet';
import MeetHomeScene from '@core/story/2-meet/scenes/1-home';
import MeetRecordHappinessScene from '@core/story/2-meet/scenes/2-record-happiness';
import MeetRecordAliveScene from '@core/story/2-meet/scenes/3-record-alive';
import MeetCompleteScene from '@core/story/2-meet/scenes/4-complete';
import HomeScene from '@core/story/3-home';
import RecordScene from '@core/story/4-record';
import RecordAliveScene from '@core/story/4-record/scenes/1-alive';
import RecordCompleteScene from '@core/story/4-record/scenes/2-complete';
import RecordsScene from '@core/story/5-records';
import RemindersScene from '@core/story/6-reminders';

// import application components
import Keyboard from '@core/components/keyboard';
import Notification from '@core/components/notification';
import Storage from '@core/components/storage';

// notification messages variants
const messages = ['Let\'s make a record!'];

// debug section
const debug = typeof __DEV__ !== 'undefined' && __DEV__;
const debugClean = false;

export default {

  debug: debug,
  debugClean: debug ? debugClean : false,

  home: {
    screen: SplashScene
  },

  drawer: {
    scenes: {
      home: {screen: HomeScene},
      records: {screen: RecordsScene},
      reminders: {screen: RemindersScene}
    },

    config: {
      initialRouteName: 'home'
    }
  },

  meet: {
    scenes: {
      'index': {screen: MeetScene},
      'home': {screen: MeetHomeScene},
      'record-happiness': {screen: MeetRecordHappinessScene},
      'record-alive': {screen: MeetRecordAliveScene},
      'complete': {screen: MeetCompleteScene}
    },

    config: {
      initialRouteName: 'index'
    }
  },

  record: {
    scenes: {
      'index': {screen: RecordScene},
      'alive': {screen: RecordAliveScene},
      'complete': {screen: RecordCompleteScene}
    },

    config: {
      initialRouteName: 'index'
    }
  },

  components: {
    keyboard: {
      constructor: Keyboard,
      enabled: true,
      alias: true
    },

    notification: {
      constructor: Notification,
      enabled: true,
      alias: true
    },

    storage: {
      constructor: Storage,
      enabled: true,
      alias: true,
      defaults: {
        learned: {
          general: false,
          remove: false
        },
        records: {},
        reminders: {
          enabled: false,
          intelligence: false,
          collection: {}
        }
      }
    }
  },

  methods: {
    tutorialSkipped() {
      const keys = Object.keys(this.storage.get('learned'));
      const learned = keys.reduce((stack, key) => {
        stack[key] = true;
        return stack;
      }, {});
      
      this.storage.set({learned}).save();
    },

    getAvailableReminders() {
      let items = [];
      for (let i = 0; i < 24; i++) {
        const key = i;
        const hours = i;
        const minutes = 0;
        const label = `${i}:${minutes < 10 ? '0' + minutes : minutes}`;
        items.push({key, hours, minutes, label});
      }

      return items;
    },

    getChartCriterias: () => ([
      {key: 'happy', label: 'Happiness', title: period => `Are you happy in this ${period}?`},
      {key: 'alive', label: 'Alive', title: period => `Are you alive in this ${period}?`}
    ]),

    getChartPeriods: () => ([
      {key: 'week', step: 1, label: 'Week', from: moment().subtract(1, 'weeks').add(1, 'd'), till: moment()},
      {key: 'month', step: 1, label: 'Month', from: moment().subtract(1, 'months').add(1, 'd'), till: moment()},
      {key: 'quarter', step: 7, label: 'Quarter', from: moment().subtract(1, 'quarters').add(1, 'd'), till: moment()},
      {key: 'year', step: 21, label: 'Year', from: moment().subtract(1, 'years').add(1, 'd'), till: moment()}
    ]),

    getReminderData({hours, minutes}) {
      return {action: 'record', hours, minutes};
    },

    scheduleReminder(reminder) {
      let timestamp = moment().clone();
      timestamp.hours(reminder.hours);
      timestamp.minutes(reminder.minutes);
      timestamp.seconds(0);

      let threshold = timestamp.clone();
      
      if (this.storage.get('reminders.intelligence')) {
        timestamp.add(30, 'minutes');
        threshold.subtract(30, 'minutes');
      }

      const now = moment();
      if (now.isSameOrAfter(threshold)) {
        timestamp.add(1, 'days');
      }

      const message = messages[Math.floor((Math.random() * messages.length))];
      const data = this.getReminderData(reminder);
      
      this.notification.local(timestamp, message, data, 1, 'day');
    },

    scheduleReminders(reminders) {
      for (let i in reminders) {
        this.scheduleReminder(reminders[i]);
      }
    },

    cancelReminder(reminder) {
      const info = this.getReminderData(reminder);
      this.notification.cancel(info);
    },

    cancelReminders() {
      this.notification.cancel();
    },

    rescheduleReminder(reminder) {
      this.cancelReminder(reminder);
      this.scheduleReminder(reminder); 
    },

    rescheduleReminders(reminders) {
      this.cancelReminders();
      this.scheduleReminders(reminders);
    },

    insertRecord(happy, alive, causes) {
      const now = moment();
      const key = now.unix();
      const timestamp = now.format();

      const record = {key, timestamp, happy, alive, causes};
      return this.storage.set(`records.${key}`, record).save().then(() => {
        this.rescheduleReminders(this.storage.get('reminders.collection'));
      });
    }
  }
};
