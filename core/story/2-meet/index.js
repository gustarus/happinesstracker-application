'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';
import {NavigationActions} from 'react-navigation'
import Dimensions from 'Dimensions';
import {app} from '@core/instances';
import {styles} from '@core/theme';
import {Button} from '@core/views';

class Scene extends Component {

  static navigationOptions = () => ({
    title: app.t('Happiness tracker'),
    headerStyle: styles.headerBlank,
    headerTitleStyle: styles.headerBlankTitle
  });

  render() {
    return (
      <View style={Object.assign({}, styles.scene, styles.middleVertical)}>
        <View style={styles.contentHorizontal}>
          <Button
            text={app.t('Let\'s meet with the app')}
            style={[styles.buttonDefault, sceneStyles.button]}
            focusStyle={styles.buttonDefaultFocus}
            labelStyle={styles.buttonDefaultLabel}
            onPress={this.onTutorialPress.bind(this)}/>
          <Button
            text={app.t('Start using the app')}
            style={[styles.buttonGray, sceneStyles.button]}
            focusStyle={styles.buttonGrayFocus}
            labelStyle={styles.buttonGrayLabel}
            onPress={this.onSkipPress.bind(this)}/>
        </View>
      </View>
    );
  }

  onTutorialPress() {
    this.props.navigation.navigate('home');
  }

  onSkipPress() {
    this.props.screenProps.onCancel();
  }
}

const sceneStyles = {
  button: {
    marginTop: 10
  }
};

export default Scene;
