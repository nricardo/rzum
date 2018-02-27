'use strict';

const fs = require('fs');
const jsonTemplates = require('json-templates');

const Logger = require('../logger');

class HTML {

  constructor () {
    this.log = new Logger(HTML.name);
  }

  // generates an HTML résumé
  async generate(data, filename) {
    this.log.info('generating HTML résumé...');

    // read template
    this.log.debug('loading template...');
    const template = require('../templates/resume.json');

    // compile final JSON template
    this.log.debug('compiling template with data...');
    const resume = jsonTemplates(template);
    const json = resume(data);

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
