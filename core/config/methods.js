'use strict';

import moment from 'moment';
import notifications from './notifications';

export default {
	t() {
	  return this.locale.t.apply(this.locale, arguments);
	},

	tutorialSkipped() {
	  const keys = Object.keys(this.storage.get('learned'));
	  const learned = keys.reduce((stack, key) => {
	    stack[key] = true;
	    return stack;
	  }, {});

	  this.storage.set({learned}).save();
	},

	getAvailableReminders() {
	  let items = [];
	  for (let i = 0; i < 24; i++) {
	    const key = i;
	    const hours = i;
	    const minutes = 0;
	    const label = `${i}:${minutes < 10 ? '0' + minutes : minutes}`;
	    items.push({key, hours, minutes, label});
	  }

	  return items;
	},

	getChartCriterias() {
	  return [
	    {key: 'happy', label: 'Happy?', title: period => `Are you happy in this ${period}?`},
	    {key: 'alive', label: 'Alive?', title: period => `Are you alive in this ${period}?`}
	  ];
	},

	getChartPeriods() {
	  return [
	    {key: 'week', step: 1, label: 'Week', from: moment().subtract(1, 'weeks').add(1, 'd'), till: moment()},
	    {key: 'month', step: 1, label: 'Month', from: moment().subtract(1, 'months').add(1, 'd'), till: moment()},
	    {key: 'quarter', step: 7, label: 'Quarter', from: moment().subtract(1, 'quarters').add(1, 'd'), till: moment()},
	    {key: 'year', step: 21, label: 'Year', from: moment().subtract(1, 'years').add(1, 'd'), till: moment()}
	  ];
	},

	getReminderData({hours, minutes}) {
	  return {action: 'record', hours, minutes};
	},

	scheduleReminder(reminder) {
	  let timestamp = moment().clone();
	  timestamp.hours(reminder.hours);
	  timestamp.minutes(reminder.minutes);
	  timestamp.seconds(0);

	  let threshold = timestamp.clone();

	  if (this.storage.get('reminders.intelligence')) {
	    timestamp.add(30, 'minutes');
	    threshold.subtract(30, 'minutes');
	  }

	  const now = moment();
	  if (now.isSameOrAfter(threshold)) {
	    timestamp.add(1, 'days');
	  }

	  const message = notifications[Math.floor((Math.random() * notifications.length))];
	  const data = this.getReminderData(reminder);

	  this.notification.local(timestamp, message, data, 1, 'day');
	},

	scheduleReminders(reminders) {
	  for (let i in reminders) {
	    this.scheduleReminder(reminders[i]);
	  }
	},

	cancelReminder(reminder) {
	  const info = this.getReminderData(reminder);
	  this.notification.cancel(info);
	},

	cancelReminders() {
	  this.notification.cancel();
	},

	rescheduleReminder(reminder) {
	  this.cancelReminder(reminder);
	  this.scheduleReminder(reminder);
	},

	rescheduleReminders(reminders) {
	  this.cancelReminders();
	  this.scheduleReminders(reminders);
	},

	insertRecord(happy, alive, causes) {
	  const now = moment();
	  const key = now.unix();
	  const timestamp = now.format();

	  const record = {key, timestamp, happy, alive, causes};
	  return this.storage.set(`records.${key}`, record).save().then(() => {
	    this.rescheduleReminders(this.storage.get('reminders.collection'));
	  });
	}
};