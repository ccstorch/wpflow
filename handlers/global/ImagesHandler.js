class ImagesHandler {
  constructor({ wfSitePath, fileHandler }) {
    this.fileHandler = fileHandler;
    this.wfSitePath = wfSitePath;
  }

  handle() {
    // Copy all images files from images folder
    const { fileHandler, wfSitePath } = this;
    fileHandler.copy(`${wfSitePath}/images`, './images/');
  }
}

module.exports = ImagesHandler;
