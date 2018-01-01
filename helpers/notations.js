const _ = require('lodash');
const replaceAll = require('./replaceAll');

const notations = {
  '##ADD_COMMA##': '"',
  '##ADD_SCOMMA##': "'",
  '##OPEN_PHP##': '<?php',
  '##OPEN_PHP_AND_LINE##': '\n<?php',
  '##CLOSE_PHP##': '?>',
  '##CLOSE_PHP_AND_LINE##': '?>\n',
  '##PHP_ARROW##': '->',
  '##PHP_DARROW##': '=>',
}

const inverseNotations = {
  '##OPEN_PHP##': '<\\?php',
  '##OPEN_PHP_AND_LINE##': '\n<\\?php',
  '##CLOSE_PHP##': '\\?>',
  '##CLOSE_PHP_AND_LINE##': '\\?>\n',
}

const replace = (string) => {
  let finalString = string;
  _.each(notations, (value, key) => {
    finalString = replaceAll(finalString, key, value);
  });
  return finalString;
}

const add = (string) => {
  let finalString = string;
  _.each(Object.assign({}, notations, inverseNotations), (value, key) => {
    finalString = replaceAll(finalString, value, key);
  });
  return finalString;
}

module.exports = { replace, add };
