#!/usr/bin/env node
'use strict';

const pkg = require('./package.json');
const program = require('commander');
const jsonTemplates = require('json-templates');

// import our generators
const Generators = require('./generators');

// ------------------------------------------------------------------------

program
  .version(`${pkg.name} v${pkg.version}`)
  .command('generate <filename>').alias('g')
  .description('Generates résumé in different type of output formats.')
  .option('-f, --format <format>', `defines the format for the output:
      - html:     creates a single HTML5 page using the given theme;
      - pdf:      output will be a PDF print version of the HTML format;
      - json:     produces a JSON file compatible with JSONResume schema (https://jsonresume.org/schema/);
      - europass: generates a Europass CV in PDF+XML schema (http://interop.europass.cedefop.europa.eu/);
      `, /^(html|pdf|json|europass)$/i, 'html')
  .option('-t, --theme <theme>', 'specify résumé theme (except for Europass)', 'flat')
  .option('-o, --output <filename>', 'writes output to filename')
  .action((filename, options) => {
    const generator = new Generators(filename);
    generator.delegate(options);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) program.help();
