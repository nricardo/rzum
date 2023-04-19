#!/usr/bin/env node
'use strict';

const program = require('commander');
const pkg = require('./package.json');
const Logger = require('./logger');
const { Writers } = require('./writers');

// import our generators
const GeneratorFactory = require('./generators');
const JSONResume = require('./schemas/json-resume');

// ------------------------------------------------------------------------

class Rzum {

  constructor() {
    this.log = new Logger(Rzum.name);

    this.setup();
  }

  setup() {
    program
      .version(`${pkg.name} v${pkg.version}`)
      .option('-v, --verbose [level]', 'be verbose on logging', '1')
      .command('generate').alias('g')
      .description('Generates résumé in different type of output formats.')
      .option('-f, --format <format>', `defines the format for the output:
            - html:  creates a single HTML5 page using the given theme;
            - pdf:   output will be a PDF print version of the HTML format;
            - json:  produces a JSON file compatible with JSONResume schema (https://jsonresume.org/schema/);
            - euro:  generates a Europass CV in PDF+XML schema (http://interop.europass.cedefop.europa.eu/);
            `, /^(html|pdf|json|euro)$/i)
      .option('-t, --theme <theme>', 'specify résumé theme (except for Europass)', 'flat')
      .option('-o, --output <filename>', 'writes output to filename')
      .action(options => this.generate(options));

    program.parse(process.argv);

    if (!process.argv.slice(2).length) program.help();
  }

  async generate(options) {
    const { theme, format } = options;
    const filename = options.output;
    const output = new Writers(filename);

    try {
      this.log.info(':: Résumé generator from JSON data ::');

      // read input data
      this.log.debug('reading data files...');
      const data = require('./data');

      // get a generator for the needed format
      const generator = GeneratorFactory.getGenerator(format);

      // validade data against JSON Resume schema
      const jsonResume = new JSONResume();
      await jsonResume.validate(data);

      // now generate with given json data
      const resume = await generator.generate(data);

      // write to output stream
      output.write(resume);

      this.log.info('All done! Enjoy your new résumé!!');
    } catch (e) {
      this.log.error(e);
    }
  }
}

// -- lets start this show!
const rzum = new Rzum();
