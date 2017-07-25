'use strict';

import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableHighlight} from 'react-native';
import {app} from '@core/instances';
import {styles} from '@core/theme';
import {RecordParamBrick, NavigationButton} from '@core/views';

class Scene extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Are you happy?',
    headerStyle: styles.headerBlank,
    headerTitleStyle: styles.headerBlankTitle,
    headerLeft: (
      <NavigationButton
        name='ios-arrow-back'
        style={styles.headerBlankButton}
        onPress={() => navigation.goBack(null)}/>
    )
  });

  componentDidMount() {
    app.notification.info('Let\'s make your first record. Answer the next two questions');
  }

  render() {
    return (
      <RecordParamBrick
        onPick={this.onContinue.bind(this)}/>
    );
  }

  onContinue(value) {
    this.props.navigation.navigate('record-alive', {happy: value});
  }
}

export default Scene;
