'use strict';

import React, {Component} from 'react';
import {View, StatusBar, Text, Modal} from 'react-native';
import Dimensions from 'Dimensions';
import {app} from '@core/instances';
import {styles} from '@core/theme';
import {NavigationButton, Button, ButtonGroup} from '@core/views';
import SplashScreen from 'react-native-splash-screen';
import fixtures from '@core/fixtures';
import Chart from './chart';
import {getChartDataFromRecords} from '@core/helpers';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Header from 'react-navigation/lib/views/Header';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Brick extends Component {

  state = {
    criteriaKey: 'happy',
    periodKey: 'month'
  };

  render() {
    const {periodKey, criteriaKey} = this.state;
    const {records} = this.props;

    // TODO use cache for getter or move it to the default props definition
    const periods = app.getChartPeriods();
    const periodIndex = periods.findIndex(item => item.key === periodKey);
    const period = periods[periodIndex];

    // TODO use cache for getter or move it to the default props definition
    const criterias = app.getChartCriterias();
    const criteriaIndex = criterias.findIndex(item => item.key === criteriaKey);
    const criteria = criterias[criteriaIndex];

    // TODO optimize this method and use cache for already generated reports
    const data = getChartDataFromRecords(records, criteria.key, period.from, period.till, period.step);

    const title = criteria.title(period.label.toLowerCase());

    return (
      <View style={[styles.bottom, brickStyles.bottom]}>
        <Chart
          title={title}
          groups={data}
          width={width}
          height={250}
          style={brickStyles.chart}/>
        <View style={[styles.content, brickStyles.buttons]}>
          <ButtonGroup
            buttons={criterias.map(item => item.label.toUpperCase())}
            selectedIndex={criteriaIndex}
            onPress={i => this.onCriteriaPick(criterias[i])}
            style={brickStyles.buttonGroup}
            buttonStyle={styles.buttonGray}
            buttonFocusStyle={styles.buttonGrayFocus}
            buttonLabelStyle={styles.buttonGrayLabel}/>
          <ButtonGroup
            buttons={periods.map(item => item.label.toUpperCase())}
            selectedIndex={periodIndex}
            onPress={i => this.onPeriodPick(periods[i])}
            style={brickStyles.buttonGroup}
            buttonStyle={styles.buttonGray}
            buttonFocusStyle={styles.buttonGrayFocus}
            buttonLabelStyle={styles.buttonGrayLabel}/>
          <Button
            text='Record current happiness'
            style={Object.assign({}, styles.buttonDefault, brickStyles.recordButton)}
            focusStyle={styles.buttonDefaultFocus}
            labelStyle={styles.buttonDefaultLabel}
            onPress={this.onRecordPress.bind(this)}/>
        </View>
      </View>
    );
  }

  onCriteriaPick({key}) {
    this.setState({criteriaKey: key});
  }

  onPeriodPick({key}) {
    this.setState({periodKey: key});
  }

  onRecordPress() {
    this.props.onRecordPress();
  }
}

const brickStyles = {
  bottom: {
    paddingBottom: 15
  },

  buttons: {
    marginTop: 45
  },

  recordButton: {
    marginTop: 10
  },

  buttonGroup: {
    marginTop: 10
  }
};

export default Brick;
