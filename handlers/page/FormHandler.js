const notations = require('../../helpers/notations');

class FormHandler {
  constructor({ $ }) {
    this.$ = $;
  }

  handle() {
    const { $ } = this;

    $('form').each((index, element) => {
      const $form = $(element);
      $form.attr('data-simple-ajax-form', '');
    });
  }
}

module.exports = FormHandler;
