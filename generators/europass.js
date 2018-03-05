'use strict';

const fs = require('fs');
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
    const template = fs.readFileSync('templates/europass.dust', 'utf-8');

    // compile final JSON template
    this.log.debug('rendering template with data...');
    const resume = await this.tmplr.render(template, data);

    // verify against schema
    this.log.debug('validating against schema...');
    const schema = fs.readFileSync('schemas/europass-schema.json');
    // const valid = this.ajv.validate(schema, resume);
    // if (!valid) throw new Error('generated JSON file is not valid... Please check data!');

    // generate PDF
    this.log.debug('requesting PDF generation...');
    const json = JSON.parse(resume);
    // console.log(JSON.stringify(json, null, 2))
    const pdf = await this.generatePDF(json);

    pdf.pipe(fs.createWriteStream('test.pdf'));

    // return pdf;
  }

}

module.exports = Europass;
