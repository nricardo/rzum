'use strict';

const fs = require('fs');
const Logger = require('../logger');
const Templr = require('../templr');

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
    const template = fs.readFileSync('templates/resume.dust', 'utf-8');

    // compile final JSON template
    this.log.debug('compiling template with data...');
    this.tmplr.render(template, data);

    // verify against schema
    this.log.debug('verifing against schema...');

    // creating HTML page
    this.log.debug('creating HTML page...');
    const html = `<html></html>`; // await

    // write PDF to output file
    this.log.debug(`writing into file: "${filename}"...`);
    fs.writeFileSync(filename, html);
  }
}

module.exports = HTML;
