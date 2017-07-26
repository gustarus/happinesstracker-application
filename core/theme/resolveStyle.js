'use strict';

export default function() {
  const collection = Array.prototype.slice.call(arguments);
  return collection.reduce((stack, item) => {
  	const value = item instanceof Array
  	  ? Object.assign.apply(Object, [{}].concat(item)) : item;
  	
  	stack = Object.assign(stack, value);
  	return stack;
  }, {});
}
