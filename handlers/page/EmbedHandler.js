const format = require('../../helpers/format');
const { pluginLayoutsLocation } = require('../../helpers/pathHelpers');

class EmbedHandler {
  constructor({ $ }, { customConfig }) {
    this.$ = $;
    this.customConfig = customConfig;
  }

  handle() {
    const { $, customConfig } = this;

    // Remove embed code if it is in the config file
    if(customConfig.removeEmbedCode) {
      $('.w-embed').remove();
    }
  }
}

module.exports = EmbedHandler;
