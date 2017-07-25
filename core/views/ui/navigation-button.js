'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';
import TouchableItem from 'react-navigation/src/views/TouchableItem';
import IonicIcons from 'react-native-vector-icons/Ionicons';

class NavigationButton extends Component {

  render() {
    return (
      <TouchableItem
        accessibilityComponentType='button'
        accessibilityTraits='button'
        testID='header-back'
        onPress={this.props.onPress}
        delayPressIn={0}
        borderless>
        <View style={componentStyles.container}>
          <IonicIcons
            name={this.props.name}
            size={22}
            style={{color: this.props.style.color}}/>
        </View>
      </TouchableItem>
    );
  }
}

const componentStyles = {
  container: {
    top: 0,
    width: 50,
    height: '100%',
    flex: 1,
    marginTop: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
};

export default NavigationButton;
