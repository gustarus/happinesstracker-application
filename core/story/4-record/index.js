'use strict';

import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableHighlight} from 'react-native';
import {app} from '@core/instances';
import {styles} from '@core/theme';
import {RecordParamBrick, NavigationButton} from '@core/views';

class Scene extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'Are you happy?',
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerLeft: (
      <NavigationButton
        name='ios-close'
        style={styles.headerButton}
        onPress={() => screenProps.onComplete()}/>
    )
  });

  render() {
    return (
      <RecordParamBrick
        onPick={this.onHappinessRecorded.bind(this)}/>
    );
  }

  onHappinessRecorded(value) {
    this.props.navigation.navigate('alive', {happy: value});
  }
}

export default Scene;
