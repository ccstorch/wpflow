const _ = require('lodash');
const { pluginLayoutsLocation } = require('../../helpers/pathHelpers');

class ACFSettingsHandler {
  constructor({ fileHandler, customConfig }) {
    this.fileHandler = fileHandler;
    this.customConfig = customConfig;
    this.fields = [];
    this.origins = [];
    this.hasGlobalField = false;

    this.addField = this.addField.bind(this);
    this.filterAndOrganizeFieds = this.filterAndOrganizeFieds.bind(this);
    this.generateFieldsGroup = this.generateFieldsGroup.bind(this);
    this.generateField = this.generateField.bind(this);
    this.loadCustomConfigFields = this.loadCustomConfigFields.bind(this);
  }

  addField(field) {
    if(!this.hasGlobalField && !!field.origin && field.origin === 'global') this.hasGlobalField = true;
    if(!!field.origin) {
      this.origins = _.uniq([...this.origins, field.origin]);
    }
    this.fields.push(field);
  }

  getOriginType(origin) {
    switch (origin) {
      case 'global':  return 'options_page'
      default:        return 'post_type'
    }
  }

  generateFieldsGroup(origin, fieldsSettings) {
    return `
      acf_add_local_field_group(array (
        'key' => '${origin}_field',
        'title' => '${_.startCase(origin)}',
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'left',
        'instruction_placement' => 'label',
        'active' => 1,
        'location' => array (
          array (
            array (
              'param' => '${this.getOriginType(origin)}',
              'operator' => '==',
              'value' => '${origin || 'page'}',
            ),
          ),
        ),
        'fields' => array (${fieldsSettings}),
      ));
    `
  }

  generateField({ defaultValue, name, type, required, subfields, newLines, min, max, placeholder, instructions }) {
    const subfieldsSettings = subfields && subfields.map(this.generateField).join(',');

    return `
          array (
            'default_value' => '${_.escape(defaultValue || '')}',
            'key' => '${name}',
            'label' => '${_.startCase(name)}',
            'name' => '${name}',
            'min' => '${min}',
            'max' => '${max}',
            'placeholder' => '${placeholder}',
            'instructions' => '${instructions}',
            'type' => '${type || 'text'}',
            'instructions' => '',
            'required' => ${required ? 1 : 0},
            ${!!newLines ? `'new_lines' => '${newLines}',` : '' }
            ${subfieldsSettings ? `'sub_fields' => array (\n${subfieldsSettings})\n` : ''}
          )`
  }

  generateGlobalPage() {
    return `
      acf_add_options_page(array(
       'page_title'  => 'Global Content',
       'menu_title'  => 'Global Content',
       'position'    => 4,
       'slug'        => 'global'
      ));
    `;
  }

  loadCustomConfigFields() {
    const { customConfig, fields, addField } = this;

    // Handle custom fields
    customConfig.customFields.forEach(addField);

    // Handle custom subfields
    customConfig.customSubFields.forEach((subfield) => {
      const parentField = fields.find((field) => field.name === subfield.repeaterName);
      if(!!parentField) {
        parentField.subfields = parentField.subfields || [];
        parentField.subfields = [...parentField.subfields, subfield];
      }
    })
  }

  filterAndOrganizeFieds(filterKey) {
    const { fields } = this;
    let tempFields = [];
    tempFields = _.filter([...fields], (item) => item.origin === filterKey);

    let finalFields = [];
    const groupedFields = _.groupBy(tempFields, 'tabName');

    _.each(groupedFields, (fields, tab) => {
      if(tab === 'undefined') {
        finalFields = [...finalFields, ...fields]
      } else {
        finalFields = [...finalFields, { name: tab, type: 'tab' }, ...fields];
      }
    });

    return finalFields;
  }

  handle() {
    const { $, fileHandler, fields, origins, hasGlobalField, filterAndOrganizeFieds, generateGlobalPage, generateField, generateFieldsGroup, loadCustomConfigFields } = this;
    let customFieldsSettings = '';

    loadCustomConfigFields();

    if(!!hasGlobalField) {
      customFieldsSettings += generateGlobalPage();
    }

    origins.forEach((origin) => {
      const fieldsSettings = filterAndOrganizeFieds(origin).map(generateField).join(',');
      customFieldsSettings += generateFieldsGroup(origin, fieldsSettings);
    });


    fileHandler.copyTpl(
      pluginLayoutsLocation + 'acf-settings.php.ejs',
      './config/acf-settings.wf.php',
      { customFieldsSettings }
    );
  }
}

module.exports = ACFSettingsHandler;
