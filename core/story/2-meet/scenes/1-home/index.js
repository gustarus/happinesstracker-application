'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';
import {styles} from '@core/theme';
import {TrendsBrick, NavigationButton} from '@core/views';
import fixtures from '@core/fixtures';
import {app} from '@core/instances';

class Scene extends Component {

  static navigationOptions = ({navigation}) => ({
    title: app.t('Your weekly story'),
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
    const message = app.t('Let\'s meet with the home screen. It is  filled with demo data. Try to use filters, then click "Record current happiness"');
    app.notification.info(message);
  }

  render() {
    return (
      <View style={styles.scene}>
        <TrendsBrick
          records={fixtures.records}
          onRecordPress={this.onContinue.bind(this)}/>
      </View>
    );
  }

  onContinue() {
    this.props.navigation.navigate('record-happiness');
  }
}

export default Scene;
