'use strict';

import React, {Component} from 'react';
import {FlatList, View, StatusBar, Text, TouchableHighlight} from 'react-native';
import {app} from '@core/instances';
import {colorsForValues, styles} from '@core/theme';
import {NavigationButton} from '@core/views';
import moment from 'moment';
import Swipeout from 'react-native-swipeout';
import IonicIcons from 'react-native-vector-icons/Ionicons';

const labels = ['yes', 'rather yes than no', 'well...', 'rather no than yes', 'no'];

class Item extends Component {

  render() {
    const {index, data} = this.props;
    const {happy, alive, timestamp, causes} = data;
    const than = moment(timestamp);
    
    const runtimeStyle = index % 2 === 0
      ? componentStyles.even : componentStyles.odd;

    const buttons = [
      {
        component: <IonicIcons name='ios-trash' style={componentStyles.button}/>,
        onPress: () => this.onRemovePress(),
        backgroundColor: styles.buttonRed.backgroundColor,
        underlayColor: styles.buttonRedFocus.backgroundColor
      }
    ];

    let notes;
    if (causes) {
      notes = (
        <View style={[componentStyles.causes, runtimeStyle]}>
          <Text style={componentStyles.causesLabel}>{app.t('Why it happened?')}</Text>
          <Text style={componentStyles.causesValue}>{causes}</Text>
        </View>
      );
    }

    return (
      <View style={componentStyles.record}>
        <Swipeout right={buttons} style={runtimeStyle} buttonWidth={componentStyles.button.width}>
          <View style={componentStyles.content}>
            <View style={componentStyles.timestamp}>
              <View style={componentStyles.recordTimestampContent}>
                <Text style={componentStyles.timestampValue}>{than.format(`D MMM`).toUpperCase()}</Text>
                <Text style={componentStyles.timestampValue}>{than.format('HH:mm')}</Text>
              </View>
            </View>
            <View style={componentStyles.properties}>
              <View style={componentStyles.property}>
                <Text style={componentStyles.propertyLabel}>{app.t('Happy?')}</Text>
                <View style={componentStyles.propertySlices}>{this.renderStack(happy)}</View>
              </View>
              <View style={componentStyles.property}>
                <Text style={componentStyles.propertyLabel}>{app.t('Alive?')}</Text>
                <View style={componentStyles.propertySlices}>{this.renderStack(alive)}</View>
              </View>
            </View>
          </View>
        </Swipeout>
        {notes}
      </View>
    );
  }

  renderStack(value) {
    return [-2, -1, 0, 1, 2].map(item => {
      const {backgroundColor} = colorsForValues[item];
      const runtimeStyle = [
        componentStyles.propertySlice,
        value === item ? {backgroundColor} : null
      ];

      return <View key={item} style={runtimeStyle}/>;
    });
  }

  onRemovePress() {
    const {key} = this.props.data;
    app.storage.unset(`records.${key}`).save().then(() => {
      this.props.onChanged();
    });
  }
}

const componentStyles = {
  content: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ffffff'
  },

  odd: {
    backgroundColor: '#e0f6ff'
  },

  even: {
    backgroundColor: '#ebf9ff'
  },

  timestamp: {
    alignSelf: 'center',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d2e7ef'
  },

  timestampValue: {
    fontSize: 13,
    fontFamily: 'Avenir-Light',
    lineHeight: 16,
    textAlign: 'center'
  },

  properties: {
    flexGrow: 2,
    marginLeft: 8,
    padding: 8
  },

  property: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  propertyLabel: {
    fontSize: 16,
    fontFamily: 'Avenir-Light'
  },

  propertySlices: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  propertySlice: {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    marginHorizontal: 1
  },

  causes: {
    borderTopWidth: 1,
    borderColor: '#d2e7ef',
    padding: 10
  },

  causesLabel: {
    fontSize: 16
  },

  causesValue: {
    fontSize: 14
  },

  button: {
    width: 60,
    fontSize: 34,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 60,
    textAlign: 'center'
  },

  buttonRemove: {
    backgroundColor: '#FF6666'
  },

  buttonRemoveFocus: {
    backgroundColor: '#de5a5a'
  }
};
export default Item;
