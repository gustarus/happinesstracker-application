'use strict';

import React, {Component} from 'react';
import {FlatList, View, StatusBar, Text, TouchableHighlight, Switch} from 'react-native';
import {app} from '@core/instances';
import {styles} from '@core/theme';
import {NavigationButton} from '@core/views';
import IonicIcons from 'react-native-vector-icons/Ionicons';

class Tumbler extends Component {

  state = {
    enabled: this.props.enabled
  };

  componentWillReceiveProps(nextProps) {
    const {enabled} = nextProps;
    if (enabled !== this.state.enabled) {
      this.setState({enabled});
    }
  }

  render() {
    const {label, index, disabled} = this.props;
    const {enabled} = this.state;
    const runtimeStyle = index % 2 === 0
      ? componentStyles.even : componentStyles.odd;

    return (
      <View style={[styles.contentHorizontal, componentStyles.container, runtimeStyle, this.props.style]}>
        <View style={componentStyles.content}>
          <View style={componentStyles.label}>
            <Text style={componentStyles.labelText}>{label}</Text>
          </View>
          <View style={componentStyles.switch}>
            <Switch
              value={enabled}
              disabled={disabled}
              tintColor={styles.buttonGray.borderColor}
              onTintColor={styles.buttonGreen.borderColor}
              onValueChange={this.onChange.bind(this)}/>
          </View>
        </View>
      </View>
    );
  }

  onChange() {
    const enabled = !this.state.enabled;
    this.setState({enabled});
    this.props.onChange(enabled);
  }
}

const componentStyles = {
  container: {
    height: 54,
    borderTopWidth: 1,
    borderColor: '#ffffff',
    overflow: 'hidden'
  },

  odd: {
    backgroundColor: '#e0f6ff'
  },

  even: {
    backgroundColor: '#ebf9ff'
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  labelText: {
    fontSize: 16,
    fontFamily: 'Avenir-Light',
    color: '#333333'
  },

  switch: {
    alignItems: 'flex-end'
  }
};

export default Tumbler;
