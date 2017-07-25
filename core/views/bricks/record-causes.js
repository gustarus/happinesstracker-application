'use strict';

import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableWithoutFeedback, TextInput} from 'react-native';
import {app} from '@core/instances';
import {styles} from '@core/theme';
import {NavigationButton, Button} from '@core/views';
import {NavigationActions} from 'react-navigation';
import moment from 'moment';

class Brick extends Component {

  state = {
    causes: null
  };

  render() {
    return (
      <View>
        <View style={styles.contentHorizontal}>
          <View style={brickStyles.note}>
            <TextInput
              style={brickStyles.textarea}
              multiline={true}
              numberOfLines={6}
              value={this.state.causes}
              placeholder='Tell about the reasons. Why are you in this state now?'
              onChangeText={this.onCausesChange.bind(this)}/>
          </View>
          <Button
            text="Save and show the chart"
            style={[styles.buttonGreen, brickStyles.buttonDone]}
            focusStyle={styles.buttonGreenFocus}
            labelStyle={styles.buttonGreenLabel}
            onPress={this.onContinue.bind(this)}/>
        </View>
      </View>
    );
  }

  onCausesChange(causes) {
    this.setState({causes: causes || null});
  }

  onContinue() {
    const {causes} = this.state;
    this.props.onComplete(causes);
  }
}

const brickStyles = {
  note: {
    marginTop: 15,
    borderRadius: 3,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f3f6fa'
  },

  textarea: {
    height: 160,
    fontSize: 14
  },

  buttonDone: {
    marginTop: 15
  }
};

export default Brick;
