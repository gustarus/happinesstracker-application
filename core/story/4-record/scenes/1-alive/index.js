'use strict';

import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableHighlight} from 'react-native';
import {app} from '@core/instances';
import {styles} from '@core/theme';
import {RecordParamBrick, NavigationButton} from '@core/views';

class Scene extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({
    title: app.t('Do you feel alive?'),
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
        onPick={this.onAliveRecorded.bind(this)}/>
    );
  }

  onAliveRecorded(value) {
    const {navigate, state} = this.props.navigation;
    const {happy} = state.params;
    navigate('complete', {happy, alive: value});
  }
}

export default Scene;
