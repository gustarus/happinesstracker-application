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
        label: app.t('Yes'),
        style: styles.buttonGreen,
        focusStyle: styles.buttonGreenFocus,
        labelStyle: styles.buttonGreenLabel
      },
      {
        value: 1,
        label: app.t('Rather yes than no'),
        style: styles.buttonBrilliantGreen,
        focusStyle: styles.buttonBrilliantGreenFocus,
        labelStyle: styles.buttonBrilliantGreenLabel
      },
      {
        value: 0,
        label: app.t('Well...'),
        style: styles.buttonYellow,
        focusStyle: styles.buttonYellowFocus,
        labelStyle: styles.buttonYellowLabel
      },
      {
        value: -1,
        label: app.t('Rather no than yes'),
        style: styles.buttonOrange,
        focusStyle: styles.buttonOrangeFocus,
        labelStyle: styles.buttonOrangeLabel
      },
      {
        value: -2,
        label: app.t('No'),
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

              const buttonStyle = [
                sceneStyles.option,
                option.style,
                active ? styles.buttonActive : null
              ];
              
              const buttonFocusStyle = [
                option.focusStyle,
                sceneStyles.optionFocus,
                active ? styles.buttonActiveFocus : null
              ];
              
              const buttonLabelStyle = [
                option.labelStyle,
                sceneStyles.optionLabel,
                active ? styles.buttonActiveLabel : null
              ];

              return (
                <Button
                  key={option.value}
                  text={option.label.toUpperCase()}
                  style={buttonStyle}
                  focusStyle={buttonFocusStyle}
                  labelStyle={buttonLabelStyle}
                  onPress={() => this.onPick(option)}/>
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

  optionLabel: {
    width: 160
  }
};

export default Brick;
