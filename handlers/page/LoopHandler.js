const _ = require('lodash');
const format = require('../../helpers/format');
const notations = require('../../helpers/notations');

class LoopHandler {
  constructor({ $ }) {
    this.$ = $;

    this.handleLoopItem = this.handleLoopItem.bind(this);
  }

  handleLoopItem(index, wrapper) {
    const { $, fileHandler, functions } = this;

    const $wrapper = $(wrapper);
    const postType = $wrapper.data('wpf-loop');
    const useGrid = !!$wrapper.data('wpf-use-grid') || $wrapper.hasClass('w-row');

    let $firstCol = $wrapper.find('*').first();
    let firstColHtml = $('<div>').append($firstCol.clone()).html();

    let rowClass = false;
    let columnsCount = false;

    if(!!useGrid) {
      const $cols = $wrapper.find('.w-col');
      $firstCol = $cols.first();
      firstColHtml = $('<div>').append($firstCol.clone()).html();
      rowClass = $wrapper.attr('class');
      columnsCount = 12 / parseInt($firstCol.attr('class').split('w-col-')[1]);
    }

    if(!!postType) {
      // If is wp query
      $wrapper.html(
        notations.add(`\n\n<?php loopQuery(array("post_type"=>"${postType}"), ${columnsCount}, "${rowClass}", function() { ?>`) +
          `${firstColHtml}\n` +
        notations.add(`<?php }); ?>\n\n`)
      );
    } else {
      // If is repeater
      const fieldName = $wrapper.data('wpf-loop-repeater');
      const fieldOrigin = $wrapper.data('wpf-field-origin');
      const isGlobal = fieldOrigin === 'global';

      // $wrapper.remove();
      $wrapper.html(
        notations.add(`\n\n<?php loopRepeater('${fieldName}', ${isGlobal}, ${columnsCount}, "${rowClass}", function() { ?>`) +
          `${firstColHtml}\n` +
        notations.add(`<?php }); ?>\n\n`)
      );
    }
  }

  handle() {
    const { $ } = this;

    $('[data-wpf-loop], [data-wpf-loop-repeater]').each(this.handleLoopItem);
    $('[data-wpf-loop] [data-wpf-loop-repeater]').each(this.handleLoopItem);


    // Clear same level rows
    $('.w-row[data-wpf-loop], [data-wpf-use-grid]').siblings('.w-row').remove();
    // $('[data-wpf-loop-repeater] > *:first-of-type').siblings().remove();
    // $('[data-wpf-loop]:not(.w-row), [data-wpf-loop]:not([data-wpf-use-grid])').siblings().remove();
  }
}

module.exports = LoopHandler;
