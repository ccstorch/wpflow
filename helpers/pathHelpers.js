const path = require('path');

module.exports = {
  pluginInitialStructure: path.join(path.dirname(__filename), '../initialStructure/'),
  pluginLayoutsLocation: path.join(path.dirname(__filename), '../layouts/'),
  customConfigFilePath: path.join(process.cwd(), 'wpflow.config'),
}
