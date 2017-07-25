'use strict';

import React, {Component} from 'react';

// configure moment
import moment from 'moment';
import 'moment/locale/en-gb';
moment.locale('en-gb');

// configure application instance
import {app} from '@core/instances';
import {defaults} from '@core/config';
app.configure(defaults).boot();

module.exports = app.settings.home.screen;
