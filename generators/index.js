'use strict';

const HTML = require('./html');
const Europass = require('./europass');

const debug = require('debug')('Rzum:Generators:');

class Generators {
  constructor(filename) {
    this.filename = filename;
  }

  async delegate(options) {
    options = options || {};
    console.log(options.format)

    debug('Rzum :: Résumé generator from JSON data ::');

    // read input data
    debug(' => reading data files...');
    const data = require('../data');

    // check output format
    switch (options.format) {
      case 'europass':
        debug(' => generating Europass...');
        await Europass(data, this.filename);
        break;

      case 'html':
        debug(' => generating HTML format...');
        await HTML(data, this.filename);
        break;
    }

    debug(' * All done! Enjoy your new résumé!!');
  }
}

module.exports = Generators;
