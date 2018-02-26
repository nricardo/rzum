'use strict';

// const dotenv = require('dotenv')
const debug = require('debug');

const pkg = require('./package.json');

class Logger {
  constructor (name) {
    this.level = Logger.LEVELS.INFO;
    this.name = pkg.name;
    if (typeof name === 'string') ''.concat(this.name, ':', name);
    this.log = debug(this.name);
  }

  info(msg) {
    if (this.level >= Logger.LEVELS.INFO) this.log(`[INFO] ${msg}`);
  }

  error(msg) {
    if (this.level >= Logger.LEVELS.ERROR) this.log(`[ERROR] ${msg}`);
  }
}

Logger.LEVELS = {
  ERROR: 0,
  INFO: 1,
}

module.exports = Logger;
