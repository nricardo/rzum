'use strict';

// const dotenv = require('dotenv')
const debug = require('debug');

const pkg = require('./package.json');

class Logger {
  constructor (name) {
    this.level = Logger.LEVELS.INFO;
    this.name = pkg.name;
    if (typeof name === 'string') this.name = this.name.concat(':', name);
    this._debug = debug(this.name);
    console.log(debug)
  }

  log(msg, level, label) {
    if (this.level >= level) this._debug(`[${label}]: ${msg}`);
  }

    error(msg) {
      this.log(msg, Logger.LEVELS.ERROR, 'ERROR');
    }

  info(msg) {
    this.log(msg, Logger.LEVELS.INFO, 'INFO');
  }

  verbose(msg) {
    this.log(msg, Logger.LEVELS.VERBOSE, 'VERBOSE');
  }

  debug(msg) {
    this.log(msg, Logger.LEVELS.DEBUG, 'DEBUG');
  }

  silly(msg) {
    this.log(msg, Logger.LEVELS.SILLY, 'SILLY');
  }
}

Logger.LEVELS = {
  ERROR: 0,
  INFO: 1,
  VERBOSE: 2,
  DEBUG: 3,
  SILLY: 4,
}

module.exports = Logger;
