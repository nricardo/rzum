'use strict';

const fs = require('fs');
const axios = require('axios');
const jsonTemplates = require('json-templates');
const debug = require('debug')('Generators:Europass');

// -- EUROPASS API --
const API = {
  URL: 'https://europass.cedefop.europa.eu/rest/v1',
  PDF: '/document/to/pdf-cv',
};

// request CV in PDF format from external service (Europass REST API)
async function generatePDF(json) {
  return await axios.post(`${API.URL}${API.PDF}`, json, { responseType: 'stream' }).then(res => {
    return res.data;
  });
}

// generates Europass CV
async function generateEuropass(data, filename) {
  // read template
  debug('  - loading Europass template...');
  const template = require('../templates/europass.json');

  // compile final JSON template
  debug('  - compiling template with data...');
  const europass = jsonTemplates(template);
  const json = europass(data);

  // verify against schema
  // debug(' => verifing data against schema...');

  // generate PDF
  debug('  - requesting PDF generation...');
  const pdf = await generatePDF(json);

  // write PDF to output file
  debug(`  - writing into file: "${filename}"...`);
  pdf.pipe(fs.createWriteStream(filename));
}

module.exports = generateEuropass;
