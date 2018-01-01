#!/usr/bin/env node --harmony
const path = require('path');
const program = require('commander');
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');
const BulkGlobalHandler = require('../handlers/global/BulkGlobalHandler');

program
  .arguments('<wfSitePath>')
  .action(function(wfSitePath) {

    const store = memFs.create();
    const fileHandler = editor.create(store);

    console.log('CONVERTING FILES...');

    wfSitePath = path.join(wfSitePath, '/');

    new BulkGlobalHandler(wfSitePath, fileHandler).handle();

    fileHandler.commit(function() {
      console.log('FINISHED!');
    });
  })
  .parse(process.argv);
