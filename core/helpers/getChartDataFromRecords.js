'use strict';

import moment from 'moment';
import getBeginningOfTheDay from './getBeginningOfTheDay';
import getEngingOfTheDay from './getEngingOfTheDay';

// TODO make in faster and more optimized
export default function(records, criteria, from, till, step) {
  const array = Object.values(records);
  if (!array.length) {
    return [];
  }

  const filtered = array.filter(item => {
    const timestamp = new Date(item.timestamp);
    const fromDate = getBeginningOfTheDay(from.format());
    const tillDate = getEngingOfTheDay(till.format());
    return timestamp.getTime() >= fromDate.getTime()
        && timestamp.getTime() <= tillDate.getTime();
  });

  // roder items desc
  const sorted = filtered.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const grouped = sorted.reduce((stack, record) => {
    const timestamp = getBeginningOfTheDay(record.timestamp);
    stack[timestamp] = stack[timestamp] || {timestamp, records: []};
    stack[timestamp].records.push({
      value: record[criteria],
      causes: record.causes
    });

    return stack;
  }, {});

  const days = moment.duration(till.diff(from)).asDays();
  
  let calendar = {};
  const runtime = from.clone();
  for (let i = 0; i <= days; i ++) {
    const timestamp = getBeginningOfTheDay(runtime.toString());
    calendar[timestamp] = grouped[timestamp] || {timestamp, records: []};
    runtime.add(1, 'd');
  }

  const dates = Object.values(calendar);

  let slice;
  let compressed = [];
  for(;;) {
    slice = dates.splice(0, step);
    if (!slice.length) {
      break;
    }

    const timestamp = slice[0].timestamp;
    const records = slice.reduce((stack, item) => stack.concat(item.records), []);
    compressed.push({timestamp, records});
  }

  return compressed;
}
