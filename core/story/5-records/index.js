'use strict';

import React, {Component} from 'react';
import {FlatList, View, StatusBar, Text, TouchableHighlight} from 'react-native';
import {app} from '@core/instances';
import {styles} from '@core/theme';
import {NavigationButton, Header} from '@core/views';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import Item from './item';

class Scene extends Component {

  static navigationOptions = ({navigation}) => ({
    title: app.t('Latest records'),
    drawerIcon: ({tintColor, focused}) => (
      <IonicIcons
        name={focused ? 'ios-list-box' : 'ios-list-box-outline'}
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
    if (!app.storage.get('learned.remove')) {
      app.storage.set('learned.remove', true).save();

      const message = app.t('You can remove each record. Swipe it to the left');
      app.notification.info(message);
    }
  }

  render() {
    const sceneOptions = Scene.navigationOptions(this.props);
    const records = Object.values(app.storage.get('records')).sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    return (
      <View style={styles.scene}>
        <Header
          title={sceneOptions.title}
          left={sceneOptions.headerLeft}
          style={sceneOptions.headerStyle}
          titleStyle={sceneOptions.headerTitleStyle}/>
        {this.renderList(records)}
      </View>
    );
  }

  renderList(records) {
    if (!records.length) {
      return (
        <View style={styles.middle}>
          <View style={styles.contentHorizontal}>
            <Text style={[styles.textMedium, styles.textCenter]}>{app.t('There is no data yet')}</Text>
            <Text style={[styles.textMedium, styles.textCenter]}>{app.t('Make your first record')}</Text>
          </View>
        </View>
      );
    }

    return (
      <FlatList
        data={records}
        keyExtractor={item => item.timestamp}
        style={styles.records}
        renderItem={({item, index}) => (
          <Item
            index={index}
            data={item}
            onChanged={() => this.forceUpdate()}/>
        )}/>
    );
  }
}

export default Scene;
