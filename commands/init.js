#!/usr/bin/env node --harmony
var _ = require('lodash');
var path = require('path');
var program = require('commander');
var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
var { pluginInitialStructure } = require('../helpers/pathHelpers');


program
  .arguments('<themeName>')
  .action(function(themeName) {

    var store = memFs.create();
    var fileHandler = editor.create(store);

    console.log('GENERATING FILES...');
    fileHandler.copy([pluginInitialStructure, '!**/*.ejs'], themeName);
    fileHandler.copyTpl(pluginInitialStructure + 'style.css.ejs', themeName + '/style.css', { themeName });

    fileHandler.commit(function() {
      console.log('FINISHED!');
    });
  })
  .parse(process.argv);
