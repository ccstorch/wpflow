const _ = require('lodash');
const { pluginLayoutsLocation } = require('../../helpers/pathHelpers');

class FunctionsHandler {
  constructor({ fileHandler }) {
    this.fileHandler = fileHandler;
    this.importFiles = [];
  }

  addImport(file) {
    this.importFiles.push(file);
  }

  handle() {
    const { fileHandler, importFiles } = this;
    let customFieldsSettings = '';

    const importDeclarations = importFiles.map((item) => {
      return `require get_template_directory() . '${item}';`;
    }).join('\n');

    fileHandler.copyTpl(
      pluginLayoutsLocation + 'imports.php.ejs',
      './config/imports.wf.php',
      { importDeclarations }
    );
  }
}

module.exports = FunctionsHandler;
