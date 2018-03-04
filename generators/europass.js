'use strict';

const fs = require('fs');
const axios = require('axios');
const JSONt = require('jsont')();

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
    const europass = require('../templates/europass.json');

    // compile final JSON template
    this.log.verbose('compiling template with data...');
    JSONt.render(europass, data, async (err, json) => {
      if (err) this.log.error(err);
      console.log(json)

      // verify against schema
      // this.log.verbose(' => verifing data against schema...');

      // generate PDF
      this.log.verbose('requesting PDF generation...');
      const pdf = await this.generatePDF(json);

      // write PDF to output file
      this.log.verbose(`writing into file: "${filename}"...`);
      pdf.pipe(fs.createWriteStream(filename));

    });
  }

}

module.exports = Europass;
