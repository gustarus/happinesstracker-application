'use strict';

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
import Locale from '@core/components/locale';
import Notification from '@core/components/notification';
import Storage from '@core/components/storage';

import messages from './messages';
import methods from './methods';

export default {

  debug: {
    enabled: typeof __DEV__ !== 'undefined' && __DEV__,
    resetOnLaunch: false,
    resetWithFixtures: false
  },

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

  methods,

  components: {
    keyboard: {
      constructor: Keyboard,
      enabled: true,
      alias: true
    },

    locale: {
      constructor: Locale,
      enabled: true,
      alias: true,
      messages
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
  }
};
