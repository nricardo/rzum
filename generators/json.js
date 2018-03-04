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
  async generate(data, filename) {
    this.log.info('generating JSON résumé...');

    // read template
    this.log.debug('loading template...');
    const template = fs.readFileSync('templates/resume.dust', 'utf-8');

    // compile final JSON template
    this.log.debug('rendering template with data...');
    this.tmplr.render(template, data);

    // resume = JSON.parse(resume);
    // fs.writeSync(0, JSON.stringify(resume, null, 2));




    // JSON.parse(json);
    // console.log(json)

    // verify against schema
    // this.log.debug('verifing against schema...');

    // write output to file
    // this.log.debug(`writing into file: "${filename}"...`);
    // fs.writeFileSync(filename, resume);
  }
}

module.exports = jSON;
