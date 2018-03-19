'use strict';

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const axios = require('axios');
const Logger = require('../logger');
const Templr = require('../templr');

// -- EUROPASS API --
const API = {
  URL: 'https://europass.cedefop.europa.eu/rest/v1',
  PDF: '/document/to/pdf-cv',
};

class Europass {

  constructor() {
    this.ajv = new Ajv();
    this.tmplr = new Templr();
    this.log = new Logger(Europass.name);
  }

  // request CV in PDF format from external service (Europass REST API)
  async generatePDF(json) {
    return await axios.post(`${API.URL}${API.PDF}`, json, { responseType: 'stream' })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        throw new Error(`Couldn't generate Europass PDF`);
      });
  }

  // generates Europass CV
  async generate(data, filename) {
    this.log.info('generating Europass résumé...');

    // read template
    this.log.debug('loading Europass template...');
    // const template = fs.readFileSync(path.resolve(__dirname, '../templates/europass.nricardo.dust'), 'utf-8');
    const template = fs.readFileSync(path.resolve(__dirname, '../templates/europass.dust'), 'utf-8');
    console.log(template)

    // compile final JSON template
    this.log.debug('rendering template with data...');
    const json = await this.tmplr.render(template, data);

    // verify against schema
    this.log.debug('validating against schema...');
    const schema = fs.readFileSync(path.resolve(__dirname, '../schemas/europass-schema.json'));
    const valid = this.ajv.validate(schema, json);
    if (!valid) throw new Error('generated JSON file is not valid... Please check data!');

    // generate PDF
    this.log.debug('requesting PDF generation...');
    const resume = await this.generatePDF(JSON.parse(json)); // NOTE: this is already a stream!

    return resume;
  }

}

module.exports = Europass;
