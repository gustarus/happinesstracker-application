'use strict';

import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableWithoutFeedback, TextInput} from 'react-native';
import {app} from '@core/instances';
import {styles} from '@core/theme';
import {RecordCausesBrick, NavigationButton} from '@core/views';
import {NavigationActions} from 'react-navigation';
import moment from 'moment';

class Scene extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'What happened?',
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    gesturesEnabled: false,
    headerLeft: (
      <NavigationButton
        name='ios-close'
        style={styles.headerButton}
        onPress={() => screenProps.onComplete()}/>
    )
  });

  render() {
    return (
      <View style={styles.scene}>
        <RecordCausesBrick
          onComplete={this.onCausesRecorded.bind(this)}/>
      </View>
    );
  }

  onCausesRecorded(causes) {
    const {happy, alive} = this.props.navigation.state.params;
    app.insertRecord(happy, alive, causes).then(() => {
      this.props.screenProps.onComplete();
    });
  }
}

export default Scene;
