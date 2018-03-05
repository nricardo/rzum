'use strict';

const fs = require('fs');
const Logger = require('../logger');
const Templr = require('../templr');

class jSON {

  constructor () {
    this.log = new Logger('JSON');
    this.tmplr = new Templr();
  }

  // generates an JSON résumé
  async generate(data) {
    this.log.info('generating JSON résumé...');

    // read template
    this.log.debug('loading Résumé template...');
    const template = fs.readFileSync('templates/resume.dust', 'utf-8');

    // compile final JSON template
    this.log.debug('rendering template with data...');
    const resume = await this.tmplr.render(template, data);

    return JSON.parse(resume);
  }
}

module.exports = jSON;
