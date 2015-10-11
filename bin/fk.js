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
  .option('server','server jekyll')
  .option('build','build');

plugins.program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ fk new     [nameProject]');
  console.log('    $ fk newpost [namePost]');
  console.log('    $ fk list');
  console.log('    $ fk server');
  console.log('    $ fk build');
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

if(plugins.program.args.length == 0){
  switch(true){
    case plugins.utilities.isTrueCommand(plugins.program.new):
      creator.new();
      break;

    case plugins.utilities.isTrueCommand(plugins.program.newpost):
      creator.newpost();
      break;

    case plugins.program.list:
      creator.listPosts();
      break;

    case plugins.program.server:
      creator.server();
      break;

    case plugins.program.build:
      creator.build();
      break;

    default:
      plugins.program.help();
  }
}

