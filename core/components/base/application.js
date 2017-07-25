'use strict';

const _ = require('lodash');

/**
 * Core application model.
 * @class application
 * @property settings {Object} Application configuration.
 */
export default class Application {

  constructor() {
    this.configurators = {
      debug: this.configureDebug.bind(this),
      components: this.configureComponents.bind(this)
    };
  }

  /**
   * Merge custom settings with already set in application.
   * @param settings {Object}
   * @returns {Application}
   */
  configure(settings) {
    this.settings = this.settings || {};
    _.each(settings, (value, key) => {
      if (this.configurators[key]) {
        this.configurators[key](key, value);
      } else {
        this.settings[key] = value;
      }
    });

    return this;
  }

  /**
   * Configure debug mode.
   * We have to disable all debug modes if debug mode is disabled.
   * @param value
   */
  configureDebug(key, value) {
    // set default data structure to the settings
    this.settings[key] = this.settings[key] || {};

    // merge with the default value
    const enabled = typeof value.enabled === 'boolean'
      ? value.enabled : (this.settings[key]['enabled'] || false);
    this.settings[key]['enabled'] = enabled;

    // override values based on global debug flag
    const values = _.omit(value, ['enabled']);
    _.each(values, (childValue, childKey) => {
      this.settings[key][childKey] = enabled
        ? childValue : false;
    });
  }

  /**
   * Configure application components.
   * @param key
   * @param value
   */
  configureComponents(key, value) {
    // set default data structure to the app and to the settings
    this.settings[key] = this.settings[key] || {};
    this[key] = this[key] || {};

    _.each(value, (childValue, childKey) => {
      // get item configuration
      let childSource = this.settings[key][childKey] || {};
      this.settings[key][childKey] = _.merge(childSource, childValue);
    });
  }

  /**
   * Boot application.
   * @returns {Application}
   */
  boot() {
    this.settings.methods && this.bootMethods(this.settings.methods);
    this.settings.components && this.bootComponents(this.settings.components);
    this.settings.modules && this.bootModules(this.settings.modules);
    return this;
  }

  /**
   * Boot all methods from settings to the app.
   */
  bootMethods(methods) {
    _.each(methods, (callback, name) => {
      this.registerMethod(name, callback);
    });
  }

  /**
   * Boot all configured components from {@link Application#settings.components} with flag enabled.
   */
  bootComponents(components) {
    _.each(components, (options, name) => {
      if (options.enabled) {
        this.registerComponent(name, options);
      }
    });
  }

  /**
   * Boot all configured modules from {@link Application#settings.modules} with flag enabled.
   */
  bootModules(modules) {
    _.each(modules, (options, name) => {
      if (options.enabled) {
        this.registerModule(name, options);
      }
    });
  }

  /**
   * Register method in the application.
   * @param name {String}
   * @param callback {Function}
   */
  registerMethod(name, callback) {
    if (!this[name]) {
      this[name] = callback.bind(this);
    } else {
      this.trace(`Can\'t override application method with method ${name}.`, 'error');
    }
  }

  /**
   * Register component in the application.
   * @param name {String}
   * @param options {Object}
   */
  registerComponent(name, options) {
    let alias = options.alias;
    let Component = options.constructor;
    delete options.alias;
    delete options.enabled;
    delete options.constructor;
    this.components[name] = new Component();
    this.components[name].configure(options);

    if (alias) {
      if (!this[name]) {
        this[name] = this.components[name];
      } else {
        this.trace(`Can\'t override application property with component ${name}.`, 'error');
      }
    }
  }

  /**
   * Register module in the application.
   * @param name {String}
   * @param options {Object}
   */
  registerModule(name, options) {
    let Module = options.constructor;
    delete options.enabled;
    delete options.constructor;
    this.modules[name] = new Module(options);
  }

  /**
   * Trance message via console.
   * @param message
   * @param type
   */
  trace(message, type = 'log') {
    console[type](`[app] ${message}`);
  }
}
