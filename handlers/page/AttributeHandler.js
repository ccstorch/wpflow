const notations = require('../../helpers/notations');

class AttributeHandler {
  constructor({ $ }) {
    this.$ = $;
  }

  handle() {
    const { $ } = this;

    $('[data-wpf-field-attribute]').each((index, element) => {
      const $element = $(element);
      const fieldName = $element.data('wpf-field-name');
      const attributeName = $element.data('wpf-field-attribute');

      const prefix = $element.data('wpf-field-attribute-prefix') || '';
      const sufix = $element.data('wpf-field-attribute-sufix') || '';

      const fieldOrigin = $element.data('wpf-field-origin');
      const getFieldMethodName = fieldOrigin === 'global' ? 'echoGlobalField' : 'echoField';

      const action = $element.data('wpf-field-attribute-action');
      const isIncrement = action === 'increment';

      let newValue = notations.add(`${prefix}<?php ${getFieldMethodName}( "${fieldName}" ) ?>${sufix}`);

      if(isIncrement) {
        const currentValue = $element.attr(attributeName);
        newValue = currentValue + ' ' + newValue;
      }

      $element.attr(attributeName, newValue);
    });

    $('[data-wpf-subfield-attribute]').each((index, element) => {
      const $element = $(element);
      const fieldName = $element.data('wpf-subfield-name');
      const attributeName = $element.data('wpf-subfield-attribute');
      const action = $element.data('wpf-subfield-attribute-action');
      const prefix = $element.data('wpf-subfield-attribute-prefix') || '';
      const sufix = $element.data('wpf-subfield-attribute-sufix') || '';
      const isIncrement = action === 'increment';

      let newValue = notations.add(`${prefix}<?php echoSubField( "${fieldName}" ) ?>${sufix}`);
      if(isIncrement) {
        const currentValue = $element.attr(attributeName);
        newValue = currentValue + ' ' + newValue;
      }

      $element.attr(attributeName, newValue);
    });
  }
}

module.exports = AttributeHandler;
