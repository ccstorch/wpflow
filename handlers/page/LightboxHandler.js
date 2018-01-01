const notations = require('../../helpers/notations');

class LightboxHandler {
  constructor({ $ }) {
    this.$ = $;
  }

  handle() {
    const { $ } = this;

    $('.w-lightbox').each((index, wrapper) => {
      const $wrapper = $(wrapper);
      const $script = $(wrapper).find('script');

      const $image = $(wrapper).find('img').first();
      const subFieldName = $image.data('wpf-subfield-name');
      const fieldName = $image.data('wpf-field-name');

      const data = JSON.parse($script.html());
      data.items.forEach((item) => {
        if(!!subFieldName) {
          item.url = notations.add(`<?php echoSubFieldImage( "${subFieldName}" ) ?>`);
        } else if(!!fieldName) {
          item.url = notations.add(`<?php echoFieldImage( "${fieldName}" ) ?>`);
        }
      });

      $script.html(JSON.stringify(data));
    })
  }
}

module.exports = LightboxHandler;
