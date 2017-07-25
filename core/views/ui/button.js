'use strict';

import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet, Navigator, ActivityIndicator, Linking} from 'react-native';
import {resolveStyle, styles} from '@core/theme';

class Button extends Component {

  constructor(options) {
    super(options);
    this.state = {waiting: false};
    this.onPress = this.onPress.bind(this);
    this.onDone = this.onDone.bind(this);
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const {text, children, style, focusStyle, labelStyle} = this.props;
    const runtimeStyle = [styles.button, style];
    const runtimeFocusStyle = [styles.buttonFocus, focusStyle];
    const runtimeLabelStyle = [styles.buttonLabel, labelStyle];

    if (this.state.waiting) {
      return (
        <View style={runtimeStyle}>
          <ActivityIndicator color={runtimeLabelStyle.color}/>
        </View>
      );
    } else {
      return (
        <TouchableHighlight
          onPress={this.onPress}
          style={runtimeStyle}
          underlayColor={resolveStyle(runtimeFocusStyle).backgroundColor}>
          {text ? <Text style={runtimeLabelStyle}>{text.toUpperCase()}</Text> : children}
        </TouchableHighlight>
      );
    }
  }

  onPress() {
    if (this.props.url) {
      Linking.openURL(this.props.url);
    } else {
      let result = this.props.onPress.apply(this, arguments);
      if (result instanceof Promise) {
        this.setState({waiting: true});
        result.then(this.onDone).catch(this.onDone);
      }

      return result;
    }
  }

  onDone() {
    if (this._mounted) {
      this.setState({waiting: false});
    }
  }
}

export default Button;
