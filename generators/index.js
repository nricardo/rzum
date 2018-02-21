'use strict';

const HTML = require('./html');
const Europass = require('./europass');

class GeneratorFactory {

  static getGenerator(format) {
    // check output format
    switch (format) {
      case 'europass':
        return new Europass(this.filename);

      case 'html':
        return new HTML(this.filename);

      default:
        throw new Error('unsupported format');
    }
  }

}

module.exports = GeneratorFactory;
