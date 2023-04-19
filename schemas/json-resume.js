const resumeSchema = require("resume-schema");
const Logger = require('../logger');

class JSONResume {
  static schema = resumeSchema.schema;

  constructor() {
    this.log = new Logger(JSONResume.name);
  }

  async validate(data) {
    return new Promise((resolve, reject) => {
      this.log.debug("Validating resumé data against schema...");
      resumeSchema.validate(data, (err, report) => {
        if (err) reject("Data is invalid" + JSON.stringify(err, null, 2));
        this.log.debug("...data is valid!");
        resolve(report);
      });
    });
  }
}

module.exports = JSONResume;
