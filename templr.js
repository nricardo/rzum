'use strict';

const fs = require('fs');
const moment = require('moment');
const DustJS = require('dustjs-helpers');
const Logger = require('./logger');

class Templr {

  constructor() {
    this.log = new Logger(Templr.name);
    this.extend();
  }

  render(template, data) {
    return new Promise((resolve, reject) => {
      DustJS.renderSource(template, data, (err, resume) => {
        if (err) reject(err);
        resolve(resume);
      });
    });
  }

  extend() {
    // create a helper called 'rzumDate'
    DustJS.helpers.rzumDate = function (chunk, context, bodies, params) {

      // retrieve the date value from the template parameters.
      const date = DustJS.helpers.tap(params.date, chunk, context);

      // retrieve the format string from the template parameters.
      const format = DustJS.helpers.tap(params.format, chunk, context);

      // parse the date object using MomentJS
      const m = date ? moment(`${date.year}-${date.month}`, 'YYYY-MM') : moment();

      // format the string
      const output = m.format(format);

      // write the final value out to the template
      return chunk.write(output);
    };
  }
}

module.exports = Templr;
