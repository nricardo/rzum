'use strict';

const fs = require('fs');
const jsonTemplates = require('json-templates');

const Logger = require('../logger');

class jSON {

  constructor () {
    this.log = new Logger(jSON.name);
  }

  // generates an JSON résumé
  async generate(data, filename) {
    this.log.info('generating JSON résumé...');

    // read template
    this.log.debug('loading template...');
    const template = require('../templates/resume.json');

    // compile final JSON template
    this.log.debug('compiling template with data...');
    const resume = jsonTemplates(template);
    const json = resume(data);

    // verify against schema
    this.log.debug('verifing against schema...');

    // write PDF to output file
    this.log.debug(`writing into file: "${filename}"...`);
    fs.writeFileSync(filename, JSON.stringify(json));
  }
}

module.exports = jSON;
