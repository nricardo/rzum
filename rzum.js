const fs = require('fs');
const axios = require('axios');
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

// generates CV in PDF format
async function generatePDF(json) {
  return await axios.post(`${API.URL}${API.PDF}`, json, { responseType: 'stream' }).then(res => {
    return res.data;
  });
}

// ------------------------------------------------------------------------
async function Rzum() {

  try
  {
    console.log('Rzum :: Resume generator from JSON data ::');

    // read template
    const template = require('./templates/europass.json');

    // parse template
    const parsed = jsonTemplates(template);

    // read input data
    const data = require('./data/basic');

    // inject data and compile into final template
    const CV = parsed(data);

    // verify against schema
    console.log(' => verifing data against schema...');

    // generate PDF
    console.log(' => generating resumé in PDF format...');
    const pdf = await generatePDF(CV);

    // write PDF to output
    const filename = `${OUTPUT.FOLDER}${OUTPUT.FILENAME}.${OUTPUT.FORMAT}`;
    console.log(` => writing PDF resumé into "${filename}"...`);
    pdf.pipe(fs.createWriteStream(filename));

    console.log(' * All done! Enjoy your new resumé!!');
  }
  catch (err) {
    console.error(err);
  }

}

// start things up!
Rzum();
