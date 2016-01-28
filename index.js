#!/usr/bin/env node --harmony
var co = require('co');
var fs = require('fs');
var util = require('util');
var prompt = require('co-prompt');
var program = require('commander');
var params = {};
var dedent = require('dedent-js');

program
    .arguments('<file>')
    .option('-c, --component', 'Generates component', /^(component)$/i, 'component')
    .option('-d, --directive', 'Generates directive', /^(directive)$/i, 'directive')
    .option('-n, --name <name>', 'Name')
    .action(function(file) { 
        co(function *() {
            var type = "";
            if(program.component) {
                type = 'component';
            }
            
            if(program.directive) {
                type = 'directive';
            }
            
            params.type = type;
            params.file = file;
            params.name = yield prompt('name: ');
            params.ext = 'ts';
  
            console.log('Generating your component %s with filename %s', params.name, params.filename);
            fs.writeFileSync(params.file + '.ts', template(params.type, 'ts', params));
            fs.writeFileSync(params.file + '.scss', template(params.type, 'scss', params));
            fs.writeFileSync(params.file + '.html', template(params.type, 'html', params));
            process.exit(1);
        });
    })
    .parse(process.argv);
    
    function template(type, ext, params){
        var templates = {
            component: {
                ts:
                `
                import{Component} from 'angular2/core';
                
                @Component({
                templateUrl: '',
                styles:[],
                providers:[],
                directives:[]
                })
                
                exports class ${params.name} {
                
                constructor(){}
                    
                }
                `,
                scss:
                `
                #${params.name}{
                    
                }
                `,
                html:
                `
                <${params.name}></${params.name}>
                `
            },
            directive: `
            import{Directive, Injectable} from 'angular2/core';
            
            @Directive({
                
            })
            
            @Injectable()
            exports class ${params.name}Directive {
                
            }`
        }
        var t = templates[type];
        var x = t[ext];
        console.log(x);
        return dedent(x);
    }