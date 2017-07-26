'use strict';

import React, {Component} from 'react';

// hide splash screen on debug mode: with this hack
// we can see errors which happened before first scene loaded
import SplashScreen from 'react-native-splash-screen'
const debug = typeof __DEV__ !== 'undefined' && __DEV__;
debug && SplashScreen.hide();

// boot the app
import {app} from '@core/instances';
import defaults from '@core/config';
app.configure(defaults).boot();

module.exports = app.settings.home.screen;
