const _ = require('lodash');
const path = require('path');
const fs = require('fs');

const wfCssFolder = 'css';
const names = {
  '.webflow.css': 'theme.wf.css',
  'webflow.css': 'wf.css',
  'normalize.css': 'normalize.wf.css',
};

class HeadHandler {
  constructor({ wfSitePath, fileHandler }) {
    this.fileHandler = fileHandler;
    this.wfSitePath = wfSitePath;
  }

  handle() {
    // Copy all css files from css folder
    const { fileHandler, wfSitePath } = this;
    const files = fs.readdirSync(path.join(wfSitePath, '/css'));
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

      fileHandler.copy(`${wfSitePath}/${wfCssFolder}/${fileName}`, `./css/${finalName || fileName}`);
    });
  }
}

module.exports = HeadHandler;
