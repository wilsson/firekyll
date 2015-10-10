/**
 *
 * @module fk
 * @author Wilson Flores
 *
 */
 
var plugins = require('./plugins');

/*
 *
 * @description options for cli firekyll
 *
 */

plugins.program.version(require('../package.json').version);
plugins.program
  .option('new [name]','new project')
  .option('newpost [name]','new post')
  .option('list','list posts')
  .option('server','server')
  .option('build','build');

plugins.program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ jk new     [nameProject]');
  console.log('    $ jk newpost [namePost]');
  console.log('    $ jk list');
  console.log('    $ jk server');
  console.log('    $ jk build');
  console.log('');
});

plugins.program.parse(process.argv);

/*
 *
 * @description Instance {creator}
 *
 */

var creator = new plugins.creator(plugins);

/*
 *
 * @description choice args
 *
 */

switch(true){
  case plugins.utilities.isTrueCommand(plugins.program.new):
    creator.run('new');
    break;

  case plugins.utilities.isTrueCommand(plugins.program.newpost):
    creator.run('newpost');
    break;

  case plugins.program.list:
    creator.run('listPosts');
    break;

  case plugins.program.server:
    console.log('iniciando server jekyll');
    creator.run('server');
    break;

  case plugins.program.build:
    console.log('build jekyll');
    break;

  default:
    plugins.program.help();
}

