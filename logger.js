'use strict';

require('dotenv').config();
const fs = require('fs');
const debug = require('debug');
const pkg = require('./package.json');

class Logger {
  constructor(name) {
    this.name = pkg.name;
    this.level = process.env.LOG_LEVEL || Logger.LEVELS.ERROR;
    if (typeof name === 'string') this.name = this.name.concat(':', name);
    this._debug = debug(this.name);
    this.logfile = `${pkg.name}.log`;
  }

  log(msg, level, label) {
    const stamp = new Date().toISOString();

    if (this.level >= level) fs.writeFile(this.logfile, `${stamp} [${label}][${this.name}]: ${msg}\n`, {flag: 'a'}, () => {});
    // if (this.level >= level) this._debug(`[${label}]: ${msg}`);
  }

  error(msg) {
    this.log(msg, Logger.LEVELS.ERROR, 'ERROR');
  }

  info(msg) {
    this.log(msg, Logger.LEVELS.INFO, 'INFO');
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
  DEBUG: 2,
  SILLY: 3,
}

module.exports = Logger;
