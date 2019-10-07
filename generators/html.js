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
  async generate(data) {
    this.log.info('generating HTML résumé...');

    // read template
    this.log.debug('loading template...');
    const script = fs.readFileSync(path.resolve(__dirname, '../templates/resume.js'), 'utf-8');
    const styles = fs.readFileSync(path.resolve(__dirname, '../templates/resume.css'), 'utf-8');
    const template = fs.readFileSync(path.resolve(__dirname, '../templates/html.dust'), 'utf-8');
    data = Object.assign({}, data, {_: {script, styles}});

    // compile final HTML template
    this.log.debug('compiling template with data...');
    let html = await this.tmplr.render(template, data);

    // return as stream
    return new RzumStream(html);
  }
}

module.exports = HTML;
