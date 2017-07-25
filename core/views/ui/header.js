'use strict';

import React, {Component} from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
import {styles} from '@core/theme';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 40;

class Header extends Component {

  render() {
    const {title, left, right, style, titleStyle} = this.props;

    return (
      <View style={[componentStyles.container, styles.header, style]}>
        <View style={componentStyles.header}>
          <View style={componentStyles.title}>
            <View style={componentStyles.item}>
              <Text style={[styles.headerTitle, titleStyle]}>{title}</Text>
            </View>
          </View>
          <View style={componentStyles.left}>
            <View style={componentStyles.item}>{left}</View>
          </View>
          <View style={componentStyles.right}>
            <View style={componentStyles.item}>{right}</View>
          </View>
        </View>
      </View>
    );
  }
}

const componentStyles = {
  container: {
    paddingTop: STATUSBAR_HEIGHT,
    height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth
    },
    elevation: 4,
    zIndex: 9999
  },

  header: {
    height: '100%',
    position: 'relative',
  },

  title: {
    top: 0,
    height: '100%',
    paddingHorizontal: TITLE_OFFSET
  },

  left: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },

  right: {
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0
  },

  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
};

export default Header;
