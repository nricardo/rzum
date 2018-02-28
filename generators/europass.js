'use strict';

const fs = require('fs');
const axios = require('axios');
const jsonTemplates = require('json-templates');

const Logger = require('../logger');

// -- EUROPASS API --
const API = {
  URL: 'https://europass.cedefop.europa.eu/rest/v1',
  PDF: '/document/to/pdf-cv',
};

class Europass {

  constructor () {
    this.log = new Logger(Europass.name);
  }

  // request CV in PDF format from external service (Europass REST API)
  async generatePDF(json) {
    return await axios.post(`${API.URL}${API.PDF}`, json, { responseType: 'stream' }).then(res => {
      return res.data;
    });
  }

  // generates Europass CV
  async generate(data, filename) {
    this.log.info('generating Europass résumé...');

    // read template
    this.log.verbose('loading Europass template...');
    // const template = require('../templates/europass.json');
    const template = require('../data/europass.nricardo.json');

    // compile final JSON template
    this.log.verbose('compiling template with data...');
    const europass = jsonTemplates(template);
    const json = europass(data);

    // verify against schema
    // this.log.verbose(' => verifing data against schema...');

    // generate PDF
    this.log.verbose('requesting PDF generation...');
    const pdf = await this.generatePDF(json);

    // write PDF to output file
    this.log.verbose(`writing into file: "${filename}"...`);
    pdf.pipe(fs.createWriteStream(filename));
  }

}

module.exports = Europass;
