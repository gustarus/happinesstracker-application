'use strict';

import React, {Component} from 'react';
import {View, StatusBar, Text, Modal, PushNotificationIOS} from 'react-native';
import Dimensions from 'Dimensions';
import {app} from '@core/instances';
import {styles} from '@core/theme';
import {NavigationButton} from '@core/views';
import SplashScreen from 'react-native-splash-screen';
import fixtures from '@core/fixtures';
import {getChartDataFromRecords} from '@core/helpers';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import {Button, ButtonGroup} from 'react-native-elements';
import moment from 'moment';
import {TrendsBrick, Header} from '@core/views';
import {StackNavigator} from 'react-navigation';
import get from 'lodash/get';

class Scene extends Component {

  static navigationOptions = ({navigation}) => ({
    title: app.t('Happiness trends'),
    drawerIcon: ({tintColor, focused}) => (
      <IonicIcons
        name={focused ? 'ios-home' : 'ios-home-outline'}
        size={styles.menuItemLabelIcon.fontSize}
        style={[styles.menuItemLabelIcon, {color: tintColor}]}/>
    ),

    headerStyle: styles.headerBlank,
    headerTitleStyle: styles.headerBlankTitle,
    headerLeft: (
      <NavigationButton
        name='ios-menu'
        style={styles.headerBlankButton}
        onPress={() => navigation.navigate('DrawerOpen')}/>
    )
  });

  render() {
    const sceneOptions = Scene.navigationOptions(this.props);
    const records = app.storage.get('records');
    const isRecordModalVisible = get(this.props.navigation,
      'state.params.isRecordModalVisible', false);

    const RecordStack = StackNavigator(
      app.settings.record.scenes,
      app.settings.record.config
    );

    return (
      <View style={styles.scene}>
        <StatusBar barStyle='dark-content'/>
        <Header
          title={sceneOptions.title}
          left={sceneOptions.headerLeft}
          style={sceneOptions.headerStyle}
          titleStyle={sceneOptions.headerTitleStyle}/>
        <TrendsBrick
          records={records}
          onRecordPress={this.onRecordPress.bind(this)}/>
        <Modal
          visible={isRecordModalVisible}
          animationType='slide'>
          <RecordStack
            screenProps={{onComplete: this.onRecordComplete.bind(this)}}/>
        </Modal>
      </View>
    );
  }

  onRecordPress() {
    const params = {isRecordModalVisible: true};
    this.props.navigation.setParams(params);
  }

  onRecordComplete() {
    const params = {isRecordModalVisible: false};
    this.props.navigation.setParams(params);
  }
}

export default Scene;
