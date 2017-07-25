'use strict';

export default class Component {
  configure(config) {
    if (config) {
      for (var name in config) {
        this[name] = config[name];
      }
    }
  }
}
