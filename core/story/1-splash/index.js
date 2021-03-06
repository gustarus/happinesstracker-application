'use strict';

import React, {Component} from 'react';
import {View, Modal, PushNotificationIOS, AppState, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationActions, DrawerNavigator, StackNavigator} from 'react-navigation';
import {app} from '@core/instances';
import {styles} from '@core/theme';
import moment from 'moment';
import fixtures from '@core/fixtures';

class Scene extends Component {

  state = {
    loaded: false,
    learned: false
  };

  componentDidMount() {
    this.onAppStateChangeBind = this.onAppStateChange.bind(this);
    AppState.addEventListener('change', this.onAppStateChangeBind);

    const chain = (() => {
      if (app.settings.debug.resetOnLaunch) {
        const records = app.settings.debug.resetWithFixtures
          ? fixtures.records : {};
        return app.storage.reset(records);
      }

      return app.storage.fetch();
    })();

    chain.then(() => {
      this.setState({loaded: true});
    }).then(() => {
      return new Promise(resolve => {
        const onReceive = this.onNotificationReceive.bind(this);
        app.notification.receive().then(onReceive)
          .then(resolve).catch(resolve);
        app.notification.listen(onReceive);
      });
    }).then(() => {
      app.notification.clean();
      app.notification.badge(0);
    }).then(() => SplashScreen.hide());
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.onAppStateChangeBind);
  }

  render() {
    const {loaded, learned} = this.state;
    if (!loaded) {
      return null;
    }

    const Drawer = DrawerNavigator(
      app.settings.drawer.scenes,
      Object.assign({}, app.settings.drawer.config, {
        contentOptions: {
          inactiveTintColor: styles.menuItem.color,
          inactiveBackgroundColor: styles.menuItem.backgroundColor,
          activeTintColor: styles.menuItemActive.color,
          activeBackgroundColor: styles.menuItemActive.backgroundColor,
          labelStyle: styles.menuItemLabel
        }
      })
    );

    let tutorial;
    if (!app.storage.get('learned.general')) {
      const LearnStack = StackNavigator(
        app.settings.meet.scenes,
        app.settings.meet.config
      );

      tutorial = (
        <Modal visible={!learned} animationType='slide'>
          <LearnStack screenProps={{
            onCancel: this.onTutorialCancel.bind(this), 
            onSuccess: this.onTutorialSuccess.bind(this)
          }}/>
        </Modal>
      );
    }

    return (
      <View style={styles.screen}>
        <Drawer ref={ref => this.drawer = ref}/>
        {tutorial}
      </View>
    );
  }

  onNotificationReceive({action}) {
    const isAppInactive = AppState.currentState !== 'active';
    const isRecordRequested = action === 'record';
    if (isAppInactive && isRecordRequested) {
      const navigation = this.drawer._navigation;
      const {routes, index} = navigation.state;

      const root = routes[index];
      const action = root.routes[root.index];

      const {routeName, params} = action;
      const isAlreadyActive = routeName === 'home' && params && params.isRecordModalVisible === true;
      if (!isAlreadyActive) {
        this.drawer._navigation.navigate('home', {
          isRecordModalVisible: true
        });
      }
    }
  }

  onAppStateChange(state) {
    if (state === 'active') {
      app.notification.clean();
      app.notification.badge(0);
    }
  }

  onTutorialCancel() {
    app.tutorialSkipped();
    this.onTutorialComplete();
  }

  onTutorialSuccess() {
    app.storage.set('learned.general', true).save();
    this.onTutorialComplete();

    setTimeout(() => {
      const message = app.t('One more tip: open the menu using the burger button');
      app.notification
        .info(message)
        .then(() => this.drawer._navigation.navigate('DrawerOpen'));
    }, 2000);
  }

  onTutorialComplete() {
    this.setState({learned: true});
  }
}

export default Scene;
