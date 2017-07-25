'use strict';

export default function(timestamp = null) {
  let now = timestamp ? (timestamp instanceof Date ? timestamp : new Date(timestamp)) : new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}
