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

    // TODO: Break line after each meta tag
    const metaTags = $.xml('head meta:not([charset])');
    const wfPageCode = $('html').data('wf-page');
    const wfSiteCode = $('html').data('wf-site');
    const headScripts = $.xml('head script:not([src]), head script[src*=http]');

    // TODO: Use wordpress nav bar
    const navbar = format($.html('.navbar'));

    // Ignore file if it is in the ignore list
    if(customConfig.ignoreFiles.includes('header.php')) return;

    fileHandler.copyTpl(
      pluginLayoutsLocation + 'header.php.ejs',
      './header.php',
      { metaTags, wfPageCode, wfSiteCode, headScripts, navbar }
    );
  }
}

module.exports = HeaderHandler;
