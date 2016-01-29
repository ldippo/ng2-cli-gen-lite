module.exports = function(params) {
  return {
    component: {
      ts:  `import{Component} from 'angular2/core';            
            
            @Component({
            selector: '${ params.name }',
            templateUrl: '',
            styles:[],
            providers:[],
            directives:[],
            pipes:[]
            })
            
            export class ${ capitilize(params.name) } {
            
            constructor(){}
                
            }`,
      scss: `#${ params.name.toLowerCase() }{
                            
                        }`,
      html: `<${ params.name.toLowerCase() }></${ params.name.toLowerCase() }>`,
    },
    directive: {
        ts: `import{Directive, Injectable} from 'angular2/core';
            @Directive({
                selector: '${ params.name }'
            })
            
            @Injectable()
            export class ${ params.name } {
                
            }`,
    },
    pipe: {
        ts: `import{Pipe} from 'angular2/core';
            
            @Pipe({
                name: '${ params.name.toLowerCase() }'
            })
             
            export class ${ capitilize(params.name) }Pipe {
                
            }`,
    }
  };
};

function capitilize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}