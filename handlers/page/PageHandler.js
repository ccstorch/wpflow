const format = require('../../helpers/format');
const { pluginLayoutsLocation } = require('../../helpers/pathHelpers');

const names = {
  'index.html': { layout: 'front-page.php.ejs', final: 'front-page.php' },
  '404.html': { layout: 'clean-page.php.ejs', final: '404.php' },
  '401.html': { layout: 'clean-page.php.ejs', final: '401.php' },
};

class PageHandler {
  constructor({ fileName, $ }, { fileHandler, customConfig }) {
    this.$ = $;
    this.fileHandler = fileHandler;
    this.fileName = fileName;
    this.customConfig = customConfig;
  }

  handle() {
    const { fileName, $, fileHandler, customConfig } = this;

    const content = format($.html('body > *:not(.navbar, footer:last-of-type, script)'));
    const fileNameWithoutExtension = fileName.split('.')[0];

    let layoutName = 'page.php.ejs';
    let pageName = fileNameWithoutExtension;
    let finalFileName = `${fileNameWithoutExtension}.php`;

    if(names[fileName]) {
      const { layout, final } = names[fileName];
      layoutName = layout;
      pageName = '';
      finalFileName = final;
    }

    // Ignore file if it is in the ignore list
    if(customConfig.ignoreFiles.includes(finalFileName)) return;

    fileHandler.copyTpl(
      pluginLayoutsLocation + layoutName,
      finalFileName,
      { content }
    );
  }
}

module.exports = PageHandler;
