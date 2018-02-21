#!/usr/bin/env node
'use strict';

const debug = require('debug')('Rzum');
const program = require('commander');
const jsonTemplates = require('json-templates');

const pkg = require('./package.json');

// import our generators
const GeneratorFactory = require('./generators');

// ------------------------------------------------------------------------

try {

  program
  .version(`${pkg.name} v${pkg.version}`)
    .command('generate <filename>').alias('g')
    .description('Generates résumé in different type of output formats.')
    .option('-f, --format <format>', `defines the format for the output:
        - html:     creates a single HTML5 page using the given theme;
        - pdf:      output will be a PDF print version of the HTML format;
        - json:     produces a JSON file compatible with JSONResume schema (https://jsonresume.org/schema/);
        - europass: generates a Europass CV in PDF+XML schema (http://interop.europass.cedefop.europa.eu/);
        `, /^(html|pdf|json|europass)$/i)
    .option('-t, --theme <theme>', 'specify résumé theme (except for Europass)', 'flat')
    .option('-o, --output <filename>', 'writes output to filename')
    .action((filename, options) => {
      debug(':: Résumé generator from JSON data ::');

      // read input data
      debug('reading data files...');
      const data = require('./data');

      // get a generator for the needed format
      const generator = GeneratorFactory.getGenerator(options.format);

      // now generate with given json data
      generator.generate(data, filename);

      debug(' * All done! Enjoy your new résumé!!');
    });

  program.parse(process.argv);

  if (!process.argv.slice(2).length) program.help();

} catch (e) {
  console.error(e.message);
  program.help();
}
