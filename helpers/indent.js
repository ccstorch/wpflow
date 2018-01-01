const _ = require('lodash');
const replaceAll = require('./replaceAll');
const beautify = require('js-beautify').html;

const indent = (html) => {
  html = replaceAll(html, '<img', '\n<img');
  html = replaceAll(html, '<a', '\n<a');
  // html = replaceAll(html, '>', '>\n');
  // html = replaceAll(html, '</', '\n</');
  return beautify(html, {
    indent_size: 2,
    max_preserve_newlines: 0,
    wrap_line_length: 0,
  });
}

module.exports = indent;
