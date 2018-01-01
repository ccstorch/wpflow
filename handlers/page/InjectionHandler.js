const notations = require('../../helpers/notations');

class InjectionHandler {
  constructor({ $ }) {
    this.$ = $;
  }

  handle() {
    const { $ } = this;

    $('[data-wpf-inject]').each((index, element) => {
      const $element = $(element);
      const code = notations.add($element.data('wpf-inject'));
      const injectionType = $element.data('wpf-injection-type');
      const attribute = $element.data('wpf-inject-on-attribute');

      switch (injectionType) {
        case 'attribute':
          $element.attr(attribute, code);
          break;

        case 'increment-attribute':
          const currentValue = $element.attr(attribute);
          $element.attr(attribute, currentValue + ' ' + code);
          break;

        case 'replace':
          $element.replaceWith(code);
          break;

        case 'append':
          $element.append(code);
          break;

        default:
          $element.html(code);
      }
    });
  }
}

module.exports = InjectionHandler;
