'use strict';

import {Keyboard} from 'react-native';

import {Component} from './base';

export default class Notification extends Component {

  constructor(options) {
    super(options);
    Keyboard.addListener('keyboardWillShow', this.onShow.bind(this));
    Keyboard.addListener('keyboardDidHide', this.onHide.bind(this));
  }

  onShow() {
    this.visible = true;
  }

  onHide() {
    this.visible = false;
  }
}
