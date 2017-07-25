'use strict';

import moment from 'moment';

function timestamp(offset = 0) {
  return moment().subtract(offset, 'days').format();
}

export default {
  learned: false,

  records: {
    1: {
      key: 1,
      timestamp: timestamp(),
      happy: 2,
      alive: 2,
      causes: null
    },
    2: {
      key: 2,
      timestamp: timestamp(1),
      happy: 1,
      alive: 1,
      causes: null
    },
    3: {
      key: 3,
      timestamp: timestamp(2),
      happy: -1,
      alive: 0,
      causes: null
    },
    4: {
      key: 4,
      timestamp: timestamp(3),
      happy: 0,
      alive: -1,
      causes: null
    },
    5: {
      key: 5,
      timestamp: timestamp(4),
      happy: 0,
      alive: -1,
      causes: null
    },
    6: {
      key: 6,
      timestamp: timestamp(5),
      happy: -2,
      alive: -2,
      causes: null
    },
    7: {
      key: 7,
      timestamp: timestamp(6),
      happy: -2,
      alive: -2,
      causes: null
    },
    8: {
      key: 8,
      timestamp: timestamp(9),
      happy: 0,
      alive: -1,
      causes: null
    },
    9: {
      key: 9,
      timestamp: timestamp(12),
      happy: 1,
      alive: -1,
      causes: null
    },
    10: {
      key: 10,
      timestamp: timestamp(15),
      happy: 0,
      alive: 0,
      causes: null
    },
    11: {
      key: 11,
      timestamp: timestamp(18),
      happy: -2,
      alive: -1,
      causes: null
    },
    12: {
      key: 12,
      timestamp: timestamp(21),
      happy: 2,
      alive: 1,
      causes: null
    },
    13: {
      key: 13,
      timestamp: timestamp(24),
      happy: 1,
      alive: 1,
      causes: null
    },
    14: {
      key: 14,
      timestamp: timestamp(27),
      happy: 1,
      alive: 0,
      causes: null
    },
    15: {
      key: 15,
      timestamp: timestamp(30),
      happy: 0,
      alive: -1,
      causes: null
    },
    16: {
      key: 16,
      timestamp: timestamp(60),
      happy: 2,
      alive: 0,
      causes: null
    },
    17: {
      key: 17,
      timestamp: timestamp(90),
      happy: 1,
      alive: 0,
      causes: null
    },
    18: {
      key: 18,
      timestamp: timestamp(120),
      happy: -1,
      alive: 2,
      causes: null
    },
    19: {
      key: 19,
      timestamp: timestamp(150),
      happy: 0,
      alive: 0,
      causes: null
    },
    20: {
      key: 20,
      timestamp: timestamp(180),
      happy: 0,
      alive: -1,
      causes: null
    },
    21: {
      key: 21,
      timestamp: timestamp(210),
      happy: -1,
      alive: -2,
      causes: null
    },
    22: {
      key: 22,
      timestamp: timestamp(260),
      happy: 0,
      alive: 0,
      causes: null
    },
    23: {
      key: 23,
      timestamp: timestamp(290),
      happy: -1,
      alive: -1,
      causes: null
    },
    24: {
      key: 24,
      timestamp: timestamp(320),
      happy: 1,
      alive: 0,
      causes: null
    },
    25: {
      key: 25,
      timestamp: timestamp(350),
      happy: -2,
      alive: -2,
      causes: null
    }
  }
};
