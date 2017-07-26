'use strict';

import React, {Component} from 'react';
import {View, StatusBar, Text, TouchableWithoutFeedback, TextInput} from 'react-native';
import {NavigationActions} from 'react-navigation'
import {app} from '@core/instances';
import {styles} from '@core/theme';
import {RecordCausesBrick, NavigationButton} from '@core/views';
import moment from 'moment';

class Scene extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({
    title: app.t('What happened?'),
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
    const message = app.t('Now you can leave notes. What caused the state in which you are now?');
    app.notification.info(message);
  }

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
    app.insertRecord(happy, alive, causes)
      .then(() => {
        const message = app.t('Mission complete! I\'ll be very happy if you find this app useful for yourself. Have a nice day!');
        return app.notification.info(message);
      }).then(() => this.props.screenProps.onSuccess());
  }
}

export default Scene;
