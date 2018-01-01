const fs = require('fs');
const path = require('path');
const { getCustomConfigData } = require('../../helpers/customConfig');
const BulkPageHandler = require('../page/BulkPageHandler');
const ACFSettingsHandler = require('./ACFSettingsHandler');
const FunctionsHandler = require('./FunctionsHandler');
const CssHandler = require('./CssHandler');
const ScriptsHandler = require('./ScriptsHandler');
const ImagesHandler = require('./ImagesHandler');
const FontsHandler = require('./FontsHandler');

class BulkGlobalHandler {
  constructor(wfSitePath, fileHandler) {
    this.wfSitePath = wfSitePath;
    this.fileHandler = fileHandler;
    this.customConfig = getCustomConfigData();
  }

  handle() {
    const { wfSitePath, fileHandler } = this;

    new CssHandler(this).handle();
    new ScriptsHandler(this).handle();
    new ImagesHandler(this).handle();
    new FontsHandler(this).handle();

    this.acfSettings = new ACFSettingsHandler(this);
    this.functions = new FunctionsHandler(this);

    const files = fs.readdirSync(path.join(wfSitePath, '/'));
    files.forEach((fileName) => {
      new BulkPageHandler(fileName, this).handle();
    });

    this.acfSettings.handle();
    this.functions.handle();
  }
}

module.exports = BulkGlobalHandler;
