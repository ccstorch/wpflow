const _ = require('lodash');
const path = require('path');
const fs = require('fs');

const wfJsFolder = 'js';
const names = {
  'webflow.js': 'wf.js',
  'modernizr.js': 'modernizr.wf.js',
};

class ScriptsHandler {
  constructor({ wfSitePath, fileHandler, customConfig }) {
    this.fileHandler = fileHandler;
    this.wfSitePath = wfSitePath;
    this.customConfig = customConfig;
  }

  handle() {
    // Copy all js files from js folder
    const { fileHandler, wfSitePath, customConfig } = this;
    const files = fs.readdirSync(path.join(wfSitePath, '/js'));
    files.forEach((fileName) => {
      let finalName = false;

      if(!!names[fileName]) {
        finalName = names[fileName];
      } else {
        _.forEach(names, (finalNameOption, initialName) => {
          if(!finalName && fileName.includes(initialName)) {
            finalName = finalNameOption;
          }
        });
      }

      // Ignore file if it is in the ignore list
      if(customConfig.ignoreFiles.includes(finalName)) return;

      fileHandler.copy(`${wfSitePath}/${wfJsFolder}/${fileName}`, `./js/${finalName || fileName}`);
    });
  }
}

module.exports = ScriptsHandler;
