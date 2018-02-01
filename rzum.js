#!/usr/bin/env node

const pkg = require('./package.json');

const fs = require('fs');
const axios = require('axios');
const program = require('commander');
const jsonTemplates = require('json-templates');

// -- OUTPUT OPTIONS --
const OUTPUT = {
  FORMAT: 'pdf',
  FOLDER: 'output/',
  FILENAME: 'nricardo',
};

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
async function generateEuropass(data) {
  // read template
  console.log('  - loading Europass template...');
  const template = require('./templates/europass.json');

  // build template
  const europass = jsonTemplates(template);

  // compile final JSON template
  console.log('  - compiling template with data...');
  const json = europass(data);

  // verify against schema
  // console.log(' => verifing data against schema...');

  // generate PDF
  console.log('  - requesting PDF generation...');
  const pdf = await generatePDF(json);

  // write PDF to output
  const filename = `${OUTPUT.FOLDER}${OUTPUT.FILENAME}.${OUTPUT.FORMAT}`;
  console.log(`  - writing into file: "${filename}"...`);
  pdf.pipe(fs.createWriteStream(filename));
}

async function generateResume(data, format = 'html') {
  // read template
  console.log('  - loading JSON Résumé template...');
  const template = require('./templates/resume.json');

  // build template
  const resume = jsonTemplates(template);

  // compile final JSON template
  console.log('  - compiling template with data...');
  const json = resume(data);

  console.log(json)
}

// ------------------------------------------------------------------------
async function Rzum() {

  try {
    console.log('Rzum :: Resume generator from JSON data ::');

    // read input data
    console.log(' => reading data files...');
    const data = require('./data');

    // create PDF's from this data file...
    console.log(' => generating resumé in PDF format...');
    await generateEuropass(data);

    console.log(' => generating resumé in HTML format...');
    await generateResume(data, 'html');

    console.log(' * All done! Enjoy your new resumé!!');
  }
  catch (err) {
    console.error(err);
  }

}

// start things up!
//Rzum();





// -- define prog parameters
program
  .usage("[options] <command>")
  .arguments('<command>')
  .version(`${pkg.name} v${pkg.version}`)
  .option('-t, --theme <theme name>', 'Specify résumé theme (exceptt for Europass)', 'flat');

program
  .command('generate')
  .alias('g')
  .description('generates the résumé in the specifed format (default is HTML)')
  .option('-f, --format <format>',
    `Generates résumé in the specified formats (default: html):
      - html:     creates a single HTML5 page using the given theme (default: flat);
      - pdf:      output will be a PDF print version of the HTML ;
      - json:     produces a JSON file compatible with JSONResume schema (https://jsonresume.org/schema/);
      - europass: generates a Europass CV in PDF+XML schema (http://interop.europass.cedefop.europa.eu/);
    `,
    '^(html|pdf|json|europass)$/i',
    'html'
  );

program.parse(process.argv);

console.log(program.args)
