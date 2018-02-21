'use strict';

const fs = require('fs');
const jsonTemplates = require('json-templates');
const debug = require('debug')('Rzum:HTML');

class HTML {

  // generates an HTML résumé
  async generate(data, filename) {
    // read template
    debug('loading JSON Résumé template...');
    const template = require('../templates/resume.json');

    // compile final JSON template
    debug('compiling template with data...');
    const resume = jsonTemplates(template);
    const json = resume(data);

    // verify against schema
    // debug.info(' => verifing data against schema...');

    // creating HTML page
    debug('creating HTML page...');
    const html = `<html></html>`; // await

    // write PDF to output file
    debug(`writing into file: "${filename}"...`);
    fs.writeFileSync(filename, html);
  }
}

module.exports = HTML;
