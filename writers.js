'use strict';

const fs = require('fs');
const Logger = require('./logger');

class Writers {

  constructor() {
    this.log = new Logger(Writers.name);
  }

  write(fd) {
    // write PDF to output file
    this.log.debug(`writing into file: "${filename}"...`);
    pdf.pipe(fs.createWriteStream(filename));
  }
}

module.exports = Writers;
