const _ = require('lodash');
const format = require('../../helpers/format');
const { pluginLayoutsLocation } = require('../../helpers/pathHelpers');

class CustomPostsHandler {
  constructor({ $ }, { fileHandler, functions }) {
    this.$ = $;
    this.fileHandler = fileHandler;
    this.functions = functions;
  }

  handle() {
    const { $, fileHandler, functions } = this;

    $('[data-wpf-custom-post-type], [data-wpf-loop]').each((index, element) => {
      const $element = $(element);
      let value = $element.data('wpf-custom-post-type');
      if(!value) value = $element.data('wpf-loop');
      const key = _.snakeCase(value);
      const label = _.capitalize(_.lowerCase(value));
      const finalPath = `/config/custom-posts/${key}.wf.php`;
      functions.addImport(finalPath);

      fileHandler.copyTpl(
        pluginLayoutsLocation + 'custom-post.php.ejs',
        `.${finalPath}`,
        { key, label }
      );
    });

  }
}

module.exports = CustomPostsHandler;
