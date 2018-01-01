#!/usr/bin/env node --harmony
var _ = require('lodash');
var path = require('path');
var program = require('commander');
var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
var fs = require('fs');
var BulkHandler = require('../handlers/BulkHandler');


program
  .arguments('<wfSitePath>')
  .action(function(wfSitePath) {

    var store = memFs.create();
    var fileHandler = editor.create(store);

    console.log('UPDATING DEPS...');

    wfSitePath = path.join(wfSitePath, '/');

    new CssHandler(wfSitePath, fileHandler).handle();
    new ScriptsHandler(wfSitePath, fileHandler).handle();
    new ImagesHandler(wfSitePath, fileHandler).handle();

    fileHandler.commit(function() {
      console.log('FINISHED!');
    });
  })
  .parse(process.argv);
