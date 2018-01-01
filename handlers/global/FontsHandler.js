const fs = require('fs');
class FontsHandler {
  constructor({ wfSitePath, fileHandler }) {
    this.fileHandler = fileHandler;
    this.wfSitePath = wfSitePath;
  }

  handle() {
    // Copy all fonts files from fonts folder
    const { fileHandler, wfSitePath } = this;
    const originalPath = `${wfSitePath}/fonts`;
    if(fs.existsSync(originalPath)) {
      fileHandler.copy(originalPath, './fonts/');
    }
  }
}

module.exports = FontsHandler;
