const notations = require('./notations');
const indent = require('./indent');

const format = (html) => {
  return notations.replace(indent(html));
}

module.exports = format;
