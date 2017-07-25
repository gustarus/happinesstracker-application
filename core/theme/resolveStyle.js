'use strict';

export default function(styles) {
  const collection = [{}].concat(styles instanceof Array
    ? styles : Array.prototype.slice.call(arguments));

  return Object.assign.apply(Object, collection);
}
