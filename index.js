#!/usr/bin/env node --harmony
var co = require('co');
var fs = require('fs');
var prompt = require('co-prompt');
var program = require('commander');
var templates = require('./templates.js');
var config = require('./config.js');
var params = {};
var dedent = require('dedent-js');

program
    .arguments('<file>')
    .option('-c, --component', 'Generates component', /^(component)$/i, 'component')
    .option('-d, --directive', 'Generates directive', /^(directive)$/i, 'directive')
    .option('-p, --pipe', 'Generates pipe', /^(pipe)$/i, 'pipe')
    .option('-n, --name <name>', 'Name')
    .action(function(file) {
      co(function *() {
        var type = '';
        // Define command type
        if (program.component) { type = 'component'; }
        if (program.directive) { type = 'directive'; }
        if (program.pipe) { type = 'pipe'; }
        // Define config for our command
        var _config = config[type];
        var _fileTypes = _config.fileTypes;
        // Define params
        params.type = type;
        params.file = file;
        params.name = yield prompt('name: ');
        // Let you know what you're doing
        console.log('Generating your %s \"%s\"', params.type, params.name);
        // Create our generator function specific to command config
        function fileGen() {}
        var gen = new fileGen();
        // Loop through command filetypes to create relevant generator methods
        _fileTypes.forEach(function(ext) {
            var filename = params.file + '.' + ext;
            fileGen.prototype[ext] =  function() {
               return fs.writeFileSync(filename, template(type, ext, params));
            };
            gen[ext]();    
        });
        // All done!
        process.exit(1);
      });
    })
    .parse(process.argv);

  function template(type, ext, params) {
    var tpl = new templates(params);
    var tplType = tpl[type];
    var _template = tplType[ext];
    return dedent(_template);
  };