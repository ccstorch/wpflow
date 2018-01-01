const { customConfigFilePath } = require('./pathHelpers');

const customConfigDefaults = {
  customFields: [],
  customSubFields: [],
  ignoreFiles: [],
}

const getCustomConfigData = () => {
  let customConfig = Object.assign({}, customConfigDefaults);

  try {
    customConfig = Object.assign({}, customConfig, require(customConfigFilePath));
  } catch (e) {}

  return customConfig;
}

module.exports = { getCustomConfigData };
