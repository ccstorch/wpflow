const replaceAll = function(string, key, value) {
  return string.replace(new RegExp(key, 'g'), value);
};

module.exports = replaceAll;
