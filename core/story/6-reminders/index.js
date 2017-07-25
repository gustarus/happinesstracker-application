'use strict';

import React, {Component} from 'react';
import {FlatList, View, StatusBar, Text, TouchableHighlight, Switch, ScrollView, Animated, PushNotificationIOS, AppState} from 'react-native';
import {app} from '@core/instances';
import {styles} from '@core/theme';
import {NavigationButton} from '@core/views';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import {Header, Tumbler} from '@core/views';
import moment from 'moment';

class Scene extends Component {

  state = {
    enabled: app.storage.get('reminders.enabled'),
    intelligence: app.storage.get('reminders.intelligence')
  };

  static navigationOptions = ({navigation}) => ({
    title: 'Setup reminders',
    drawerIcon: ({tintColor, focused}) => (
      <IonicIcons
        name={focused ? 'ios-alarm' : 'ios-alarm-outline'}
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

  componentDidMount() {
    this.onPermissionsCheckRequested();
    this.onAppStateChangeBind = this.onAppStateChange.bind(this);
    AppState.addEventListener('change', this.onAppStateChangeBind);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.onAppStateChangeBind);
    delete this.onAppStateChangeBind;
  }

  render() {
    const sceneOptions = Scene.navigationOptions(this.props);
    const reminders = app.getAvailableReminders();
    const {enabled, intelligence} = this.state;
    const runtimeStyle = !enabled && sceneStyles.disabled;

    return (
      <View style={styles.scene}>
        <StatusBar barStyle='dark-content'/>
        <Header
          title={sceneOptions.title}
          left={sceneOptions.headerLeft}
          style={sceneOptions.headerStyle}
          titleStyle={sceneOptions.headerTitleStyle}/>
        <ScrollView style={sceneStyles.scroll}>
          <View style={sceneStyles.firstBrick}>
            <Text style={[styles.content, styles.textMedium]}>
              You can setup reminders.
              At the specified time, the application will remind you that you need to make a record.
            </Text>
            <Tumbler
              label='Enable reminders'
              style={sceneStyles.mainTumbler}
              enabled={enabled}
              onChange={this.onEnabledChange.bind(this)}/>
          </View>
          <View style={[sceneStyles.brick, runtimeStyle]}>
            <Text style={[styles.content, styles.textMedium]}>
              We can notify you within one hour.
              Example: you turned on the notification at 12:00.
              If you made a record at 11:31 or at 12:29, the notification scheduled at 12:00 will not come to you.
              Otherwise you'll receive the notification at 12:30.
            </Text>
            <Tumbler
              label='Intelligence reminders'
              style={sceneStyles.mainTumbler}
              enabled={intelligence}
              onChange={this.onIntelligenceChange.bind(this)}/>
          </View>
          <View style={[sceneStyles.brick, runtimeStyle]}>
            <Text style={[styles.content, styles.textMedium]}>When you want to receive push reminders?</Text>
            <View style={sceneStyles.reminders}>
              {reminders.map((reminder, index) => (
                <Tumbler
                  key={reminder.key}
                  index={index}
                  label={reminder.label}
                  disabled={!enabled}
                  enabled={enabled && app.storage.get(`reminders.collection.${reminder.key}.enabled`, false)}
                  onChange={enabled => this.onReminderEnabledChange(reminder, enabled)}/>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  onPermissionsCheckRequested() {
    const {enabled} = this.state;
    app.notification.checkPermissions()
      .then(() => !enabled && app.storage.get('reminders.enabled') && this.setState({enabled: true}))
      .catch(() => enabled && this.setState({enabled: false}));
  }

  onAppStateChange(appState) {
    if (appState === 'active') {
      this.onPermissionsCheckRequested();
    }
  }

  onBeforePermissionsUsing(enabled, callback) {
    const chain = enabled
      ? app.notification.request()
      : new Promise(resolve => resolve());

    chain.then(callback).catch(e => {
      if (e instanceof Error) {
        throw e;
      } else {
        this.forceUpdate();
      }
    });
  }

  onEnabledChange(enabled) {
    this.onBeforePermissionsUsing(enabled, () => {
      const {collection} = app.storage.get('reminders');
      const keys = Object.keys(collection);
      
      if (enabled) {
        app.scheduleReminders(collection);
      } else {
        app.cancelReminders();
      }
      
      app.storage.set('reminders.enabled', enabled);
      for (let i in collection) {
        app.storage.set(`reminders.collection.${i}.enabled`, enabled);
      }
      
      app.storage.save();
      this.setState({enabled});

      PushNotificationIOS
        .getScheduledLocalNotifications(stack => console.log('sssta', stack));
    });
  }

  onIntelligenceChange(enabled) {
    this.onBeforePermissionsUsing(true, () => {
      const {collection} = app.storage.get('reminders');
      
      app.storage.set('reminders.intelligence', enabled).save();
      app.rescheduleReminders(collection);
      
      this.setState({intelligence: enabled});

      PushNotificationIOS
        .getScheduledLocalNotifications(stack => console.log('sssta', stack));
    });
  }

  onReminderEnabledChange(reminder, enabled) {
    this.onBeforePermissionsUsing(enabled, () => {
      const storageKey = `reminders.collection.${reminder.key}`;
      if (enabled) {
        app.scheduleReminder(reminder);
        app.storage.set(storageKey, {...reminder, enabled: true}).save();
      } else {
        app.cancelReminder(reminder);
        app.storage.unset(storageKey).save();
      }

      this.forceUpdate();

      PushNotificationIOS
        .getScheduledLocalNotifications(stack => console.log('sssta', stack));
    });
  }
}

const sceneStyles = {
  disabled: {
    opacity: 0.3
  },

  scroll: {
    marginTop: 1
  },

  reminders: {
    marginTop: 10
  },

  firstBrick: {
    marginTop: 10
  },

  brick: {
    marginTop: 40
  },

  mainTumbler: {
    marginTop: 10
  }
};

export default Scene;
