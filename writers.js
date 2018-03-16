'use strict';

const fs = require('fs');
const Logger = require('./logger');

const { Readable } = require('stream');

class RzumStream extends Readable {
  constructor(data, options) {
    super(options);

    this.data = data;
  }

  _read(size) {
    const chunk = this.data.slice(0, size);
    this.data = this.data.slice(size);
    this.push(chunk);
  }
}

class Writers {

  constructor(filename) {
    this.log = new Logger(Writers.name);
    this.sink = filename ? fs.createWriteStream(filename) : process.stdout;
  }

  write(source) {
    source.pipe(this.sink);
  }
}

module.exports = {
  Writers,
  RzumStream,
};
