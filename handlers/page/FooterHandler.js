const format = require('../../helpers/format');
const { pluginLayoutsLocation } = require('../../helpers/pathHelpers');

class HeaderHandler {
  constructor({ $ }, { fileHandler, customConfig }) {
    this.$ = $;
    this.fileHandler = fileHandler;
    this.customConfig = customConfig;
  }

  handle() {
    const { $, fileHandler, customConfig } = this;

    const footer = format($.html('.footer'));

    // Ignore file if it is in the ignore list
    if(customConfig.ignoreFiles.includes('footer.php')) return;

    fileHandler.copyTpl(
      pluginLayoutsLocation + 'footer.php.ejs',
      './footer.php',
      { footer }
    );
  }
}

module.exports = HeaderHandler;
