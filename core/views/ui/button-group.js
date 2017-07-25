'use strict';

import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet, Navigator, ActivityIndicator, Linking} from 'react-native';
import {styles} from '@core/theme';
import Button from './button';

class ButtonGroup extends Component {

  state = {
    selectedIndex: this.props.selectedIndex
  };

  render() {
    const {buttons, style, buttonStyle, buttonFocusStyle, buttonLabelStyle} = this.props;
    const {selectedIndex} = this.state;

    const children = buttons.map((label, i) => {
      const runtimeStyle = i > 0 && i < buttons.length - 1
        ? componentStyles.buttonMiddle
        : (i === 0 ? componentStyles.buttonLeft : componentStyles.buttonRight);

      const activeStyle = i === selectedIndex
        ? [styles.buttonFocus, componentStyles.buttonActive, buttonFocusStyle]
        : null;

      return (
        <Button
          key={i}
          text={label}
          style={[componentStyles.button, buttonStyle, runtimeStyle].concat(activeStyle)}
          onPress={this.onPress.bind(this, i)}
          focusStyle={buttonFocusStyle}
          labelStyle={buttonLabelStyle}/>
      );
    });

    return (
      <View style={[componentStyles.container, style]}>
        {children}
      </View>
    );
  }

  onPress(i) {
    this.setState({selectedIndex: i});
    this.props.onPress && this.props.onPress(i);
  }
}

const componentStyles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  button: {
    alignSelf: 'flex-start',
    flex: 1
  },

  buttonActive: {},

  buttonLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0
  },

  buttonMiddle: {
    borderRadius: 0,
    borderRightWidth: 0
  },

  buttonRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
};

export default ButtonGroup;
