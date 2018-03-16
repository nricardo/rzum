'use strict';

const fs = require('fs');
const path = require('path');
const Logger = require('../logger');
const Templr = require('../templr');

const { RzumStream } = require('../writers');

class jSON {

  constructor() {
    this.log = new Logger('JSON');
    this.tmplr = new Templr();
  }

  // generates an JSON résumé
  async generate(data) {
    this.log.info('generating JSON résumé...');

    // read template
    this.log.debug('loading Résumé template...');
    const template = fs.readFileSync(path.resolve(__dirname, '../templates/resume.dust'), 'utf-8');

    // compile final JSON template
    this.log.debug('rendering template with data...');
    const json = await this.tmplr.render(template, data);

    // transform (pretty-print JSON)
    const resume = JSON.stringify(JSON.parse(json), null, 2);

    // return as stream
    return new RzumStream(resume);
  }
}

module.exports = jSON;
