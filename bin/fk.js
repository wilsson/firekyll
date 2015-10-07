/**
 *
 * @module fk
 * @author Wilson Flores
 *
 */

var program = require('commander'),
       path = require('path'),
    creator = require('./creator'),
    symbols = require('log-symbols'),
    chalk   = require('chalk');

program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ jk new     [nameProject]');
  console.log('    $ jk newpost [namePost]');
  console.log('    $ jk list');
  console.log('');
});

program.parse(process.argv);

var zap = new creator(program);
var command = program.args;

if(command.length >= 3){ 
  program.help();
}
if(command.length == 1){
   if(command[0] == 'list'){
      zap.run('listPosts');
      process.exit();
    }
}
if(command.length > 1){
  var command = program.args[0];
  switch(command){
    case 'newpost':
      zap.run('newpost');
      break;
    case 'new':
      zap.run('new');
      break;
    default:
      console.log('');
      console.log('  '+symbols.warning,chalk.yellow('command not found !'));
      console.log('');
  }
}else{
  console.log(command.length,'<<');
  program.help();
}
