'use strict';

const JSON = require('./json');
const HTML = require('./html');
const Europass = require('./europass');

class GeneratorFactory {

  static getGenerator(format) {
    // check output format
    switch (format) {
      case 'euro':
        return new Europass();

      case 'json':
        return new JSON();

      case 'html':
        return new HTML();

      case 'pdf':
        throw new Error('not implemented yet!!');

      default:
        if (typeof format === 'undefined')
          throw new Error('no format defined!');
        if (typeof format === 'string')
          throw new Error('unsupported format: ' + format);
        throw new Error('unsupported format');
    }
  }

}

module.exports = GeneratorFactory;
