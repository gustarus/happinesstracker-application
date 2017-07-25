'use strict';

import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableOpacity} from 'react-native';
import {app} from '@core/instances';
import {styles} from '@core/theme';
import {BackButton, Button} from '@core/views';

class Brick extends Component {

  state = {
    option: null
  };

  render() {
    const options = [
      {
        value: 2,
        label: 'Yes',
        style: styles.buttonGreen,
        focusStyle: styles.buttonGreenFocus,
        labelStyle: styles.buttonGreenLabel
      },
      {
        value: 1,
        label: 'Rather yes than no',
        style: styles.buttonBrilliantGreen,
        focusStyle: styles.buttonBrilliantGreenFocus,
        labelStyle: styles.buttonBrilliantGreenLabel
      },
      {
        value: 0,
        label: 'Well...',
        style: styles.buttonYellow,
        focusStyle: styles.buttonYellowFocus,
        labelStyle: styles.buttonYellowLabel
      },
      {
        value: -1,
        label: 'Rather no than yes',
        style: styles.buttonOrange,
        focusStyle: styles.buttonOrangeFocus,
        labelStyle: styles.buttonOrangeLabel
      },
      {
        value: -2,
        label: 'No',
        style: styles.buttonRed,
        focusStyle: styles.buttonRedFocus,
        labelStyle: styles.buttonRedLabel
      },
    ];

    const runtimeStyle = this.state.option
      ? {backgroundColor: this.state.option.style.backgroundColor} : null;

    return (
      <View style={[styles.scene, runtimeStyle]}>
        <StatusBar barStyle='dark-content'/>
        <View style={styles.middle}>
          <View style={sceneStyles.options}>
            {options.map(option => {
              const active = this.state.option
                && option.value === this.state.option.value;

              const buttonStyle = [sceneStyles.option, option.style,
                active ? sceneStyles.optionActive : null];
              const buttonFocusStyle = active
                ? [option.focusStyle, sceneStyles.optionFocusActive] : option.focusStyle;
              const buttonLabelStyle = active
                ? [option.labelStyle, sceneStyles.optionLabelActive] : option.labelStyle;

              return (
                <Button
                  key={option.value}
                  style={[sceneStyles.option].concat(buttonStyle)}
                  focusStyle={buttonFocusStyle}
                  labelStyle={buttonLabelStyle}
                  onPress={() => this.onPick(option)}>
                  <Text style={sceneStyles.optionLabel}>{option.label.toUpperCase()}</Text>
                </Button>
              );
            })}
          </View>
        </View>
      </View>
    );
  }

  onPick(option) {
    this.setState({option});
    this.props.onPick(option.value);
  }
}

const sceneStyles = {
  option: {
    marginVertical: 10
  },

  optionActive: {
    backgroundColor: '#ffffff',
    borderColor: '#c5c4c4'
  },

  optionLabel: {
    height: 40,
    width: 160,
    lineHeight: 40,
    textAlign: 'center',
    fontSize: 11,
    color: '#111111'
  }
};

export default Brick;
