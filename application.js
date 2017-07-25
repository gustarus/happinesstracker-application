'use strict';

import React, {Component} from 'react';

// hide splash screen on debug mode: with this hack
// we can see errors which happened before first scene loaded
import SplashScreen from 'react-native-splash-screen'
const debug = typeof __DEV__ !== 'undefined' && __DEV__;
debug && SplashScreen.hide();

// configure moment
import moment from 'moment';
import 'moment/locale/en-gb';
moment.locale('en-gb');

// boot the app
import {defaults} from '@core/config';
import {app} from '@core/instances';
app.configure(defaults).boot();

module.exports = app.settings.home.screen;
