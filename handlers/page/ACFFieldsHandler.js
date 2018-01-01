class ACFFieldsHandler {
  constructor({ $ }, { fileHandler, acfSettings, customConfig }) {
    this.$ = $;
    this.fileHandler = fileHandler;
    this.acfSettings = acfSettings;
    this.customConfig = customConfig;
    this.hasGlobalField = false;

    this.handleSubfields = this.handleSubfields.bind(this);
  }

  getFieldData($element, parentRepeaterName) {
    // Subfields
    if(!!parentRepeaterName) {
      const subfieldName = $element.data('wpf-subfield-name');
      if(!subfieldName) {
        console.warn(`Subfield for ${parentRepeaterName} doesn't have a name, you must provide a name like data-subfield-name="title"`);
      }

      return {
        name: subfieldName,
        type: $element.data('wpf-subfield-type'),
        required: $element.data('wpf-subfield-required'),
        max: $element.data('wpf-subfield-max'),
        min: $element.data('wpf-subfield-min'),
        placeholder: $element.data('wpf-subfield-placeholder'),
        instructions: $element.data('wpf-subfield-instructions'),
        newLines: $element.data('wpf-subfield-textarea-new-lines') || '',
        repeaterName: parentRepeaterName,
      };
    }

    // Normal fields
    const repeaterName = $element.data('wpf-loop-repeater');
    const fieldName = $element.data('wpf-field-name');
    const fieldOrigin = $element.data('wpf-field-origin');
    if(!fieldOrigin) {
      console.warn(`Field "${fieldName || repeaterName}" doesn't have an origin, you must provide a origin like data-field-origin="post"`);
    }

    const hasDefaultValue = !$element.data('wpf-field-attribute') && !repeaterName;

    return {
      name: fieldName || repeaterName,
      type: $element.data('wpf-field-type'),
      newLines: $element.data('wpf-field-textarea-new-lines') || '',
      required: $element.data('wpf-field-required'),
      max: $element.data('wpf-field-max'),
      min: $element.data('wpf-field-min'),
      placeholder: $element.data('wpf-field-placeholder'),
      instructions: $element.data('wpf-field-instructions'),
      origin: $element.data('wpf-field-origin'),
      tabName: $element.data('wpf-field-tab'),
      defaultValue: hasDefaultValue && $element.text(),
    };
  }

  handleSubfields($element) {
    const { $ } = this;
    const repeaterName = $element.data('wpf-loop-repeater');
    const subfields = [];

    $element.find('[data-wpf-subfield-name]').each((index, subelement) => {
      const $subelement = $(subelement);

      const subfield = this.getFieldData($subelement, repeaterName);
      subfields.push(subfield);
    });

    return subfields;
  }

  handle() {
    const { $, acfSettings, handleSubfields, fileHandler, customConfig } = this;

    $('[data-wpf-field-name], [data-wpf-loop-repeater]').each((index, element) => {
      const $element = $(element);
      const isRepeater = !!$element.data('wpf-loop-repeater');

      const field = this.getFieldData($element);

      if(isRepeater) {
        field['type'] = 'repeater';
        field['subfields'] = handleSubfields($element)
      }

      acfSettings.addField(field);
    });
  }
}

module.exports = ACFFieldsHandler;
