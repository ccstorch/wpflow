const _ = require('lodash');
const path = require('path');
const notations = require('../../helpers/notations');
const initialStrucutrePath = path.join(path.dirname(__filename), '../../layouts/');
const { pluginLayoutsLocation } = require('../../helpers/pathHelpers');

const names = {
  'index.html': { layout: 'front-page.php.ejs', final: 'front-page.php' },
  '404.html': { layout: 'clean-page.php.ejs', final: '404.php' },
  '401.html': { layout: 'clean-page.php.ejs', final: '401.php' },
};

class RealtedPathHandler {
  constructor({ $ }) {
    this.$ = $;
  }

  handle() {
    const { $ } = this;

    $('[src*="images/"]').each((index, element) => {
      const $element = $(element);

      const src = $element.attr('src');
      const newSrc = _.last(src.split('/'));
      $element.attr('src', `##OPEN_PHP## echoLocalImage(##ADD_COMMA##${newSrc}##ADD_COMMA##) ##CLOSE_PHP##`);

      const srcset = $element.attr('srcset');
      if(srcset) {
        const newSrcset = srcset.split(', ').map((item) => {
          const [path, size] = item.split(' ');
          const newPath = _.last(path.split('/'))
          return notations.add(`<?php echoLocalImage("${newPath}") ?> ${size}`);
        }).join(', ');
        $element.attr('srcset', newSrcset);
      }
    });

    // TODO: Related Links
  }
}

module.exports = RealtedPathHandler;
