'use strict';

import _ from 'lodash';
import {AsyncStorage} from 'react-native';
import fixtures from '@core/fixtures';
import {Component} from './base';
import {app} from '@core/instances';

function mergeAttributesDeep(to, from) {
  if (!from) {
    return to;
  }

  for (let name in from) {
    if (from[name] instanceof Object && !(from[name] instanceof Array)) {
      to[name] = to[name] || {};
      mergeAttributesDeep(to[name], from[name]);
    } else {
      to[name] = from[name];
    }
  }

  return to;
}

function linkDeepAttribute(attributes, name, force = false) {
  let path = name.split('.');
  let last = path.pop();

  let parent = attributes;
  for (let property of path) {
    if (!parent[property]) {
      if (force) {
        parent[property] = {};
      } else {
        return null;
      }
    }

    parent = parent[property];
  }

  return {parent, property: last};
}

export default class Storage extends Component {

  constructor(options) {
    super(options);

    if (!this.defaults) {
      this.defaults = {};
    }

    if (!this.attributes) {
      this.attributes = this.defaults;
    }

    if (!this.key) {
      this.key = '@HappinessTracker:storage';
    }
  }

  configure() {
    Component.prototype.configure.apply(this, arguments);
    this.set(this.defaults);
  }

  set(name, value) {
    if (name instanceof Object) {
      mergeAttributesDeep(this.attributes, name);
    } else {
      let link = linkDeepAttribute(this.attributes, name, true);
      link && (link.parent[link.property] = value);
    }

    return this;
  }

  unset(name) {
    let link = linkDeepAttribute(this.attributes, name, true);
    link && (delete link.parent[link.property]);
    return this;
  }

  get(name, placeholder = null) {
    const link = linkDeepAttribute(this.attributes, name);
    return link && typeof link.parent[link.property] !== 'undefined'
      ? link.parent[link.property] : placeholder;
  }

  save() {
    return AsyncStorage.setItem(this.key, JSON.stringify(this.attributes));
  }

  fetch() {
    return AsyncStorage.getItem(this.key).then(data => {
      data && this.set(JSON.parse(data));
      this.fetched = true;
    });
  }

  reset(records = {}) {
    return AsyncStorage.removeItem(this.key).then(() => {
      this.set(this.defaults);
      for (let i in records) {
        this.set(`records.${i}`, fixtures.records[i]);
      }
    });
  }
}
