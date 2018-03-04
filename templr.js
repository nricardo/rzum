'use strict';

const fs = require('fs');
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
        console.log(resume)
        if (err) reject(err);
        resolve(resume);
      });
    });
  }

  extend() {
    // //Create a helper called 'formatDate'
    // dust.helpers.formatDate = function (chunk, context, bodies, params) {

    //   //Retrieve the date value from the template parameters.
    //   var date = dust.helpers.tap(params.date, chunk, context);

    //   //Retrieve the format string from the template parameters.
    //   var format = dust.helpers.tap(params.format, chunk, context);

    //   //Parse the date object using MomentJS
    //   var m = moment(new Date(date));

    //   //Format the string
    //   var output = m.format(format);

    //   //Write the final value out to the template
    //   return chunk.write(output);
    // };
  }
}

module.exports = Templr;
