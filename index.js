const fs = require("fs");
const path = require("path");
const Templr = require("./templr");

function render(data) {
  const templr = new Templr();
  const styles = fs.readFileSync(path.resolve(__dirname, 'templates/cv.css'), 'utf-8');
  const resume = fs.readFileSync(path.resolve(__dirname, 'templates/html.hbs'), 'utf-8');
  return templr.render(resume, { ...data, _: { styles }});
}

module.exports = { render };
