'use strict';

import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableHighlight} from 'react-native';
import {app} from '@core/instances';
import {styles} from '@core/theme';
import {RecordParamBrick, NavigationButton} from '@core/views';

class Scene extends Component {

  static navigationOptions = ({navigation}) => ({
    title: app.t('Do you feel alive?'),
    headerStyle: styles.headerBlank,
    headerTitleStyle: styles.headerBlankTitle,
    headerLeft: (
      <NavigationButton
        name='ios-arrow-back'
        style={styles.headerBlankButton}
        onPress={() => navigation.goBack(null)}/>
    )
  });

  render() {
    return (
      <RecordParamBrick
        onPick={this.onContinue.bind(this)}/>
    );
  }

  onContinue(value) {
    const {navigate, state} = this.props.navigation;
    const {happy} = state.params;
    navigate('complete', {happy, alive: value});
  }
}

export default Scene;
