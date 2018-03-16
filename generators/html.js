'use strict';

const fs = require('fs');
const path = require('path');
const Logger = require('../logger');
const Templr = require('../templr');

const { RzumStream } = require('../writers');

class HTML {

  constructor () {
    this.log = new Logger(HTML.name);
    this.tmplr = new Templr();
  }

  // generates an HTML résumé
  async generate(data, filename) {
    this.log.info('generating HTML résumé...');

    // read template
    this.log.debug('loading template...');
    const template = fs.readFileSync(path.resolve(__dirname, '../templates/html.dust'), 'utf-8');

    // compile final HTML template
    this.log.debug('compiling template with data...');
    const html = await this.tmplr.render(template, data);

    // return as stream
    return new RzumStream(html);
  }
}

module.exports = HTML;
