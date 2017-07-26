'use strict';

import {Component} from './base';
import {NativeModules} from 'react-native';

import moment from 'moment';
import 'moment/locale/en-gb';
import '@core/config/moment/ru';

export default class Translate extends Component {

  momentLocales = {
    en: 'en-gb',
    ru: 'ru',
  };

  constructor(options) {
    super(options);

    this.currentLocale = NativeModules.SettingsManager.settings.AppleLocale
      .toLowerCase()
      .replace('_', '-');

    const [fallbackLocale] = this.currentLocale.split('-');
    const momentLocale = this.momentLocales[this.currentLocale]
      || this.momentLocales[fallbackLocale]
      || this.momentLocales.en

    moment.locale(momentLocale);
  }

  t(message) {
    const {messages, currentLocale} = this;
    const [fallbackLocale] = this.currentLocale.split('-');
    return messages[currentLocale] && messages[currentLocale][messages]
      || messages[fallbackLocale] && messages[fallbackLocale][message]
      || message;
  }
}
