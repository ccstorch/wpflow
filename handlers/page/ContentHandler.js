const notations = require('../../helpers/notations');

class ContentHandler {
  constructor({ $ }) {
    this.$ = $;
  }

  handle() {
    const { $ } = this;

    // const defaultNotClause = `
    //   :not([data-wpf-field-attribute])
    //   :not([data-wpf-subfield-attribute])
    //   :not([data-wpf-field-type="image"])
    //   :not([data-wpf-subfield-type="image"])
    //   :not([data-wpf-field-action="download"])
    //   :not([data-wpf-subfield-action="download"])
    //   :not([data-wpf-field-action="hide-if-blank"])
    //   :not([data-wpf-subfield-action="hide-if-blank"])
    // `;

    const defaultNotClause = `:not([data-wpf-field-attribute]):not([data-wpf-subfield-attribute]):not([data-wpf-field-type="image"]):not([data-wpf-subfield-type="image"]):not([data-wpf-field-action="download"]):not([data-wpf-subfield-action="download"]):not([data-wpf-field-action="hide-if-blank"]):not([data-wpf-subfield-action="hide-if-blank"])`;

    $('[data-wpf-content]').text(`\n##OPEN_PHP## the_content() ##CLOSE_PHP##\n`);
    $('[data-wpf-title]').text(`\n##OPEN_PHP## the_title() ##CLOSE_PHP##\n`);

    // Fields
    $(`[data-wpf-field-name]${defaultNotClause}`).each((index, element) => {
      const $element = $(element);
      const fieldName = $element.data('wpf-field-name');
      const fieldOrigin = $element.data('wpf-field-origin');
      const getFieldMethodName = fieldOrigin === 'global' ? 'echoGlobalField' : 'echoField';
      $element.text(notations.add(`\n<?php ${getFieldMethodName}( "${fieldName}" ) ?>\n`));
    });

    // SubFields
    $(`[data-wpf-subfield-name]${defaultNotClause}`).each((index, element) => {
      const $element = $(element);
      const fieldName = $element.data('wpf-subfield-name');
      $element.text(notations.add(`\n<?php echoSubField( "${fieldName}" ) ?>\n`));
    });

    // Image Fields
    $('[data-wpf-field-type="image"]:not([data-wpf-field-action="background"])').each((index, element) => {
      const $element = $(element);
      const fieldName = $element.data('wpf-field-name');
      const fieldOrigin = $element.data('wpf-field-origin');
      const className = $element.attr('class');
      const getFieldMethodName = fieldOrigin === 'global' ? 'echoGlobalFieldImageTag' : 'echoFieldImageTag';
      const imageSize = $element.data('wpf-field-image-size');
      $element.replaceWith(notations.add(`\n<?php ${getFieldMethodName}( "${fieldName}", "${imageSize || 'large'}", "${className}" ) ?>\n`));
    });

    // Background Image Fields
    $('[data-wpf-field-type="image"][data-wpf-field-action="background"]').each((index, element) => {
      const $element = $(element);
      const fieldName = $element.data('wpf-field-name');
      const fieldOrigin = $element.data('wpf-field-origin');
      const getFieldMethodName = fieldOrigin === 'global' ? 'getGlobalFieldImage' : 'getFieldImage';
      const imageSize = $element.data('wpf-field-image-size');

      const getImageFunctionCallString = `${getFieldMethodName}( "${fieldName}", "${imageSize || 'full'}" )`;
      // $element.before(notations.add(`\n<?php $bgImage = ${getImageFunctionCallString} ?>\n`));
      $element.css('background-image', notations.add(`<?php if(${getImageFunctionCallString}) echo 'url(' . ${getImageFunctionCallString} . ')' ?>`));
    });

    // Image SubFields
    $('[data-wpf-subfield-type="image"]').each((index, element) => {
      const $element = $(element);
      const className = $element.attr('class');
      const fieldName = $element.data('wpf-subfield-name');
      const imageSize = $element.data('wpf-subfield-image-size');
      $element.replaceWith(notations.add(`\n<?php echoSubFieldImageTag( "${fieldName}", "${imageSize || 'large'}", "${className}" ) ?>\n`));
    });

    // Hide field component
    $('[data-wpf-field-action="hide-if-blank"]').each((index, element) => {
      const $element = $(element);
      const fieldName = $element.data('wpf-field-name');
      const fieldOrigin = $element.data('wpf-field-origin');
      const getFieldMethodName = fieldOrigin === 'global' ? 'getGlobalField' : 'getField';

      $element.before(notations.add(`\n<?php if( ${getFieldMethodName}( "${fieldName}" ) ) : ?>\n`));
      $element.after(notations.add(`\n<?php endif; ?>\n`));
    });

    // Hide subfield component
    $('[data-wpf-subfield-action="hide-if-blank"]').each((index, element) => {
      const $element = $(element);
      const fieldName = $element.data('wpf-subfield-name');

      $element.before(notations.add(`\n<?php if( getSubField( "${fieldName}" ) ) : ?>\n`));
      $element.after(notations.add(`\n<?php endif; ?>\n`));
    });

    // Download Fields
    $('[data-wpf-field-action="download"]').each((index, element) => {
      const $element = $(element);
      const fieldName = $element.data('wpf-field-name');
      const fieldOrigin = $element.data('wpf-field-origin');
      const getFieldMethodName = fieldOrigin === 'global' ? 'getGlobalFieldFile' : 'getFieldFile';

      $element.attr('download', fieldName);

      $element.before(notations.add(`\n<?php $file = ${getFieldMethodName}( "${fieldName}" ) ?>\n`));
      $element.before(notations.add(`\n<?php if( $file ) : ?>\n`));
      $element.attr('href', notations.add(`<?php echo $file; ?>`));
      $element.after(notations.add(`\n<?php endif; ?>\n`));
    });

    // Download SubFields
    $('[data-wpf-subfield-action="download"]').each((index, element) => {
      const $element = $(element);
      $element.attr('download', true);
      const fieldName = $element.data('wpf-subfield-name');
      $element.attr('href', notations.add(`<?php echoSubFieldFile( "${fieldName}" ) ?>`));
    });

    // TODO: Remove data attributes
  }
}

module.exports = ContentHandler;
